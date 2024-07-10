import React, { useState } from "react";
import { db } from "../../../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const DeleteCourse = (props) => {
  const { currentUser } = props
  const { courses, error, isLoading } = useGetAllCourses();
  const [updatedCourses, setUpdatedCourses] = useState(courses);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (courseId) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "courses", courseId));
      setUpdatedCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
    setDeleting(false);
  };

  if (!currentUser?.isAdmin) return <div className="text-center">Access Denied</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="container mx-auto p-4 overflow-scroll">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
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
              {!updatedCourses.length && (
                <div className="text-center mt-4">No courses found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeleteCourse;
