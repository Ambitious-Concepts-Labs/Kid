import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { searchStudent } from "../../../utils/courseFunctions";
import SearchBar from "../SearchBar";
import Layout from "../../../components/Dashboard/Layout";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const ViewStudents = (props) => {
  const { currentUser } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const courses = useGetAllCourses();
  const [searchedItems, setSearchedItems] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsSlice, setStudentsSlice] = useState([0, 10]);

  useEffect(() => {
    setStudentsSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  const getStudents = async (currentCourse) => {
    const students = [];
    for (const studentId of currentCourse.students) {
      const studentRef = doc(db, "users", studentId);
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        console.log(studentDoc.data());
        students.push({ id: studentDoc.id, ...studentDoc.data() });
      }
    }
    return students;
  };

  const updateStudents = async (currentCourse) => {
    const students = await getStudents(currentCourse);
    const sortedStudents = students.sort((a, b) => {
      const userA = a.username.toUpperCase();
      const userB = b.username.toUpperCase();
      return userA.localeCompare(userB);
    });
    setSearchedItems(sortedStudents);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      const currentCourse = courses.find((course) => course.courseId === id);
      setCourse(currentCourse);
      if (currentCourse && currentCourse.students.length > 0) {
        updateStudents(currentCourse);
      } else {
        setLoading(false);
      }
    }
  }, [id, currentUser, courses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="row">
          <div className="col-xs-10 w-full">
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
                            <button style={{ visibility: "hidden" }}>
                              xxxx
                            </button>
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
                            <td className="border px-4 py-2">
                              {student.username}
                            </td>
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
                    <h2 className="text-center w-full py-4">
                      No student found
                    </h2>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewStudents;
