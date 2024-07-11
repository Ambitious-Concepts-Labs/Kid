import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sendInvoice } from "../../utils/invoiceFunctions";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

const EditInvoice = lazy(() => import("./EditInvoice"));
const InvoiceDetails = lazy(() => import("../../components/Transactions/InvoiceDetails"));

const InvoiceTransaction = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const { currentUser } = props;
  const [transaction, setTransaction] = useState([]);
  const [isTransactionLoaded, setIsTransactionLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelEdit, setCancelEdit] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState({});
  const [loading, setLoading] = useState(true);
  const { transactions, isLoading, error } = useGetAllTransactions();

  useEffect(() => {
    const getTransaction = async () => {
      transactions.map((transaction) => {
        if (transaction._id === id) {
          setTransaction(transaction);
          setIsTransactionLoaded(true);
          setEditedInvoice(transaction);
        }
      });
    };
    if (transactions.length > 0) getTransaction();
  }, [currentUser, transactions, id]);

  useEffect(() => {
    if (cancelEdit) {
      setEditedInvoice(transaction);
      setCancelEdit(false);
    }
  }, [cancelEdit, transaction]);

  useEffect(() => {
    if (!isTransactionLoaded && currentUser) {
      // Fetch the transaction if not loaded
    }
  }, [isTransactionLoaded, currentUser, id, history]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (transaction && currentUser) {
    return (
      <Layout>
        <div id="invoice" className="overflow-scroll p-4">
          {!edit ? (
            <Suspense fallback={<div>Loading invoice details...</div>}>
              <InvoiceDetails
                transaction={transaction}
                currentUser={currentUser}
                setEdit={setEdit}
                sendInvoice={sendInvoice}
                history={history}
                id={id}
              />
            </Suspense>
          ) : (
            <Suspense fallback={<div>Loading edit form...</div>}>
              <EditInvoice
                {...props}
                setEdit={setEdit}
                editedInvoice={editedInvoice}
                setEditedInvoice={setEditedInvoice}
                setCancelEdit={setCancelEdit}
                setLoading={setLoading}
                transaction={transaction}
                setIsTransactionLoaded={setIsTransactionLoaded}
              />
            </Suspense>
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

export default InvoiceTransaction;
