import React from 'react'
import { Link } from 'react-router-dom'

export default function InvoiceTable({
    handleSort,
    currentItems,
    searched,
    searchedItems,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              onClick={() => handleSort("username")}
            >
              Username
            </th>
            <th
              className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              onClick={() => handleSort("date")}
            >
              Date Availed
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Items
            </th>
            <th
              className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              onClick={() => handleSort("amount")}
            >
              Amount
            </th>
            <th
              className="cursor-pointer px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              onClick={() => handleSort("status")}
            >
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
          </tr>
        </thead>
        {currentItems.map((transaction) => (
          <tbody key={transaction._id}>
            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {transaction.username}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(transaction.createdAt).toDateString()}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {transaction.cart.total_quantity}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  ${transaction.cart.total_price}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {transaction.status.toUpperCase()}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Link
                  className="text-indigo-600 hover:text-indigo-900"
                  to={`/dashboard/transaction/${transaction._id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {searched && !searchedItems.length && (
        <div className="text-center py-4">
          <h2 className="text-lg text-gray-600">
            No transactions found with searched user
          </h2>
        </div>
      )}
    </div>
  );
}
