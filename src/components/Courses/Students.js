import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { searchStudent } from "../../utils/courseFunctions";

export default function Students({
    course,
    id,
    setSearchedItems,
    searchedItems,
    studentsSlice,
    setStudentsSlice,
    setCurrentPage,
    currentPage
}) {
  return (
    <div className="panel panel-primary">
      <div className="panel-heading bg-blue-500 text-white p-4 rounded-t">
        <h4 className="panel-title text-lg">Enrolled Students</h4>
        <h2 className="panel-title text-2xl mt-2">
          Course: {course.courseName}
        </h2>
        <Link to={`/dashboard/admin/course/${id}`}> Edit course</Link>
      </div>
      <div className="p-4">
        <SearchBar
          setSearchedItems={setSearchedItems}
          search={searchStudent}
          items={course.students}
          setItemsSlice={setStudentsSlice}
          placeholder={"Search student username"}
        />
      </div>
      <ul className="list-group">
        <li className="list-group-item p-4">
          <table className="table table-hover w-full">
            {searchedItems.length > 0 && (
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">
                    <button style={{ visibility: "hidden" }}>xxxx</button>
                  </th>
                </tr>
              </thead>
            )}
            {searchedItems
              .slice(studentsSlice[0], studentsSlice[1])
              .map((student) => (
                <tbody key={student.id} className="border-t">
                  <tr>
                    <td className="border px-4 py-2">{student.id}</td>
                    <td className="border px-4 py-2">{student.username}</td>
                    <td className="border px-4 py-2">
                      <Link
                        className="btn btn-primary bg-blue-500 text-white py-1 px-3 rounded"
                        to={`/dashboard/course/${id}/students/${student.username}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          {!searchedItems.length && (
            <h2 className="text-center w-full py-4">No student found</h2>
          )}
        </li>
      </ul>
      {searchedItems.length > 10 && (
        <div className="flex justify-center mt-4">
          {studentsSlice[0] > 0 && (
            <button
              className="btn btn-primary bg-blue-500 text-white py-1 px-3 rounded mx-2"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {studentsSlice[1] < searchedItems.length && (
            <button
              className="btn btn-primary bg-blue-500 text-white py-1 px-3 rounded mx-2"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}