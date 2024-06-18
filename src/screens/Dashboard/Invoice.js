// Imports
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import EditInvoice from "./EditInvoice";
import { sendInvoice } from "./invoiceFunctions";
import imgPlaceholder from "./image-placeholder.png";
// import Axios from "axios";
import "./Invoice.css";

import { db } from "../../firebase";
import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { removeDuplicates } from "../../utils/helperfunctions";
import Layout from "../../components/Dashboard/Layout";

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
	const textAlignCenter = { textAlign: "center" };

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
		if (cancelEdit) {
			setEditedInvoice(transaction);
			setCancelEdit(false);
		}
	}, [cancelEdit, transaction]);

	useEffect(() => {
		// let source = Axios.CancelToken.source();
		let unmounted = false;
		if (!isTransactionLoaded && currentUser) {
			// Axios.get(
			// 	`/transaction/${id}`,
			// 	{ params: { id: id } },
			// 	{ cancelToken: source.token }
			// )
			// 	.then((res) => {
			// 		if (!unmounted) {
			// 			setTransaction(res.data.transaction);
			// 			setIsTransactionLoaded(true);
			// 			setEditedInvoice(res.data.transaction);
			// 			setLoading(false);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		if (!unmounted) {
			// 			// if (Axios.isCancel(err)) {
			// 			// 	console.log(`request cancelled:${err.message}`);
			// 			// } else {
			// 			// 	console.log("another error happened:" + err.message);
			// 			// }
			// 		}
			// 	});
		}
		return function () {
			unmounted = true;
			// source.cancel("Cancelling in cleanup");
		};
	}, [
		isTransactionLoaded,
		currentUser,
		id,
		history,
	]);

	console.log(currentUser)
	if (transaction.length > 0 && currentUser) {
		return (
      <Layout>
        <div style={{overflow: "scroll"}} id="invoice">
          {!edit ? (
            <div id="invoice-ready">
              <header>
                <h1>Invoice</h1>
                <address>
                  <p> email@gmail.com (Company E-mail)</p>
                  <p> 45189, Research Place, Suite 150A (Company Address)</p>
                  <p> Business Number: 0-808-234-2380 (Company Number)</p>
                </address>
                <span>
                  <img alt="it" src={imgPlaceholder} id="company-img" />
                </span>
              </header>
              <article>
                <h1>Recipient</h1>
                <address className="norm">
                  <h4>{currentUser.username || "Sample Name"}(Client Name)</h4>
                  <p>{currentUser.email || "Sample E-mail"}(Client E-mail)</p>
                  <br />
                  <p>
                    {currentUser.address || "Sample Address"}(Client Address)
                  </p>
                  <br />
                  <p>{currentUser.phone || "Sample Number"}(Client Number)</p>
                </address>

                <table className="meta">
                  <tbody>
                    <tr>
                      <th>
                        <span>Invoice #</span>
                      </th>
                      <td>
                        <span style={{ wordWrap: "break-word" }}>
                          {transaction._id}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Date Availed</span>
                      </th>
                      <td>
                        <span>
                          {transaction.manualDateAdded ||
                            Date(transaction.createdAt)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Amount Due</span>
                      </th>
                      <td>
                        <span id="prefix">$</span>
                        <span>{transaction[0].cart.total_price}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="inventory">
                  <thead>
                    <tr>
                      <th>
                        <span>S. No</span>
                      </th>
                      <th>
                        <span>ID</span>
                      </th>
                      <th>
                        <span>Description</span>
                        <span>Item Name</span>
                      </th>
                      <th>
                        <span>Qty</span>
                      </th>
                      <th>
                        <span>Rate Per Qty</span>
                      </th>
                      <th>
                        <span>Amount</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction[0].cart.items.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>
                            <span>{index + 1}</span>
                          </td>
                          <td>
                            <span>
                              {item.description || "Static Description"}
                              {item._id}
                            </span>
                          </td>
                          <td>
                            <span>
                              {item.description || "Static Description"}
                              {item.name}
                            </span>
                          </td>
                          <td>
                            <span>{item.qty}</span>
                          </td>
                          <td>
                            <span data-prefix>$</span>
                            <span>{item.price}</span>
                          </td>
                          <td>
                            <span data-prefix>$</span>
                            <span>
                              {parseFloat(item.price * item.qty).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <table className="sign">
                  <tbody>
                    <tr>
                      <td>
                        Signature Here
                        <br />
                        <img src={imgPlaceholder} alt="img" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="balance">
                  <tbody>
                    <tr>
                      <th>
                        <span>Total</span>
                      </th>
                      <td>
                        <span data-prefix>$</span>
                        <span>{transaction[0].cart.total_price}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <aside>
                <h1>
                  <span>Additional Notes</span>
                </h1>
                <div>
                  <p>
                    We offer limited 10 days refund policy and 30 days
                    workmanship warranty on all of our services. For more
                    details, please read our refund policy below.
                  </p>
                </div>
              </aside>
              {currentUser.isAdmin && (
                <>
                  <div style={textAlignCenter}>
                    <button
                      className="btn btn-warning"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </button>
                  </div>

                  <div style={textAlignCenter}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        sendInvoice({
                          transactionId: id,
                          userId: transaction.user._id,
                          history,
                        });
                      }}
                    >
                      Send Invoice
                    </button>
                  </div>
                </>
              )}
              {!currentUser.isAdmin && (
                <div style={textAlignCenter}>
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
			<div className="spinner-border-container">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}
};

export default InvoiceTransaction;
