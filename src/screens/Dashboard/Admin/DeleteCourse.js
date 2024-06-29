import React, { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Layout from "../../../components/Dashboard/Layout";

const DeleteCourse = (props) => {
  const { currentUser } = props
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchCourses = async () => {
    const coursesCollection = collection(db, "courses");
    const coursesSnapshot = await getDocs(coursesCollection);
    const coursesList = coursesSnapshot.docs.map((doc) => ({
      coureId: doc.id,
      ...doc.data(),
    }));
      console.log(coursesList)
    setCourses(coursesList);
    setLoading(false);
  };

  const handleDelete = async (courseId) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "courses", courseId));
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
    setDeleting(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (!currentUser?.isAdmin) {
    return <div className="text-center">Access Denied</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
                  {courses.map((course) => (
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
              {!courses.length && (
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
