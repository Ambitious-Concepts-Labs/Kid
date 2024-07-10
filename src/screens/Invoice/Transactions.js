import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

const TransactionTable = lazy(() => import("../../components/Tables/TransactionTable"));

const Transactions = (props) => {
  const history = useNavigate();
  const { currentUser, setCheckUser } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const { transactions, isLoading, error } = useGetAllTransactions();
  const [transactionsSlice, setTransactionsSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setTransactionsSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  const getTransactions = async () => {
    // ... (keep the existing getTransactions function)
  };

  const sortTransactions = () => {
    // ... (keep the existing sortTransactions function)
  };

  useEffect(() => {
    if (currentUser && transactions.length > 0) {
      getTransactions();
      sortTransactions();
    }
  }, [currentUser, transactions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (currentUser) {
    return (
      <Layout>
        <div id="transactions" className="p-4">
          {allTransactions.length > 0 ? (
            <Suspense fallback={<div>Loading transaction table...</div>}>
              <TransactionTable
                currentUser={currentUser}
                allTransactions={allTransactions}
                transactionsSlice={transactionsSlice}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setCheckUser={setCheckUser}
              />
            </Suspense>
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
