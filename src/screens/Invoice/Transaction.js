import React, { useState, lazy, Suspense } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

const TransactionDetails = lazy(() => import("../../components/Transactions/TransactionDetails"));

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
  }, [currentUser, transactions, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentUser || !transaction) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");

  if (!loading && isTransactionLoaded && transaction) {
    return (
      <Layout>
        <div id="transaction" className="p-4">
          {transaction ? (
            <Suspense fallback={<div>Loading transaction details...</div>}>
              <TransactionDetails
                transaction={transaction}
                currentUser={currentUser}
                setIsTransactionLoaded={setIsTransactionLoaded}
                setTransaction={setTransaction}
                setLoading={setLoading}
                {...props}
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

export default Transaction;
