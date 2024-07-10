import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Paypal from "../../components/Paypal3";
import { cancelTransaction } from "../../utils/invoiceFunctions";
import imgPlaceholder from "./image-placeholder.png";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

const Transaction = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const { currentUser } = props;
  const [transaction, setTransaction] = useState([]);
  const { transactions, isLoading, error } = useGetAllTransactions();
  const [isTransactionLoaded, setIsTransactionLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const getTransaction = async () => {
      transactions.find((transaction) => {
        if (transaction._id === id) {
          setTransaction(transaction);
          setIsTransactionLoaded(true);
        }
      });
    };
    getTransaction();
  }, [currentUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentUser || !transaction) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (!loading && isTransactionLoaded && transaction) {
    return (
      <>
        <Layout>
          <div id="transaction" className="p-4">
            {transaction ? (
              <>
                <div className="container mx-auto">
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-4">
                      Transaction History
                    </h2>
                    <h3 className="text-lg mb-4">
                      User: {currentUser.username}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Qty</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transaction.cart.items.map((item) => (
                            <tr key={item._id} className="border-t">
                              <td className="flex items-center space-x-4 px-4 py-2">
                                <img
                                  src={imgPlaceholder}
                                  alt=""
                                  className="w-16 h-16 object-cover"
                                />
                                <p>{item.name}</p>
                              </td>
                              <td className="px-4 py-2">{item.qty}</td>
                              <td className="px-4 py-2">${item.price}</td>
                              <td className="px-4 py-2">
                                ${(item.qty * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="summary bg-gray-100">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2">
                              <p>Date Availed</p>
                              <p>Status</p>
                              <p>Items</p>
                              <p>Amount</p>
                            </td>
                            <td className="px-4 py-2">
                              <p>
                                {new Date(
                                  transaction.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <p>{transaction.status.toUpperCase()}</p>
                              <p>{transaction.cart.total_quantity}</p>
                              <p>$ {transaction.cart.total_price}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      {currentUser.isAdmin && transaction.status === "pending" && (
                        <Link
                          className="btn btn-primary"
                          onClick={() => setIsTransactionLoaded(false)}
                          to={`/transaction/${transaction._id}/invoice`}
                        >
                          Invoice
                        </Link>
                      )}
                      {transaction.status === "pending" && (
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            cancelTransaction({
                              ...props,
                              transaction,
                              history,
                              setTransaction,
                              setLoading,
                            })
                          }
                        >
                          Cancel Transaction
                        </button>
                      )}
                      {!currentUser.isAdmin &&
                        transaction.status === "for payment" && (
                          <>
                            <Link
                              className="btn btn-primary"
                              onClick={() => setIsTransactionLoaded(false)}
                              to={`/dashboard/transaction/${transaction._id}/invoice`}
                              style={{ width: "200px", marginBottom: "5px" }}
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
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-center text-xl">
                You currently have no transactions.
              </h2>
            )}
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Transaction;
