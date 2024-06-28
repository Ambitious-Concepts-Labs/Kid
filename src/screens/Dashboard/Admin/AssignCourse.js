import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import imgPlaceholder from "../image-placeholder.png";
import { assignCourse, selectCourse } from "../../../utils/courseFunctions";
import { db } from "../../../lib/firebase";
import Layout from "../../../components/Dashboard/Layout";
import { useNavigate } from "react-router-dom";

const AssignCourse = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [areUsersLoaded, setAreUsersLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [courses, setCourses] = useState([]);
  const [areCoursesLoaded, setAreCoursesLoaded] = useState(false);
  const [showUserResults, setShowUserResults] = useState(false);
  const [showCourseResults, setShowCourseResults] = useState(false);
  const [focused, setFocused] = useState({});
  const [loading, setLoading] = useState(true);
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
    if (loading) {
      const getData = async () => {
        if (!areCoursesLoaded) {
          const getAllCourses = async () => {
            const dataArr = [];
            const querySnapshot = await getDocs(collection(db, "courses"));
            querySnapshot.forEach((course) => {
              const obj = { ...course.data(), courseId: course.id };
              dataArr.push(obj);
            });
            setCourses(dataArr);
            setAreCoursesLoaded(true);

            console.log(dataArr);
          };

          getAllCourses();
        }

        if (!areUsersLoaded) {
          const getUsers = async () => {
            const dataArr = [];
            try {
              const querySnapshot = await getDocs(collection(db, "users"));
              querySnapshot.forEach((doc) => {
                const obj = { ...doc.data(), documentId: doc.id };
                dataArr.push(obj);
                console.log(doc.id, " => ", doc.data());
              });
              setUsers(dataArr);
              setAreUsersLoaded(true);
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
          };
          getUsers();
        }
      };
      getData();
    }
  }, [loading, areCoursesLoaded, areUsersLoaded]);

  useEffect(() => {
    if (focused && focused !== "assigned-course-name") {
      setShowCourseResults(false);
    } else if (focused && focused !== "assigned-user") {
      setShowUserResults(false);
    }
  }, [focused]);

  console.log({
    courses,
    users,
    showUserResults,
    isCourseFound,
    isAssignedCourseLoading,
  });

  if (!currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");
  if (!loading) {
    return (
      <Layout>
        <div id="assign-course" className="w-1/2 mx-auto">
          <div className="form-group mb-4">
            <label
              htmlFor="assigned-user"
              className="block text-sm font-medium text-gray-700"
            >
              User
            </label>
            <input
              type="text"
              className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="assigned-user"
              onClick={(e) => {
                setShowUserResults(true);
                setFocused(e.target.id);
                if (!e.target.value.length) {
                  setFilteredUsers(users);
                }
              }}
              onChange={(e) => {
                handleAssignedUser(e);
              }}
            />
            {showUserResults && (
              <div id="results-container" className="mt-2 space-y-2">
                {filteredUsers.slice(0, 10).map((user) => {
                  return (
                    <button
                      key={user._id}
                      type="button"
                      className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onClick={() => {
                        handleSelectedUser(user);
                      }}
                    >
                      {user.username}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div
            className={`form-group mb-4 ${isUserFound ? "block" : "hidden"}`}
          >
            <label
              htmlFor="assigned-course-name"
              className="block text-sm font-medium text-gray-700"
            >
              Course
            </label>
            {!isCourseFound ? (
              <input
                type="text"
                className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="assigned-course-name"
                onClick={(e) => {
                  setShowCourseResults(true);
                  setFocused(e.target.id);
                }}
                onChange={(e) => {
                  handleCourseName(e);
                }}
              />
            ) : (
              <input
                type="text"
                className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="assigned-course-name"
                disabled
              />
            )}

            {showCourseResults && (
              <div id="results-container" className="mt-2 space-y-2">
                {courses.map((course) => {
                  return (
                    <button
                      key={course._id}
                      type="button"
                      className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onClick={() => {
                        handleSelectedCourse(course);
                      }}
                    >
                      {`Name: ${course.courseName}`}
                    </button>
                  );
                })}
                {filteredCourses.slice(0, 10).map((course) => {
                  return (
                    <button
                      key={course._id}
                      type="button"
                      className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onClick={() => {
                        handleSelectedCourse(course);
                      }}
                    >
                      {`Name: ${course.course_name}, Instructor: ${course.instructor.username}`}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {isCourseFound &&
            (!isAssignedCourseLoading ? (
              <div className="flex justify-center mt-4 w-full">
                <div className="card p-4 bg-white shadow-md rounded-lg w-full">
                  <div className="about-product text-center mt-2">
                    <img
                      src={imgPlaceholder}
                      width="100"
                      alt="Course"
                      className="mx-auto"
                    />
                    <div className="mt-2">
                      <h4 className="text-lg font-semibold">
                        Course Name: {assignedCourse.course_name}
                      </h4>
                      <h6 className="mt-1 text-gray-600">
                        by: {assignedCourse.instructor.username}
                      </h6>
                    </div>
                  </div>
                  <div className="stats mt-4">
                    <div className="flex justify-between p-2">
                      <span className="text-gray-700">Class Number</span>
                      <span className="text-gray-900">
                        {assignedCourse.class_number}
                      </span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span className="text-gray-700">Subject</span>
                      <span className="text-gray-900">
                        {assignedCourse.subject}
                      </span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span className="text-gray-700">Grade Level</span>
                      <span className="text-gray-900">
                        {assignedCourse.grade_level}
                      </span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span className="text-gray-700">
                        Number of Students Enrolled
                      </span>
                      <span className="text-gray-900">
                        {assignedCourse.num_of_students}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      className="btn btn-danger w-36 mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => {
                        setAssignedCourse({
                          assignedUser: selectedUser,
                        });
                        setIsCourseFound(false);
                        document.getElementById("assigned-course-name").value =
                          "";
                      }}
                    >
                      Change Course
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary w-36 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        assignCourse({
                          isUserFound,
                          currentUser,
                          assignedCourse,
                          setAreUsersLoaded,
                          setAreCoursesLoaded,
                          setLoading,
                          setIsUserFound,
                          setIsCourseFound,
                        });
                      }}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <div className="spinner-border text-indigo-600" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ))}
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

export default AssignCourse;
