import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import SearchBar from "./SearchBar";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";

const UnifiedInvoiceTable = ({ currentUser }) => {
  const [invoiceType, setInvoiceType] = useState("all");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setTransactions] = useState([]);
  const [itemsPerPage] = useState(10);
  const transactions = useGetAllTransactions();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        transactions.forEach(async (transaction) => {
          usersData.forEach((user) => {
            const username = user.username
            if (user.id === transaction.user) {
              transaction.username = username ? username : "Anonymous";
              setTransactions((prev) => [...prev, transaction]);
            }
          });
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    };
    getTransactions();
  }, [currentUser]);

  useEffect(() => {
    const uniqueTransactions = [
     ...new Map(allTransactions.map((item) => [item.id, item])).values(),
    ];

    let filtered = [];
    if (invoiceType === "all") {
      filtered = uniqueTransactions;
    } else {
      filtered = uniqueTransactions.filter(
        (item) => item.status === invoiceType
      );
    }
    setInvoices(filtered);
    setFilteredInvoices(filtered);
    setSearchedItems(filtered);
  }, [transactions, invoiceType]);

  if (!currentUser) return <h1>Loading...</h1>

  const handleSort = (key) => {
    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
      if (key === "amount") {
        return b.cart.total_price - a.cart.total_price;
      } else if (key === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        const nameA = a[key].toUpperCase();
        const nameB = b[key].toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }
    });
    setFilteredInvoices(sortedInvoices);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const results = invoices.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInvoices(results);
      setSearchedItems(results);
      setSearched(true);
    } else {
      setFilteredInvoices(invoices);
      setSearchedItems(invoices);
      setSearched(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <div className="container mx-auto py-6">
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
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {invoiceType === "all"
                ? "All Invoices"
                : invoiceType.charAt(0).toUpperCase() +
                  invoiceType.slice(1) +
                  " Invoices"}
            </h2>
          </div>
          <SearchBar
            setSearched={setSearched}
            setSearchedItems={setSearchedItems}
            search={handleSearch}
            items={filteredInvoices}
            placeholder="Search username"
          />
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
          {searchedItems.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              {indexOfFirstItem > 0 && (
                <button
                  className="btn btn-primary mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
              )}
              {indexOfLastItem < searchedItems.length && (
                <button
                  className="btn btn-primary py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UnifiedInvoiceTable;
