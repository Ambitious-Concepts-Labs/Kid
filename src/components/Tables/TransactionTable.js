import React from "react";
import { Link } from "react-router-dom";

const TransactionTable = ({
  currentUser,
  allTransactions,
  transactionsSlice,
  currentPage,
  setCurrentPage,
  setCheckUser,
}) => {
  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <h3 className="text-lg mb-4">User: {currentUser.username}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Date Available</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-t">
                  <td className="px-4 py-2">{Date.now()}</td>
                  <td className="px-4 py-2">
                    {transaction.cart.total_quantity}
                  </td>
                  <td className="px-4 py-2">${transaction.cart.total_price}</td>
                  <td className="px-4 py-2">
                    {transaction.status.toUpperCase()}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      className="text-blue-500 hover:text-blue-700"
                      to={`/dashboard/transaction/${transaction._id}`}
                      onClick={() => {
                        setCheckUser(false);
                      }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {transactionsSlice[0] !== 0 && (
            <button
              className="btn btn-primary mr-2"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {transactionsSlice[1] < currentUser.transactions.length && (
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
