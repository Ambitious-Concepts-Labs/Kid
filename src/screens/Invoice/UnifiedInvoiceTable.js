import React, { useState, useEffect, lazy, Suspense } from "react";
import Layout from "../../components/Dashboard/Layout";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";
import useGetAllUsers from "../../hooks/useGetAllUsers";

const SearchBar = lazy(() => import("../../components/SearchBar"));
const InvoiceTypeButtons = lazy(() => import("../../components/Transactions/InvoiceTypeButtons"));
const InvoiceTable = lazy(() => import("../../components/Tables/InvoiceTable"));
const Pagination = lazy(() => import("../../components/Pagination"));

const UnifiedInvoiceTable = ({ currentUser }) => {
  const { transactions, isLoading, error } = useGetAllTransactions();
  const [invoiceType, setInvoiceType] = useState("all");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(10);
  const { users } = useGetAllUsers();

  const getTransactions = async () => {
    try {
      transactions.forEach(async (transaction) => {
        users.forEach((user) => {
          const username = user.username;
          if (user.id === transaction.user) {
            transaction.username = username ? username : "Anonymous";
            setAllTransactions((prev) => [...prev, transaction]);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    setAllTransactions(transactions);
    if (transactions.length > 0) {
      getTransactions();
      let filtered = [];
      if (invoiceType === "all") {
        filtered = transactions;
      } else {
        filtered = transactions.filter((item) => item.status === invoiceType);
      }
      setInvoices(filtered);
      setFilteredInvoices(filtered);
      setSearchedItems(filtered);
      setLoading(false);
    }
  }, [currentUser, transactions, invoiceType, loading]);

  if (!currentUser) return <h1>Loading...</h1>;

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <Suspense fallback={<div>Loading invoice type buttons...</div>}>
          <InvoiceTypeButtons
            invoiceType={invoiceType}
            setInvoiceType={setInvoiceType}
          />
        </Suspense>
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
          <Suspense fallback={<div>Loading search bar...</div>}>
            <SearchBar
              setSearched={setSearched}
              setSearchedItems={setSearchedItems}
              search={handleSearch}
              items={filteredInvoices}
              placeholder="Search username"
            />
          </Suspense>
          <Suspense fallback={<div>Loading invoice table...</div>}>
            <InvoiceTable
              currentItems={currentItems}
              handleSort={handleSort}
              searched={searched}
              searchedItems={searchedItems}
            />
          </Suspense>
          {searchedItems.length > itemsPerPage && (
            <Suspense fallback={<div>Loading pagination...</div>}>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                searchedItems={searchedItems}
              />
            </Suspense>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UnifiedInvoiceTable;
