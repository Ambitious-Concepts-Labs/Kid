import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

const Transactions = (props) => {
  const history = useNavigate();
  const { currentUser, setCheckUser } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const transactions = useGetAllTransactions();
  const [transactionsSlice, setTransactionsSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setTransactionsSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  const getTransactions = async () => {
    if (currentUser.isAdmin) {
      setAllTransactions(transactions);
    } else {
      currentUser.transactions.map(async (userTransaction) => {
        transactions.map((transaction) => {
          if (
            userTransaction === transaction.transactionsId &&
            currentUser.uid === transaction.user
          ) {
            setAllTransactions((prev) => [...prev, transaction]);
          }
        });
      });
    }
  };

  const sortTransactions = () => {
    const sortedTransactionsByTime = allTransactions.sort((a, b) => {
      if (a.createdAt.toDate() < b.createdAt.toDate()) {
        return -1;
      } else if (a.createdAt.toDate() > b.createdAt.toDate()) {
        return 1;
      }
      return 0;
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "for payment") {
        setSortedTransactions((prev) => [...prev, transaction]);
      }
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "pending") {
        setSortedTransactions((prev) => [...prev, transaction]);
      }
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "completed") {
        setSortedTransactions((prev) => [...prev, transaction]);
      }
    });

    sortedTransactionsByTime.forEach((transaction) => {
      if (transaction.status === "cancelled") {
        setSortedTransactions((prev) => [...prev, transaction]);
      }
    });
  };

  useEffect(() => {
    if (currentUser && transactions.length > 0) {
      getTransactions();
      sortTransactions();
    }
  }, [currentUser, transactions]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [transactions, currentUser]);

  if (currentUser) {
    return (
      <Layout>
        <div id="transactions" className="p-4">
          {allTransactions.length > 0 ? (
            <>
              <div className="container mx-auto">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-xl font-bold mb-4">
                    Transaction History
                  </h2>
                  <h3 className="text-lg mb-4">User: {currentUser.username}</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-4 py-2">Date Available</th>
                          <th className="px-4 py-2">Items</th>
                          <th className="px-4 py-2">Amount</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allTransactions.map((transaction) => (
                          <tr key={transaction._id} className="border-t">
                            <td className="px-4 py-2">{Date.now()}</td>
                            <td className="px-4 py-2">
                              {transaction.cart.total_quantity}
                            </td>
                            <td className="px-4 py-2">
                              ${transaction.cart.total_price}
                            </td>
                            <td className="px-4 py-2">
                              {transaction.status.toUpperCase()}
                            </td>
                            <td className="px-4 py-2">
                              <Link
                                className="text-blue-500 hover:text-blue-700"
                                to={`/transaction/${transaction._id}`}
                                onClick={() => {
                                  setCheckUser(false);
                                }}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center mt-4">
                    {transactionsSlice[0] !== 0 && (
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Prev
                      </button>
                    )}
                    {transactionsSlice[1] < currentUser.transactions.length && (
                      <button
                        className="btn btn-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
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

export default Transactions;
