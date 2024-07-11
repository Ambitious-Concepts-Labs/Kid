// CourseTable.js
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const CourseTable = ({ updatedCourses, setUpdatedCourses }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (courseId) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "courses", courseId));
      setUpdatedCourses(
        updatedCourses.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
    setDeleting(false);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Course Id
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Course Name
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Instructor
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {updatedCourses.map((course) => (
          <tr key={course.id}>
            <td className="px-4 py-2">{course.coureId}</td>
            <td className="px-4 py-2">{course.courseName}</td>
            <td className="px-4 py-2">
              {course.instructor || "No Instructor"}
            </td>
            <td className="px-4 py-2">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(course.coureId)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
