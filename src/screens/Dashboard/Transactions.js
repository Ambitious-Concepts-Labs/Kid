import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./Transactions.css";
import Layout from "../../components/Dashboard/Layout";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { removeDuplicates } from "../../utils/helperfunctions";

const Transactions = (props) => {
  const history = useNavigate();
  const { currentUser, isLoggedin, setCheckUser } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionsSlice, setTransactionsSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setTransactionsSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  const getTransactions = async () => {
    currentUser.transactions.map(async (transaction) => {
      const transRef = doc(db, "transactions", transaction);
      const transDoc = await getDoc(transRef);
      const transData = transDoc.data();
      setTransactions((prev) => [...prev, transData]);
    });
    const uniqueTransactions = removeDuplicates(transactions);
    setTransactions(uniqueTransactions);
  };

    React.useEffect(() => {
      // 3000 milliseconds = 3 seconds
      const threeMilliseconds = 3 * 1000;
      const timer = setTimeout(() => {
        getTransactions();
      }, threeMilliseconds);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }, [currentUser]);


  let sortedTransactions = [];
  console.log(currentUser, isLoggedin);
  if (currentUser.transactions) {
    const sortedTransactionsByTime = currentUser.transactions.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "for payment") {
        sortedTransactions.push(transaction);
      }
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "pending") {
        sortedTransactions.push(transaction);
      }
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "completed") {
        sortedTransactions.push(transaction);
      }
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "cancelled") {
        sortedTransactions.push(transaction);
      }
    });
  }

  console.log({ sortedTransactions });
  console.log(
    sortedTransactions.slice(transactionsSlice[0], transactionsSlice[1])
  );
  console.log(
    sortedTransactions
      .slice(transactionsSlice[0], transactionsSlice[1])
      .map((test) => {
        console.log("TEST", test);
      })
  );

  if (currentUser) {
    return (
      <Layout>
        <div id="transactions">
          {transactions ? (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-xs-10">
                    <div className="panel panel-primary">
                      <div className="panel-heading">
                        <h2 className="panel-title">Transaction History</h2>
                      </div>
                      <div className="panel-body">
                        <h3>User: {currentUser.username}</h3>
                      </div>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Date Available</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th></th>
                              </tr>
                            </thead>
                            {transactions
														.slice(transactionsSlice[0], transactionsSlice[1])
														.map((transaction) => {
															return (
																<tbody
																	style={{ verticalAlign: "middle" }}
																	key={transaction._id}
																>
																	<tr>
																		<td>{transaction.createdAt}</td>
																		<td>{transaction.cart.total_quantity}</td>
																		<td>${transaction.cart.total_price}</td>
																		<td>{transaction.status.toUpperCase()}</td>
																		<td>
																			<Link
																				className="btn btn-primary"
																				to={`/dashboard/transaction/${transaction._id}`}
																				onClick={() => {
																					setCheckUser(false);
																				}}
																			>
																				View
																			</Link>
																		</td>
																	</tr>
																</tbody>
															);
														})}
                            {sortedTransactions.map((transaction) => {
                              return (
                                <tbody
                                  style={{ verticalAlign: "middle" }}
                                  key={transaction._id}
                                >
                                  <tr>
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
                                        onClick={() => {
                                          setCheckUser(false);
                                        }}
                                      >
                                        View
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </li>
                      </ul>
                      <div className="div" style={{ textAlign: "center" }}>
                        {transactionsSlice[0] === 0 ? (
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
                        {transactionsSlice[1] <
                        currentUser.transactions.length ? (
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
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h2 style={{ textAlign: "center" }}>
              You currently have no transactions.
            </h2>
          )}
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

export default Transactions;
