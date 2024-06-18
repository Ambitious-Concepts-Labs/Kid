// Imports
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { useParams, Link } from "react-router-dom";
import Paypal from "../../components/Paypal3";
import { cancelTransaction } from "./invoiceFunctions";
import imgPlaceholder from "./image-placeholder.png";
// import Axios from "axios";
import "./Transaction.css";
import { db } from "../../firebase";
import { doc, getDoc, query, collection, getDocs, where } from "firebase/firestore";
import { removeDuplicates } from "../../utils/helperfunctions";
import Layout from "../../components/Dashboard/Layout";

const Transaction = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const { currentUser } = props;
  const [transaction, setTransaction] = useState([]);
  const [isTransactionLoaded, setIsTransactionLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
	const getTransaction = async () => {
		  const dataArr = [];
		  const querySnapshot = await getDocs(collection(db, "transactions"));
		  querySnapshot.forEach((transaction) => {
			  if (transaction.data()._id == id) {
				  const obj = { ...transaction.data() };
				  dataArr.push(obj);
			}
		  });
		//   const transactionRef = doc(db, "transactions", id);
		//   const transactionDoc = getDoc(transactionRef);
		//   console.log({transactionDoc});
		//   const transactionData = transactionDoc.data();
		  setTransaction(dataArr);
	  };
	  getTransaction();
  }, [currentUser]);

  useEffect(() => {
    // let source = Axios.CancelToken.source();
    let unmounted = false;
    if (!unmounted) {
      if (!isTransactionLoaded && currentUser) {
        console.log({ test: currentUser.transactions, id });
        if (currentUser.transactions) {
          const currentTransaction = currentUser.transactions.filter(
            (transaction) => {
              console.log(transaction._id === id, transaction);
              if (transaction._id === id) return transaction;
            }
          );
          console.log({ tp: currentTransaction[0] });
          setTransaction(currentTransaction[0]);
          setIsTransactionLoaded(true);
        }
        // Axios.get(
        // 	`/transaction/${id}`,
        // 	{ params: { id: id } },
        // 	{ cancelToken: source.token }
        // )
        // 	.then((res) => {
        // 		if (!unmounted) {
        // 			if (res.data.msg === "Transaction retrieved") {
        // 				setTransaction(res.data.transaction);
        // 				setIsTransactionLoaded(true);
        // 			} else {
        // 				// history.push("/transactions");
        // 			}
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
    }
    return function() {
      unmounted = true;
      // source.cancel("Cancelling in cleanup");
    };
  }, [isTransactionLoaded, id, currentUser, history]);

  if (!currentUser || !transaction) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (!loading && isTransactionLoaded && transaction) {
	  console.log(transaction);
	
    return (
      <>
        <Layout>
          <div id="transaction">
            {transaction.length > 0 ? (
              <>
                <div className="container">
                  <div className="row">
                    <div className="col-xs-10">
                      <div className="panel panel-primary">
                        <div className="panel-heading">
                          <h2 className="panel-title">Transaction History</h2>
                          <div className="panel-body">
                            <h3>User: {currentUser.username}</h3>
                          </div>
                        </div>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Qty</th>
                                  <th>Amount</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody style={{ verticalAlign: "middle" }}>
                                {transaction.cart.items.map((item) => {
                                  return (
                                    <tr key={item._id}>
                                      <td className="img-container">
                                        <img
                                          src={imgPlaceholder}
                                          alt=""
                                          id="transaction-img"
                                        />
                                        <p>{item.name}</p>
                                      </td>
                                      <td>{item.qty}</td>
                                      <td>${item.price}</td>
                                      <td>
                                        ${(item.qty * item.price).toFixed(2)}
                                      </td>
                                      <td></td>
                                    </tr>
                                  );
                                })}

                                <tr className="summary">
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <p>Date Availed</p>
                                    <p>Status</p>
                                    <p>Items</p>
                                    <p>Amount</p>
                                  </td>
                                  <td>
                                    <p>
                                      {Date(
                                        transaction.createdAt
                                      )}
                                    </p>
                                    <p>{transaction.status.toUpperCase()}</p>
                                    <p>{transaction.cart.total_quantity}</p>
                                    <p>$ {transaction.cart.total_price}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div
                              className="transaction-btn"
                              style={{ width: "100px" }}
                            >
                              {currentUser.isAdmin &&
                                transaction.status === "pending" && (
                                  <Link
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setIsTransactionLoaded(false);
                                    }}
                                    to={`/transaction/${transaction._id}/invoice`}
                                  >
                                    Invoice
                                  </Link>
                                )}
                              {transaction.status === "pending" && (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    cancelTransaction({
                                      ...props,
                                      transaction,
                                      history,
                                      setTransaction,
                                      setLoading,
                                    });
                                  }}
                                >
                                  Cancel Transaction
                                </button>
                              )}

                              {!currentUser.isAdmin &&
                                transaction.status === "for payment" && (
                                  <>
                                    <Link
                                      className="btn btn-primary"
                                      onClick={() => {
                                        setIsTransactionLoaded(false);
                                      }}
                                      to={`/dashboard/transaction/${transaction._id}/invoice`}
                                      style={{
                                        width: "200px",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      View Invoice
                                    </Link>
                                    <Paypal
                                      {...props}
                                      transaction={transaction}
                                      setLoading={setLoading}
                                    />
                                  </>
                                )}
                            </div>
                          </li>
                        </ul>
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
      </>
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

export default Transaction;
