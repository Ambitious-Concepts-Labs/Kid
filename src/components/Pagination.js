import React from 'react'

export default function Pagination({
    searchedItems,
    indexOfFirstItem,
    indexOfLastItem,
    setCurrentPage,
    currentPage,
}) {
  return (
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
  );
}
