// StudentSearch.js
import React from "react";

const StudentSearch = ({
  showStudentResults,
  setShowStudentResults,
  setFocused,
  handleAssignedStudent,
  filteredStudents,
  handleSelectedStudent,
  setFilteredStudents,
  students,
}) => (
  <div className="form-group mb-4">
    <label
      htmlFor="assigned-student"
      className="block text-sm font-medium text-gray-700"
    >
      Student
    </label>
    <input
      type="text"
      className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      id="assigned-student"
      onClick={(e) => {
        setShowStudentResults(true);
        setFocused(e.target.id);
        if (!e.target.value.length) {
          setFilteredStudents(students);
        }
      }}
      onChange={(e) => {
        handleAssignedStudent(e);
      }}
    />
    {showStudentResults && (
      <div id="results-container" className="mt-2 space-y-2">
        {filteredStudents.slice(0, 10).map((student) => (
          <button
            key={student.id}
            type="button"
            className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onClick={() => {
              handleSelectedStudent(student);
            }}
          >
            {student.username}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default StudentSearch;
