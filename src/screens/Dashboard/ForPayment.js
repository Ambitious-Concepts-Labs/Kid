import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "./invoiceFunctions";
import SearchBar from "./SearchBar";
import "./ForPayment.css";
import Layout from "../../components/Dashboard/Layout";

const ForPayment = (props) => {
  const { currentUser } = props;
  const [searched, setSearched] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [forPayment, setForPayment] = useState([]);
  const [areForPaymentLoaded, setAreForPaymentLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [forPaymentSlice, setForPaymentSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setForPaymentSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  useEffect(() => {
    let unmounted = false;
    if (currentUser && !areForPaymentLoaded) {
      const res = [];
      currentUser.transactions.forEach(async (item) => {
        if (item.status === "for payment") res.push(item);
      });
      if (!unmounted) {
        if (res.length > 0) {
          const sortedForPayment = res.sort((a, b) => {
            const userA = a.createdAt.toUpperCase();
            const userB = b.createdAt.toUpperCase();
            if (userA < userB) {
              return -1;
            } else if (userA > userB) {
              return 1;
            }
            return 0;
          });
          setForPayment(sortedForPayment);
          setSearchedItems(sortedForPayment);
        }
        setAreForPaymentLoaded(true);
      }

      // Axios.get("/admin/forpayment", { cancelToken: source.token })
      // 	.then((res) => {
      // 		if (!unmounted) {
      // 			if (res.data.forPayment.length) {
      // 				const sortedForPayment = res.data.forPayment.sort((a, b) => {
      // 					const userA = a.createdAt.toUpperCase();
      // 					const userB = b.createdAt.toUpperCase();
      // 					if (userA < userB) {
      // 						return -1;
      // 					} else if (userA > userB) {
      // 						return 1;
      // 					}
      // 					return 0;
      // 				});
      // 				setForPayment(sortedForPayment);
      // 				setSearchedItems(sortedForPayment);
      // 			}
      // 			setAreForPaymentLoaded(true);
      // 		}
      // 	})
      // 	.catch((err) => {
      // 		if (!unmounted) {
      // 			if (Axios.isCancel(err)) {
      // 				console.log(`request cancelled:${err.message}`);
      // 			} else {
      // 				console.log("another error happened:" + err.message);
      // 			}
      // 		}
      // 	});
    }

    return function() {
      unmounted = true;
    };
  }, [areForPaymentLoaded, currentUser]);

  if (areForPaymentLoaded) {
    return (
      <Layout>
        <div className="container" id="for-payment">
          <div className="row">
            <div className="col-xs-10">
              <div className="panel panel-primary">
                {forPayment.length > 0 ? (
                  <>
                    <div className="panel-heading">
                      <h2 className="panel-title">Items For Payment</h2>
                    </div>
                    <div>
                      <SearchBar
                        setSearched={setSearched}
                        setSearchedItems={setSearchedItems}
                        search={search}
                        items={forPayment}
                        setItemsSlice={setForPaymentSlice}
                        placeholder="search username"
                      />
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Username</th>
                              <th>Date Availed</th>
                              <th>Items</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>
                                <button style={{ visibility: "hidden" }}>
                                  xxxx
                                </button>
                              </th>
                            </tr>
                          </thead>

                          {searchedItems
                            // .slice(forPaymentSlice[0], forPaymentSlice[1])
                            .map((transaction) => {
                              return (
                                <tbody
                                  style={{ verticalAlign: "middle" }}
                                  key={transaction._id}
                                >
                                  <tr>
                                    <td>{currentUser.username}</td>
                                    <td>
                                      {transaction.createdAt
                                        .toDate()
                                        .toDateString()}
                                    </td>
                                    <td>{transaction.cart.total_quantity}</td>
                                    <td>${transaction.cart.total_price}</td>
                                    <td>{transaction.status.toUpperCase()}</td>
                                    <td>
                                      <Link
                                        className="btn btn-primary"
                                        to={`/transaction/${transaction._id}`}
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                        </table>
                        {searched && !searchedItems.length && (
                          <h2 style={{ textAlign: "center", width: "100%" }}>
                            No transactions found with searched user
                          </h2>
                        )}
                      </li>
                    </ul>
                    {searchedItems.length > 10 && (
                      <div className="div" style={{ textAlign: "center" }}>
                        {forPaymentSlice[0] === 0 ? (
                          ""
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setCurrentPage(currentPage - 1);
                            }}
                          >
                            Prev
                          </button>
                        )}
                        {forPaymentSlice[1] < searchedItems.length ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setCurrentPage(currentPage + 1);
                            }}
                          >
                            Next
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <h2>There are no items for payment</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="spinner-border-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default ForPayment;
