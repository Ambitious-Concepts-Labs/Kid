import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "../../utils/invoiceFunctions";
import SearchBar from "./SearchBar";
import Layout from "../../components/Dashboard/Layout";

const ForPayment = (props) => {
  const { currentUser } = props;
  const [searched, setSearched] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [forPayment, setForPayment] = useState([]);
  const [areForPaymentLoaded, setAreForPaymentLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [forPaymentSlice, setForPaymentSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setForPaymentSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  useEffect(() => {
    let unmounted = false;
    if (currentUser && !areForPaymentLoaded) {
      const res = [];
      currentUser.transactions.forEach(async (item) => {
        if (item.status === "for payment") res.push(item);
      });
      if (!unmounted) {
        if (res.length > 0) {
          const sortedForPayment = res.sort((a, b) => {
            const userA = a.createdAt.toUpperCase();
            const userB = b.createdAt.toUpperCase();
            if (userA < userB) {
              return -1;
            } else if (userA > userB) {
              return 1;
            }
            return 0;
          });
          setForPayment(sortedForPayment);
          setSearchedItems(sortedForPayment);
        }
        setAreForPaymentLoaded(true);
      }
    }
    return function() {
      unmounted = true;
    };
  }, [areForPaymentLoaded, currentUser]);

  if (areForPaymentLoaded) {
    return (
      <Layout>
        <div className="container mx-auto py-6">
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              <div className="bg-white shadow-md rounded-lg p-6">
                {forPayment.length > 0 ? (
                  <>
                    <div className="border-b pb-4 mb-4">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        Items For Payment
                      </h2>
                    </div>
                    <div>
                      <SearchBar
                        setSearched={setSearched}
                        setSearchedItems={setSearchedItems}
                        search={search}
                        items={forPayment}
                        setItemsSlice={setForPaymentSlice}
                        placeholder="Search username"
                      />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Date Availed
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Items
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                          </tr>
                        </thead>
                        {searchedItems.map((transaction) => (
                          <tbody key={transaction._id}>
                            <tr>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {currentUser.username}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {transaction.createdAt
                                    .toDate()
                                    .toDateString()}
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
                                  to={`/transaction/${transaction._id}`}
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
                    {searchedItems.length > 10 && (
                      <div className="flex justify-center mt-4">
                        {forPaymentSlice[0] > 0 && (
                          <button
                            className="btn btn-primary mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                              setCurrentPage(currentPage - 1);
                            }}
                          >
                            Prev
                          </button>
                        )}
                        {forPaymentSlice[1] < searchedItems.length && (
                          <button
                            className="btn btn-primary py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                              setCurrentPage(currentPage + 1);
                            }}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <h2 className="text-center text-lg text-gray-600">
                    There are no items for payment
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-indigo-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default ForPayment;
