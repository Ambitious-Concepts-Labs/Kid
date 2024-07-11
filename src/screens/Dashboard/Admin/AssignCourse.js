import React, { useState, useEffect, Suspense, lazy } from "react";
import { assignCourse, selectCourse } from "../../../utils/courseFunctions";
import Layout from "../../../components/Dashboard/Layout";
import { useNavigate } from "react-router-dom";
import useGetAllCourses from "../../../hooks/useGetAllCourses";
import useGetAllUsers from "../../../hooks/useGetAllUsers";

const AssignCourseForm = lazy(() => import("../../../components/Admin/AssignCourseForm"));
const CourseDetails = lazy(() => import("../../../components/Admin/CourseDetails"));

const AssignCourse = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [selectedUser, setSelectedUser] = useState({});
  const { courses, isLoading, error } = useGetAllCourses();
  const { users } = useGetAllUsers();
  const [showUserResults, setShowUserResults] = useState(false);
  const [showCourseResults, setShowCourseResults] = useState(false);
  const [focused, setFocused] = useState({});
  const [isUserFound, setIsUserFound] = useState(false);
  const [isCourseFound, setIsCourseFound] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [assignedCourse, setAssignedCourse] = useState({
    instructor: { username: "" },
  });
  const [isAssignedCourseLoading, setIsAssignedCourseLoading] = useState({
    instructor: { username: "" },
  });

  const handleAssignedUser = (e) => {
    setShowUserResults(true);
    setIsUserFound(false);
    setIsCourseFound(false);
    setFilteredUsers(
      users.filter((f) =>
        f.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setAssignedCourse({
      ...assignedCourse,
      assignedUser: { username: e.target.value },
    });
  };

  const handleCourseName = (e) => {
    setShowCourseResults(true);
    setIsCourseFound(false);
    setAssignedCourse({
      ...assignedCourse,
      course_name: e.target.value,
    });

    if (e.target.value.length > 0) {
      setFilteredCourses(
        courses.filter((f) => {
          if (
            !f.students.some((s) => {
              return s._id.toString() === selectedUser._id.toString();
            }) &&
            (f.course_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
              f.instructor.username
                .toLowerCase()
                .includes(e.target.value.toLowerCase()))
          ) {
            return f;
          } else {
            return "";
          }
        })
      );
    } else {
      setFilteredCourses(
        courses.filter((f) => {
          if (
            !f.students.some((s) => {
              return s._id.toString() === selectedUser._id.toString();
            })
          ) {
            return f;
          } else {
            return "";
          }
        })
      );
    }
  };

  const handleSelectedUser = (user) => {
    setShowUserResults(false);
    if (user.username !== assignedCourse.assignedUser) {
      setSelectedUser(user);
      setShowCourseResults(false);
      setIsCourseFound(false);
      setIsUserFound(true);
      setAssignedCourse({ assignedUser: user });
      document.getElementById("assigned-user").value = user.username;
      if (filteredCourses.length) {
        document.getElementById("assigned-course-name").value = "";
      }
      setFilteredCourses(
        courses.filter((f) => {
          if (
            !f.students.some((s) => {
              return s._id.toString() === user._id.toString();
            })
          ) {
            return f;
          } else {
            return "";
          }
        })
      );
    }
  };

  const handleSelectedCourse = (course) => {
    setIsAssignedCourseLoading(true);
    setIsCourseFound(true);
    setShowCourseResults(false);
    selectCourse({
      ...props,
      assignedCourse,
      setAssignedCourse,
      setIsAssignedCourseLoading,
      course,
    });

    document.getElementById(
      "assigned-course-name"
    ).value = `Name: ${course.course_name}, Instructor: ${course.instructor.username}`;
  };

  useEffect(() => {
    if (focused && focused !== "assigned-course-name") {
      setShowCourseResults(false);
    } else if (focused && focused !== "assigned-user") {
      setShowUserResults(false);
    }
  }, [focused]);

  if (isLoading) return <div>is Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentUser) return <h1>Loading User...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  return (
    <Layout>
      <div id="assign-course" className="w-1/2 mx-auto">
        <Suspense fallback={<div>Loading form...</div>}>
          <AssignCourseForm
            users={users}
            courses={courses}
            handleAssignedUser={handleAssignedUser}
            handleCourseName={handleCourseName}
            handleSelectedUser={handleSelectedUser}
            handleSelectedCourse={handleSelectedCourse}
            setShowUserResults={setShowUserResults}
            setFocused={setFocused}
            setFilteredUsers={setFilteredUsers}
            filteredUsers={filteredUsers}
            showUserResults={showUserResults}
            isUserFound={isUserFound}
            isCourseFound={isCourseFound}
            setShowCourseResults={setShowCourseResults}
            filteredCourses={filteredCourses}
            showCourseResults={showCourseResults}
          />
        </Suspense>

        {isCourseFound && (
          <Suspense fallback={<div>Loading course details...</div>}>
            <CourseDetails
              assignedCourse={assignedCourse}
              isAssignedCourseLoading={isAssignedCourseLoading}
              setAssignedCourse={setAssignedCourse}
              setIsCourseFound={setIsCourseFound}
              assignCourse={assignCourse}
              isUserFound={isUserFound}
              selectedUser={selectedUser}
              currentUser={currentUser}
              setIsUserFound={setIsUserFound}
            />
          </Suspense>
        )}
      </div>
    </Layout>
  );
};

export default AssignCourse;
