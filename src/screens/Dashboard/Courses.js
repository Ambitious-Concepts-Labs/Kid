import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchCourse } from "../../utils/courseFunctions";
import SearchBar from "./SearchBar";
import imgPlaceholder from "./image-placeholder.png";
import "./Courses.css";
import Layout from "../../components/Dashboard/Layout";

const Courses = (props) => {
  const history = useNavigate();
  const { currentUser } = props;
  const [courses, setCourses] = useState([]);
  const [coursesSlice, setCoursesSlice] = useState([0, 3]);
  const [areCoursesLoaded, setAreCoursesLoaded] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    let unmounted = false;
    if (!areCoursesLoaded) {
      if (!unmounted && currentUser) {
        console.log({ currentUser });
        setCourses(currentUser.courses);
        if (currentUser.isStudent) {
          currentUser.courses
            .sort((a, b) => {
              const nameA = a.course_name.toUpperCase();
              const nameB = b.course_name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            .forEach((each) => {
              if (
                !currentUser.courses.some((c) => {
                  return c._id.toString() === each._id.toString();
                })
              ) {
                searchedItems.push(each);
              }
            });
        } else if (!currentUser.isStudent && currentUser.courses) {
          setSearchedItems(
            currentUser.courses.sort((a, b) => {
              const nameA = a.course_name.toUpperCase();
              const nameB = b.course_name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
          );
        }

        setAreCoursesLoaded(true);
      }
    }
    unmounted = true;
  }, [areCoursesLoaded, currentUser, searchedItems]);
  useEffect(() => {
    setAreCoursesLoaded(true);
  }, []);

  console.log(areCoursesLoaded, { currentUser }, { searchedItems });

  if (currentUser) {
    return (
      <Layout>
        <div id="courses" style={{ textAlign: "center" }}>
          <>
            <div className="col">
              <div>
                <SearchBar
                  currentUser={currentUser}
                  setSearchedItems={setSearchedItems}
                  search={searchCourse}
                  items={courses}
                  setItemsSlice={setCoursesSlice}
                  placeholder="search a course name"
                />
              </div>
              {currentUser.courses && (
                <>
                  <ul
                    className="courses-list"
                    style={{ margin: "auto", width: "60%" }}
                  >
                    {currentUser.courses.map((course) => {
                      return (
                        <li
                          key={course._id}
                          style={{ marginTop: "2%", cursor: "pointer" }}
                          onClick={() => {
                            history(`/dashboard/course/${course._id}`);
                          }}
                        >
                          <img src={imgPlaceholder} alt="img" />
                          <div className="info">
                            <h2 className="title">{course.course_name}</h2>
                            <p className="desc">Subject: {course.subject}</p>
                            <p className="desc">
                              Grade Level: {course.grade_level}
                            </p>
                            <p className="desc">
                              Number of Students: {course.num_of_students || 0}
                            </p>
                            <p className="desc">
                              Instructor:{" "}
                              {course.instructor.username ||
                                "No instructor name"}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {searchedItems.length > 1 && (
                    <div className="div" style={{ textAlign: "center" }}>
                      {coursesSlice[0] !== 0 && (
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            setCoursesSlice([
                              coursesSlice[0] - 3,
                              coursesSlice[1] - 3,
                            ])
                          }
                        >
                          Prev
                        </button>
                      )}
                      {coursesSlice[1] <= searchedItems.length - 1 &&
                        searchedItems.length > 3 && (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              setCoursesSlice([
                                coursesSlice[0] + 3,
                                coursesSlice[1] + 3,
                              ])
                            }
                          >
                            Next
                          </button>
                        )}
                    </div>
                  )}
                </>
              )}
              {searchedItems.length > 0 ? (
                <>
                  <ul
                    className="courses-list"
                    style={{ margin: "auto", width: "60%" }}
                  >
                    {searchedItems
                      .slice(coursesSlice[0], coursesSlice[1])
                      .map((course) => {
                        return (
                          <li
                            key={course._id}
                            style={{ marginTop: "2%", cursor: "pointer" }}
                            onClick={() => {
                              history(`/course/${course._id}`);
                            }}
                          >
                            <img src={imgPlaceholder} alt="img" />
                            <div className="info">
                              <h2 className="title">{course.course_name}</h2>
                              <p className="desc">Subject: {course.subject}</p>
                              <p className="desc">
                                Grade Level: {course.grade_level}
                              </p>
                              <p className="desc">
                                Number of Students:{" "}
                                {course.num_of_students || 0}
                              </p>
                              <p className="desc">
                                Instructor: {course.instructor.username}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  {searchedItems.length > 1 && (
                    <div className="div" style={{ textAlign: "center" }}>
                      {coursesSlice[0] !== 0 && (
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            setCoursesSlice([
                              coursesSlice[0] - 3,
                              coursesSlice[1] - 3,
                            ])
                          }
                        >
                          Prev
                        </button>
                      )}
                      {coursesSlice[1] <= searchedItems.length - 1 &&
                        searchedItems.length > 3 && (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              setCoursesSlice([
                                coursesSlice[0] + 3,
                                coursesSlice[1] + 3,
                              ])
                            }
                          >
                            Next
                          </button>
                        )}
                    </div>
                  )}
                </>
              ) : (
                <div>
                  {currentUser.courses.length !== 0 ? (
                    <h2>You have purchased all the courses.</h2>
                  ) : (
                    <h2>No course found</h2>
                  )}
                </div>
              )}
            </div>
          </>
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

export default Courses;
