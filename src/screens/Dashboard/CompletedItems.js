import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "../../utils/invoiceFunctions";
import SearchBar from "./SearchBar";
import "./CompletedItems.css";
import Layout from "../../components/Dashboard/Layout";

const CompletedItems = (props) => {
  const { currentUser } = props;
  const [searched, setSearched] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [areCompletedItemsLoaded, setAreCompletedItemsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedItemsSlice, setCompletedItemsSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setCompletedItemsSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  useEffect(() => {
    // let source = Axios.CancelToken.source();
    let unmounted = false;
    if (currentUser && !areCompletedItemsLoaded) {
      const res = [];
      currentUser.transactions.forEach(async (item) => {
        if (item.status === "completed") res.push(item);
      });
      if (!unmounted) {
        if (res.length > 0) {
          const sortedCompletedItems = res.sort((a, b) => {
            const userA = a.createdAt.toUpperCase();
            const userB = b.createdAt.toUpperCase();
            if (userA < userB) {
              return -1;
            } else if (userA > userB) {
              return 1;
            }
            return 0;
          });
          setCompletedItems(sortedCompletedItems);
          setSearchedItems(sortedCompletedItems);
        }
        setAreCompletedItemsLoaded(true);
      }

      // Axios.get("/admin/completeditems", { cancelToken: source.token })
      // 	.then((res) => {
      // 		if (!unmounted) {
      // 			if (res.data.completedItems.length) {
      // 				const sortedCompletedItems = res.data.completedItems.sort(
      // 					(a, b) => {
      // 						const userA = a.createdAt.toUpperCase();
      // 						const userB = b.createdAt.toUpperCase();
      // 						if (userA < userB) {
      // 							return -1;
      // 						} else if (userA > userB) {
      // 							return 1;
      // 						}
      // 						return 0;
      // 					}
      // 				);
      // 				setCompletedItems(sortedCompletedItems);
      // 				setSearchedItems(sortedCompletedItems);
      // 			}
      // 			setAreCompletedItemsLoaded(true);
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
      // source.cancel("Cancelling in cleanup");
    };
  }, [areCompletedItemsLoaded, currentUser]);

  if (areCompletedItemsLoaded) {
    return (
      <Layout>
        <div className="container" id="completed-items">
          <div className="row">
            <div className="col-xs-10">
              <div className="panel panel-primary">
                {completedItems.length > 0 ? (
                  <>
                    <div className="panel-heading">
                      <h2 className="panel-title">Completed Items</h2>
                    </div>
                    <div>
                      <SearchBar
                        setSearched={setSearched}
                        setSearchedItems={setSearchedItems}
                        search={search}
                        items={completedItems}
                        setItemsSlice={setCompletedItemsSlice}
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
                            .slice(
                              completedItemsSlice[0],
                              completedItemsSlice[1]
                            )
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
                        {completedItemsSlice[0] === 0 ? (
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
                        {completedItemsSlice[1] < searchedItems.length ? (
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
                  <h2>There are no completed items</h2>
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

export default CompletedItems;
