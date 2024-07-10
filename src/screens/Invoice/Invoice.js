import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditInvoice from "./EditInvoice";
import { sendInvoice } from "../../utils/invoiceFunctions";
import imgPlaceholder from "./image-placeholder.png";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

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
            <div
              id="invoice-ready"
              className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
            >
              <header className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Invoice</h1>
                <address className="mb-4">
                  <p className="mb-2">email@gmail.com (Company E-mail)</p>
                  <p className="mb-2">
                    45189, Research Place, Suite 150A (Company Address)
                  </p>
                  <p className="mb-2">
                    Business Number: 0-808-234-2380 (Company Number)
                  </p>
                </address>
                <span className="block mb-4">
                  <img
                    alt="company"
                    src={imgPlaceholder}
                    className="h-16 w-16 object-cover"
                  />
                </span>
              </header>
              <article className="mb-6">
                <h1 className="text-xl font-semibold mb-4">Recipient</h1>
                <address className="mb-4">
                  <h4 className="font-semibold">
                    {currentUser.username || "Sample Name"} (Client Name)
                  </h4>
                  <p className="mb-2">
                    {currentUser.email || "Sample E-mail"} (Client E-mail)
                  </p>
                  <p className="mb-2">
                    {currentUser.address || "Sample Address"} (Client Address)
                  </p>
                  <p className="mb-2">
                    {currentUser.phone || "Sample Number"} (Client Number)
                  </p>
                </address>
                <table className="meta mb-6 w-full text-left">
                  <tbody>
                    <tr>
                      <th className="py-2 pr-4">Invoice #</th>
                      <td className="py-2">{transaction.id}</td>
                    </tr>
                    <tr>
                      <th className="py-2 pr-4">Date Availed</th>
                      <td className="py-2">
                        {transaction.manualDateAdded ||
                          new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2 pr-4">Amount Due</th>
                      <td className="py-2">${transaction.cart.total_price}</td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width: "auto" }} className="inventory w-full text-left mb-6">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4">S. No</th>
                      <th className="py-2 px-4">ID</th>
                      <th className="py-2 px-4">Description</th>
                      <th className="py-2 px-4">Qty</th>
                      <th className="py-2 px-4">Rate Per Qty</th>
                      <th className="py-2 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.cart.items.map((item, index) => (
                      <tr key={item._id} className="border-t">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{item._id}</td>
                        <td className="py-2 px-4">
                          {item.description || "Static Description"} {item.name}
                        </td>
                        <td className="py-2 px-4">{item.qty}</td>
                        <td className="py-2 px-4">${item.price}</td>
                        <td className="py-2 px-4">
                          ${(item.price * item.qty).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="sign w-full text-left mb-6">
                  <tbody>
                    <tr>
                      <td className="py-2">
                        Signature Here
                        <br />
                        <img
                          src={imgPlaceholder}
                          alt="signature"
                          className="h-16 w-16 object-cover"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="balance w-full text-left">
                  <tbody>
                    <tr>
                      <th className="py-2 pr-4">Total</th>
                      <td className="py-2">${transaction.cart.total_price}</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <aside className="mb-6">
                <h1 className="text-xl font-semibold mb-4">Additional Notes</h1>
                <div>
                  <p>
                    We offer a limited 10-day refund policy and a 30-day
                    workmanship warranty on all of our services. For more
                    details, please read our refund policy below.
                  </p>
                </div>
              </aside>
              {currentUser.isAdmin && (
                <>
                  <div className="text-center mb-4">
                    <button
                      className="btn btn-warning"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-center mb-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        sendInvoice({
                          transactionId: id,
                          userId: transaction.user._id,
                          history,
                          currentInvoice: transaction,
                          status: currentUser.isAdmin ? "completed" : "pending",
                        });
                      }}
                    >
                      Send Invoice
                    </button>
                  </div>
                </>
              )}
              {!currentUser.isAdmin && (
                <div className="text-center mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      history(`/dashboard/transaction/${id}`);
                    }}
                  >
                    Return
                  </button>
                </div>
              )}
            </div>
          ) : (
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
