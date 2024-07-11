import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";
import useGetAllUsers from "../../../hooks/useGetAllUsers";

const Students = lazy(() => import("../../../components/Courses/Students"));

const ViewStudents = (props) => {
  const { currentUser } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, error, isLoading } = useGetAllCourses();
  const { users } = useGetAllUsers();
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
      users.forEach((user) => {
        if (user.id === studentId) {
          students.push(user);
        }
      });
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="row">
          <div className="col-xs-10 w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <Students
                course={course}
                id={id}
                searchedItems={searchedItems}
                studentsSlice={studentsSlice}
                setStudentsSlice={setStudentsSlice}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewStudents;
