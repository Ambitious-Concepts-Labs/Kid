import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../image-placeholder.png";
import {
  addItem,
  removeItem,
  sendInvoice,
} from "../../../utils/invoiceFunctions";
import "./NewInvoice.css";
import * as Papa from "papaparse";
import Layout from "../../../components/Dashboard/Layout";

const NewInvoice = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const textAlignCenter = { textAlign: "center" };

  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({});
  const [selectedInput, setSelectedInput] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    _id: "",
    user: {},
    manualDateAdded: "",
    cart: { items: [], total_quantity: 0, total_price: 0 },
  });

  function setInputFilter(textbox, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }

  useEffect(() => {
    if (selectedInput) {
      setInputFilter(document.querySelector(`#${selectedInput}`), function(
        value
      ) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
      });
    }
  }, [selectedInput]);

  useEffect(() => {
    const readCsv = () => {
      fetch("data.csv")
        .then((response) => response.text())
        .then((responseText) => {
          var data = Papa.parse(responseText, {
            complete: function(results) {
              console.log("results: ", results.data);
              let res = [];
              for (const data of results.data) {
                res.push({
                  _id: data[0],
                  price: data[20],
                  name: data[19],
                });
              }
              console.log("results: ", results.data);
              console.log({ res });

              const test = res.slice(0, 100).sort((a, b) => {
                if (a.name && b.name) {
                  if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return -1;
                  }
                  if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                  }
                  return 0;
                }
              });

              console.log({ test });
              setProductIds(res);
            },
          });
          return data;
          // setProducts( responseText );
        });
    };

    readCsv();
    setLoading(false);

    // Axios.get("/product/products", { cancelToken: source.token })
    // 	.then((res) => {
    // 		if (!unmounted) {
    // 			setProductIds(
    // 				res.data.map((product) => {
    // 					const container = {};
    // 					container.id = product.id;
    // 					return container;
    // 				})
    // 			);
    // 			setLoading(false);
    // 		}
    // 	})
    // 	.catch((err) => {
    // 		if (!unmounted) {
    // 			if (Axios.isCancel(err)) {
    // 				console.log(`request cancelled:${err.message}`);
    // 			} else {
    // 				console.log("another error happened:" + err.message);
    // 			}
    // 			setLoading(false);
    // 		}
    // 	});
  }, []);

  if (!currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (!loading) {
    return (
      <Layout>
        <div id="new-invoice">
          <header>
            <h1>Invoice</h1>
            <address>
              <p> Company@email.com </p>
              <p> Company's Address</p>
              <p> P: 1-800-961-4952 </p>
              <p> Company's Business Number</p>
            </address>
            <span>
              <img
                loading="lazy"
                alt="it"
                src={imgPlaceholder}
                id="company-img"
              />
            </span>
          </header>
          <article>
            <h1 id="recipient">Recipient</h1>
            <address className="norm">
              <input
                type="text"
                placeholder="Client Username"
                required
                onChange={(e) => {
                  setNewInvoice({
                    ...newInvoice,
                    user: { ...newInvoice.user, username: e.target.value },
                  });
                }}
              />
              <br />
              <input
                type="text"
                placeholder="Client Email"
                required
                onChange={(e) => {
                  setNewInvoice({
                    ...newInvoice,
                    user: { ...newInvoice.user, email: e.target.value },
                  });
                }}
              />
              <br />
              <input
                type="text"
                placeholder="Client Address"
                required
                onChange={(e) => {
                  setNewInvoice({
                    ...newInvoice,
                    user: { ...newInvoice.user, address: e.target.value },
                  });
                }}
              />
              <br />
              <input
                type="text"
                placeholder="Client Contact No."
                required
                onChange={(e) => {
                  setNewInvoice({
                    ...newInvoice,
                    user: { ...newInvoice.user, contactNum: e.target.value },
                  });
                }}
              />
            </address>

            <table className="meta">
              <tbody>
                <tr>
                  <th>
                    <span>Invoice #</span>
                  </th>
                  <td>To generated by mongoDB</td>
                </tr>
                <tr>
                  <th>
                    <span>Date Availed</span>
                  </th>
                  <td>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setNewInvoice({
                          ...newInvoice,
                          manualDateAdded: e.target.value,
                        });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span>Amount Due</span>
                  </th>
                  <td>
                    {newInvoice.cart.total_price
                      ? `$${newInvoice.cart.total_price}`
                      : ""}
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
                  <th style={{ width: "8%", visibility: "hidden" }}>
                    <span>Filler</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {newInvoice.cart.items.length > 0 &&
                  newInvoice.cart.items.map((item, index) => {
                    if (newInvoice.cart.items.length > 0) {
                      return (
                        <tr key={item.id}>
                          <td>
                            <span>{index + 1}</span>
                          </td>
                          <td>
                            <span>{item.id}</span>
                          </td>
                          <td>
                            <span>{item.name}</span>
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
                          <td id="remove-button-container">
                            <button
                              className="btn btn-danger"
                              style={{ width: "100%" }}
                              onClick={() => {
                                removeItem({
                                  setNewInvoice,
                                  newInvoice,
                                  item,
                                });
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return "";
                    }
                  })}
                <tr>
                  <td>
                    <span>
                      {newInvoice.cart.items.length
                        ? newInvoice.cart.items.length + 1
                        : "1"}
                    </span>
                  </td>
                  <td>
                    <span>
                      <input
                        type="text"
                        required
                        id="new-item-id"
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            id: e.target.value,
                          });
                        }}
                      />
                    </span>
                  </td>
                  <td>
                    <span>
                      <input
                        type="text"
                        required
                        id="new-item-name"
                        onChange={(e) => {
                          setNewItem({
                            ...newItem,
                            name: e.target.value,
                          });
                        }}
                      />
                    </span>
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      id="new-item-qty"
                      onKeyDown={() => {
                        setSelectedInput("new-item-qty");
                      }}
                      onClick={() => {
                        setSelectedInput("new-item-qty");
                      }}
                      onChange={(e) => {
                        setNewItem({
                          ...newItem,
                          qty: parseInt(e.target.value),
                        });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      id="new-item-price"
                      onKeyDown={() => {
                        setSelectedInput("new-item-price");
                      }}
                      onClick={() => {
                        setSelectedInput("new-item-price");
                      }}
                      onChange={(e) => {
                        setNewItem({
                          ...newItem,
                          price: +parseFloat(e.target.value).toFixed(2),
                        });
                      }}
                    />
                  </td>
                  <td>
                    <span>
                      {newItem.price > 0 && newItem.qty
                        ? `$${(newItem.price * newItem.qty).toFixed(2)}`
                        : ""}
                    </span>
                  </td>

                  <td id="add-button-container">
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        addItem({
                          setNewItem,
                          newInvoice,
                          newItem,
                          productIds: productIds,
                        });
                      }}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="sign">
              <tbody>
                <tr>
                  <td>
                    Signature Here
                    <br />
                    <img loading="lazy" src={imgPlaceholder} alt="img" />
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
                    <span>
                      {newInvoice.cart.total_price
                        ? `$${newInvoice.cart.total_price}`
                        : ""}
                    </span>
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
                We offer limited 10 days refund policy and 30 days workmanship
                warranty on all of our services. For more details, please read
                our refund policy below.
              </p>
            </div>
          </aside>
          <div style={textAlignCenter}>
            <button
              className="btn btn-primary"
              onClick={() => {
                sendInvoice({
                  currentUser,
                  transactionId: newInvoice._id,
                  history,
                  setLoading,
                  newInvoice: newInvoice,
                  isNewInvoice: true,
                });
              }}
            >
              Send Invoice
            </button>
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

export default NewInvoice;
