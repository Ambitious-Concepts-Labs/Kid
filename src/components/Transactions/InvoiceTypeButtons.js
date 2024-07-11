import React from "react";

const InvoiceTypeButtons = ({ invoiceType, setInvoiceType }) => (
  <div className="flex justify-center mb-4">
    <button
      className={`btn ${
        invoiceType === "all" ? "btn-primary" : "btn-secondary"
      }`}
      onClick={() => setInvoiceType("all")}
    >
      All
    </button>
    <button
      className={`btn ${
        invoiceType === "for payment" ? "btn-primary" : "btn-secondary"
      }`}
      onClick={() => setInvoiceType("for payment")}
    >
      For Payment
    </button>
    <button
      className={`btn ${
        invoiceType === "pending" ? "btn-primary" : "btn-secondary"
      }`}
      onClick={() => setInvoiceType("pending")}
    >
      Pending
    </button>
    <button
      className={`btn ${
        invoiceType === "completed" ? "btn-primary" : "btn-secondary"
      }`}
      onClick={() => setInvoiceType("completed")}
    >
      Completed
    </button>
  </div>
);

export default InvoiceTypeButtons;
