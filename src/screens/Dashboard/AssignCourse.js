import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import imgPlaceholder from "./image-placeholder.png";
import { assignCourse, selectCourse } from "../../utils/courseFunctions";
import { db } from "../../firebase";
import "./AssignCourse.css";
import Layout from "../../components/Dashboard/Layout";

const AssignCourse = (props) => {
  const { currentUser } = props;
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
    // let source = Axios.CancelToken.source();
    let unmounted = false;
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
              // setUsers(dataArr.filter((f) => f.isStudent)
              // 			.sort((a, b) => {
              // 				const aName = a.username.toUpperCase();
              // 				const bName = b.username.toUpperCase();
              // 				if (aName < bName) {
              // 					return -1;
              // 				} else if (aName > bName) {
              // 					return 1;
              // 				}
              // 				return 0;
              // 			}))
              setAreUsersLoaded(true);
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
          };
          getUsers();
          // await Axios.get("/user/users", {
          // 	cancelToken: source.token,
          // })
          // 	.then((res) => {
          // 		if (!unmounted) {
          // 			setUsers(
          // 				res.data
          // 					.filter((f) => f.isStudent)
          // 					.sort((a, b) => {
          // 						const aName = a.username.toUpperCase();
          // 						const bName = b.username.toUpperCase();
          // 						if (aName < bName) {
          // 							return -1;
          // 						} else if (aName > bName) {
          // 							return 1;
          // 						}
          // 						return 0;
          // 					})
          // 			);
          // 			setAreUsersLoaded(true);
          // 			setLoading(false);
          // 		}
          // 	})
          // 	.catch((err) => {
          // 		if (!unmounted) {
          // 			if (Axios.isCancel(err)) {
          // 				console.log(`request cancelled:${err.message}`);
          // 			} else {
          // 				console.log("another error happened:" + err.message);
          // 			}
          // 		}
          // 	});
        }
      };
      getData();
    }
    return function() {
      unmounted = true;
      // source.cancel("Cancelling in cleanup");
    };
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

  if (!loading) {
    return (
      <Layout>
        <div id="assign-course" style={{ width: "50%", margin: "auto" }}>
          <div className="form-group">
            <label htmlFor="assigned-user">User</label>
            <input
              type="text"
              style={{ border: "inset" }}
              className="form-control"
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
              <div id="results-container">
                {filteredUsers.slice(0, 10).map((user) => {
                  return (
                    <textarea
                      key={user._id}
                      type="button"
                      className="form-control results"
                      placeholder={user.username}
                      onClick={() => {
                        handleSelectedUser(user);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div
            className="form-group"
            style={isUserFound ? { display: "block" } : { display: "none" }}
          >
            <label htmlFor="assigned-course-name">Course </label>
            {!isCourseFound ? (
              <input
                type="text"
                className="form-control"
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
                style={{ border: "inset" }}
                className="form-control"
                id="assigned-course-name"
                disabled
              />
            )}

            {showCourseResults && (
              <div id="results-container">
                {courses.map((course) => {
                  return (
                    <textarea
                      key={course._id}
                      type="button"
                      className="form-control results"
                      placeholder={`Name: ${course.course_name}`}
                      onClick={() => {
                        handleSelectedCourse(course);
                      }}
                    />
                  );
                })}
                {filteredCourses.slice(0, 10).map((course) => {
                  return (
                    <textarea
                      key={course._id}
                      type="button"
                      className="form-control results"
                      placeholder={`Name: ${course.course_name}, Instructor: ${course.instructor.username}`}
                      onClick={() => {
                        handleSelectedCourse(course);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {isCourseFound &&
            (!isAssignedCourseLoading ? (
              <div
                className="flex justify-content-center mt-1"
                style={{ width: "100%" }}
              >
                <div className="card p-3 bg-white">
                  <div className="about-product text-center mt-1">
                    <img src={imgPlaceholder} width="100" alt="img" />
                    <div>
                      <h4>Course Name: {assignedCourse.course_name}</h4>
                      <h6 className="mt-0 text-black-50">
                        by: {assignedCourse.instructor.username}
                      </h6>
                    </div>
                  </div>
                  <div className="stats mt-2">
                    <div className="d-flex justify-content-between p-price">
                      <span>Class Number</span>
                      <span>{assignedCourse.class_number}</span>
                    </div>
                    <div className="d-flex justify-content-between p-price">
                      <span>Subject</span>
                      <span>{assignedCourse.subject}</span>
                    </div>
                    <div className="d-flex justify-content-between p-price">
                      <span>Grade Level</span>
                      <span>{assignedCourse.grade_level}</span>
                    </div>
                    <div className="d-flex justify-content-between p-price">
                      <span>Number of Students Enrolled</span>
                      <span>{assignedCourse.num_of_students}</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ width: "150px" }}
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
                      className="btn btn-primary ms-2"
                      style={{ width: "150px" }}
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
              <div className="spinner-border-container">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ))}
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="spinner-border-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default AssignCourse;
