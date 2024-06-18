import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../../utils/invoiceFunctions";
import SearchBar from "./SearchBar";
import "./PendingItems.css";
import Layout from "../../components/Dashboard/Layout";

const PendingItems = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [searched, setSearched] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [arePendingItemsLoaded, setArePendingItemsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingItemsSlice, setPendingItemsSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setPendingItemsSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  useEffect(() => {
    let unmounted = false;
    if (currentUser && !arePendingItemsLoaded) {
      if (!unmounted) {
        if (currentUser.transactions.length > 0) {
          const res = [];
          currentUser.transactions.forEach((transaction) => {
            if (transaction.status === "for payment") res.push(transaction);
          });
          const sortedPendingItems = res.sort((a, b) => {
            const userA = a.createdAt.toUpperCase();
            const userB = b.createdAt.toUpperCase();
            if (userA < userB) {
              return -1;
            } else if (userA > userB) {
              return 1;
            }
            return 0;
          });
          setPendingItems(sortedPendingItems);
          setSearchedItems(sortedPendingItems);
        }
        setArePendingItemsLoaded(true);
      }
    }
    // Axios.get("/admin/pendingitems", { cancelToken: source.token })
    // 	.then((res) => {
    // 		if (!unmounted) {
    // 			if (res.data.pendingItems.length) {
    // 				const sortedPendingItems = res.data.pendingItems.sort((a, b) => {
    // 					const userA = a.createdAt.toUpperCase();
    // 					const userB = b.createdAt.toUpperCase();
    // 					if (userA < userB) {
    // 						return -1;
    // 					} else if (userA > userB) {
    // 						return 1;
    // 					}
    // 					return 0;
    // 				});
    // 				setPendingItems(sortedPendingItems);
    // 				setSearchedItems(sortedPendingItems);
    // 			}
    // 			setArePendingItemsLoaded(true);
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
    return function() {
      unmounted = true;
    };
  }, [arePendingItemsLoaded, currentUser]);

  if (!currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (arePendingItemsLoaded) {
    return (
      <Layout>
        <div className="container" id="pending-items">
          <div className="row">
            <div className="col-xs-10">
              <div className="panel panel-primary">
                {pendingItems.length > 0 ? (
                  <>
                    <div className="panel-heading">
                      <h2 className="panel-title">Pending Items</h2>
                    </div>
                    <div>
                      <SearchBar
                        setSearched={setSearched}
                        setSearchedItems={setSearchedItems}
                        search={search}
                        items={pendingItems}
                        setItemsSlice={setPendingItemsSlice}
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
                            .slice(pendingItemsSlice[0], pendingItemsSlice[1])
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
                                        to={`/dashboard/transaction/${transaction._id}`}
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
                        {pendingItemsSlice[0] === 0 ? (
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
                        {pendingItemsSlice[1] < searchedItems.length && (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setCurrentPage(currentPage + 1);
                            }}
                          >
                            Next
                          </button>
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

export default PendingItems;
