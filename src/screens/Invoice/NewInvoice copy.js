import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "./image-placeholder.png";
import { addItem, removeItem, sendInvoice } from "../../utils/invoiceFunctions";
import * as Papa from "papaparse";
import Layout from "../../components/Dashboard/Layout";

const NewInvoice = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({});
  const [selectedInput, setSelectedInput] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    _id: "",
    user: {},
    manualDateAdded: "",
    cart: { items: [], total_quantity: 0, total_price: 0 },
  });

  useEffect(() => {
    let unmounted = false;

    const readCsv = () => {
      fetch("data.csv")
        .then((response) => response.text())
        .then((responseText) => {
          const data = Papa.parse(responseText, {
            complete: function(results) {
              const res = results.data
                .map((data) => ({
                  _id: data[0],
                  price: data[20],
                  name: data[19],
                }))
                .slice(0, 100)
                .sort((a, b) =>
                  a.name.toUpperCase() < b.name.toUpperCase()
                    ? -1
                    : a.name.toUpperCase() > b.name.toUpperCase()
                    ? 1
                    : 0
                );
              setProductIds(res);
            },
          });
          return data;
        });
    };

    if (!unmounted) {
      readCsv();
      setLoading(false);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (selectedInput) {
      const inputFilter = (textbox) => {
        const events = [
          "input",
          "keydown",
          "keyup",
          "mousedown",
          "mouseup",
          "select",
          "contextmenu",
          "drop",
        ];
        events.forEach((event) => {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = "";
          }
        });
      };
      setInputFilter(document.querySelector(`#${selectedInput}`), inputFilter);
    }
  }, [selectedInput]);

  if (!currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (!loading) {
    return (
      <Layout>
        <div className="container mx-auto py-4">
          <div
            id="new-invoice"
            className="bg-white rounded-lg shadow-md p-6 text-sm"
          >
            <header className="flex items-center justify-between mb-6">
              <div className="text-center">
                <h1 className="text-xl font-bold uppercase tracking-wide text-white bg-blue-500 rounded-md py-2 px-4">
                  Invoice
                </h1>
                <address className="text-xs float-left mr-4">
                  <p>Company@email.com</p>
                  <p>Company's Address</p>
                  <p>P: 1-800-961-4952</p>
                  <p>Company's Business Number</p>
                </address>
              </div>
              <div>
                <img
                  src={imgPlaceholder}
                  alt="Company Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </header>

            <article className="mb-6">
              <h1 id="recipient" className="text-xl font-bold mb-4">
                Recipient
              </h1>
              <address className="float-left mr-4">
                <input
                  type="text"
                  placeholder="Client Username"
                  required
                  className="input-field"
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      user: { ...newInvoice.user, username: e.target.value },
                    })
                  }
                />
                <br />
                <input
                  type="text"
                  placeholder="Client Email"
                  required
                  className="input-field"
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      user: { ...newInvoice.user, email: e.target.value },
                    })
                  }
                />
                <br />
                <input
                  type="text"
                  placeholder="Client Address"
                  required
                  className="input-field"
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      user: { ...newInvoice.user, address: e.target.value },
                    })
                  }
                />
                <br />
                <input
                  type="text"
                  placeholder="Client Contact No."
                  required
                  className="input-field"
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      user: { ...newInvoice.user, contactNum: e.target.value },
                    })
                  }
                />
              </address>

              <table className="meta mb-6 float-right w-36">
                <tbody>
                  <tr>
                    <th>
                      <span className="block text-sm">Invoice #</span>
                    </th>
                    <td>
                      <span className="block">To be generated by MongoDB</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="block text-sm">Date Availed</span>
                    </th>
                    <td>
                      <input
                        type="text"
                        required
                        className="input-field"
                        onChange={(e) =>
                          setNewInvoice({
                            ...newInvoice,
                            manualDateAdded: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="block text-sm">Amount Due</span>
                    </th>
                    <td>
                      <span className="block">
                        {newInvoice.cart.total_price
                          ? `$${newInvoice.cart.total_price}`
                          : ""}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="inventory mb-6 w-full">
                <thead>
                  <tr>
                    <th>
                      <span className="block">S. No</span>
                    </th>
                    <th>
                      <span className="block">ID</span>
                    </th>
                    <th>
                      <span className="block">Item Name</span>
                    </th>
                    <th>
                      <span className="block">Qty</span>
                    </th>
                    <th>
                      <span className="block">Rate Per Qty</span>
                    </th>
                    <th>
                      <span className="block">Amount</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newInvoice.cart.items.length > 0 &&
                    newInvoice.cart.items.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          <span className="block">{index + 1}</span>
                        </td>
                        <td>
                          <span className="block">{item.id}</span>
                        </td>
                        <td>
                          <span className="block">{item.name}</span>
                        </td>
                        <td>
                          <span className="block">{item.qty}</span>
                        </td>
                        <td>
                          <span className="block">
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <span className="block">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td>
                      <span className="block">
                        {newInvoice.cart.items.length
                          ? newInvoice.cart.items.length + 1
                          : "1"}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        id="new-item-id"
                        className="input-field"
                        onChange={(e) =>
                          setNewItem({ ...newItem, id: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        id="new-item-name"
                        className="input-field"
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        id="new-item-qty"
                        className="input-field"
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            qty: parseInt(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        id="new-item-price"
                        className="input-field"
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            price: +parseFloat(e.target.value).toFixed(2),
                          })
                        }
                      />
                    </td>
                    <td>
                      <span className="block">
                        {newItem.price * newItem.qty}
                      </span>
                    </td>
                    <td>
                      <div id="add-button-container">
                        <button
                          className="btn btn-primary py-2 px-4"
                          onClick={() => {
                            addItem({
                              newItem,
                              setNewItem,
                              setProductIds,
                              newInvoice,
                              setNewInvoice,
                              // setCart,
                              // setSkuData,
                              selectedInput,
                              setSelectedInput,
                              history,
                              productIds,
                              sendInvoice,
                              setLoading,
                              currentUser,
                            });
                          }}
                        >
                          Add Item
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <br />
            </article>

            <aside className="w-48">
              <h1 className="border-b-2 border-gray-600 mb-4">Value</h1>
              <div className="flex justify-center">
                <button
                  className="btn btn-primary py-2 px-4"
                  onClick={() => {
                    sendInvoice({
                      currentUser,
                      transactionId: newInvoice._id,
                      history,
                      setLoading,
                      newInvoice,
                      isNewInvoice: true,
                    });
                  }}
                >
                  Send Invoice
                </button>
              </div>
            </aside>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default NewInvoice;