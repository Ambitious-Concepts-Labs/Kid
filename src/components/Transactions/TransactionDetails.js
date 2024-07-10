import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { cancelTransaction } from "../../utils/invoiceFunctions";

const Paypal = lazy(() => import("./Paypal"));

const TransactionDetails = ({
  transaction,
  currentUser,
  setIsTransactionLoaded,
  setTransaction,
  setLoading,
  history,
  ...props
}) => {
  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <h3 className="text-lg mb-4">User: {currentUser.username}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            {/* ... (table header and body) */}
          </table>
        </div>
        <div className="mt-4">
          {currentUser.isAdmin && transaction.status !== "completed" && (
            <Link
              className="btn btn-primary"
              onClick={() => setIsTransactionLoaded(false)}
              to={`/dashboard/transaction/${transaction._id}/invoice`}
            >
              View Invoice
            </Link>
          )}
          {transaction.status === "pending" && (
            <button
              className="btn btn-danger"
              onClick={() =>
                cancelTransaction({
                  ...props,
                  transaction,
                  history,
                  setTransaction,
                  setLoading,
                })
              }
            >
              Cancel Transaction
            </button>
          )}
          {!currentUser.isAdmin && transaction.status === "for payment" && (
            <>
              <Link
                className="btn btn-primary"
                onClick={() => setIsTransactionLoaded(false)}
                to={`/dashboard/transaction/${transaction._id}/invoice`}
                style={{ width: "200px", marginBottom: "5px" }}
              >
                View Invoice
              </Link>
              <Suspense fallback={<div>Loading Paypal...</div>}>
                <Paypal
                  {...props}
                  transaction={transaction}
                  setLoading={setLoading}
                />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
