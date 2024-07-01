import React, { useState, useEffect } from "react";
import imgPlaceholder from "./image-placeholder.png";
import {
  confirmEdit,
  editName,
  editQuantity,
  editRate,
} from "../../utils/invoiceFunctions";

const EditInvoice = (props) => {
  const { setEdit, setCancelEdit, editedInvoice, setEditedInvoice } = props;
  const [selectedInput, setSelectedInput] = useState("");

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
    if (editedInvoice && selectedInput) {
      setInputFilter(document.getElementById(`${selectedInput}`), function(
        value
      ) {
        return /^\d*\.?\d*$/.test(value);
      });
    }
  }, [selectedInput, editedInvoice]);

  if (editedInvoice) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="flex flex-col sm:flex-col justify-between items-center mb-6">
          <h1 style={{ width: "-webkit-fill-available" }} className="text-2xl font-bold">Invoice</h1>
          <div className="flex justify-between w-full">
            <div>
              <address className="not-italic mt-2 text-sm">
                <p>email@gmail.com (Company E-mail)</p>
                <p>45189, Research Place, Suite 150A (Company Address)</p>
                <p>Business Number: 0-808-234-2380 (Company Number)</p>
              </address>
            </div>
            <span>
              <img
                alt="Company Logo"
                src={imgPlaceholder}
                className="h-16 w-16 object-cover rounded-full"
              />
            </span>
          </div>
        </header>
        <article>
          <h2 className="text-xl font-bold mb-4">Recipient</h2>
          <address className="not-italic mb-4 text-sm">
            <h4 className="font-semibold">
              {editedInvoice.user.username || "Sample Name"} (Client Name)
            </h4>
            <p>{editedInvoice.user.email || "Sample E-mail"} (Client E-mail)</p>
            <p>
              {editedInvoice.user.address || "Sample Address"} (Client Address)
            </p>
            <p>
              {editedInvoice.user.contactNum || "Sample Number"} (Client Number)
            </p>
          </address>
          <table className="meta w-full mb-4">
            <tbody>
              <tr>
                <th className="text-left py-2">Invoice #</th>
                <td className="text-left py-2">{editedInvoice._id}</td>
              </tr>
              <tr>
                <th className="text-left py-2">Date Availed</th>
                <td className="text-left py-2">
                  <input
                    type="text"
                    placeholder={
                      editedInvoice.manualDateAdded || editedInvoice.createdAt
                    }
                    onChange={(event) => {
                      setEditedInvoice({
                        ...editedInvoice,
                        manualDateAdded: event.target.value.toString(),
                      });
                    }}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </td>
              </tr>
              <tr>
                <th className="text-left py-2">Amount Due</th>
                <td className="text-left py-2">
                  <span className="font-semibold">
                    ${editedInvoice.cart.total_price}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "auto" }} className="inventory w-full mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-2">S. No</th>
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Item Name</th>
                <th className="text-left py-2">Qty</th>
                <th className="text-left py-2">Rate Per Qty</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {editedInvoice.cart.items
                .sort((a, b) => {
                  const itemA = a._id.toUpperCase();
                  const itemB = b._id.toUpperCase();
                  if (itemA < itemB) {
                    return -1;
                  } else if (itemA > itemB) {
                    return 1;
                  }
                  return 0;
                })
                .map((item, index) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{item._id}</td>
                    <td className="py-2">
                      <input
                        type="text"
                        placeholder={item.name}
                        onChange={(event) => {
                          editName({ ...props, event, item });
                        }}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    </td>
                    <td className="py-2">
                      {item.type !== "course" ? (
                        <input
                          type="text"
                          placeholder={parseInt(item.qty)}
                          min="1"
                          max="5"
                          id={`${item._id}-qty`}
                          onClick={() => {
                            setSelectedInput(`${item._id}-qty`);
                          }}
                          onChange={(event) => {
                            editQuantity({ ...props, event, item });
                          }}
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                      ) : (
                        <input
                          type="text"
                          id={`${item._id}-qty`}
                          defaultValue={item.qty}
                          placeholder={item.qty}
                          disabled
                          className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                        />
                      )}
                    </td>
                    <td className="py-2">
                      <input
                        type="text"
                        placeholder={parseFloat(item.price)}
                        id={`${item._id}-rate`}
                        onClick={() => {
                          setSelectedInput(`${item._id}-rate`);
                        }}
                        onChange={(event) => {
                          editRate({ ...props, event, item });
                        }}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    </td>
                    <td className="py-2">
                      <span className="font-semibold">
                        ${parseFloat(item.price * item.qty).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="sign w-full mb-4">
            <tbody>
              <tr>
                <td className="py-2">
                  Signature Here
                  <br />
                  <img
                    src={imgPlaceholder}
                    alt="Signature"
                    className="h-16 w-16 object-cover rounded-full mt-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="balance w-full mb-4">
            <tbody>
              <tr>
                <th className="text-left py-2">Total</th>
                <td className="text-left py-2">
                  <span className="font-semibold">
                    ${editedInvoice.cart.total_price}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <aside className="mt-8">
          <h2 className="text-lg font-bold">Additional Notes</h2>
          <p className="mt-2 text-sm">
            We offer limited 10 days refund policy and 30 days workmanship
            warranty on all of our services. For more details, please read our
            refund policy below.
          </p>
        </aside>
        <div className="text-center mt-8">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition mr-4"
            onClick={() => {
              setEdit(false);
              setCancelEdit(true);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            onClick={() => {
              confirmEdit({
                ...props,
              });
            }}
          >
            Confirm Edit
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default EditInvoice;
