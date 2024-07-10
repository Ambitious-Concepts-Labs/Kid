import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import { searchCourse } from "../../../utils/courseFunctions";
import imgPlaceholder from "../image-placeholder.png";
import "./TeacherCourses.css";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const UserCourses = (props) => {
  // const history = useHistory();
  const { currentUser } = props;
  const [searchedItems, setSearchedItems] = useState();
  const [coursesSlice, setCoursesSlice] = useState([0, 3]);
  const { courses, error, isLoading } = useGetAllCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentUser) return <h1>Loading...</h1>;
  return (
    <Layout>
      <div id="teacher-courses" style={{ textAlign: "center" }}>
        {currentUser.courses.length > 0 ? (
          <div className="col">
            <div>
              <SearchBar
                currentUser={currentUser}
                setSearchedItems={setSearchedItems}
                search={searchCourse}
                items={currentUser.courses}
                setItemsSlice={setCoursesSlice}
                placeholder="search a course name"
              />
            </div>
            <h2>Your Courses</h2>
            {currentUser.courses.length > 0 ? (
              <>
                <ul
                  className="courses-list"
                  style={{ margin: "auto", width: "60%" }}
                >
                  {courses
                    .slice(coursesSlice[0], coursesSlice[1])
                    .map((course) => {
                      return (
                        <li
                          key={course._id}
                          style={{ marginTop: "2%", cursor: "pointer" }}
                          onClick={() => {
                            // history.push(`/course/${course._id}`);
                          }}
                        >
                          <img loading="lazy" src={imgPlaceholder} alt="img" />
                          <div className="info">
                            <h2 className="title">{course.course_name}</h2>
                            <p className="desc">Subject: {course.subject}</p>
                            <p className="desc">
                              Grade Level: {course.grade_level}
                            </p>
                            <p className="desc">
                              Number of Students: {course.num_of_students || 0}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
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
                  {coursesSlice[1] <= currentUser.courses.length - 1 &&
                    currentUser.courses.length > 3 && (
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
              </>
            ) : (
              <div>
                <h2>No course found.</h2>
              </div>
            )}
          </div>
        ) : (
          <h3>You have no courses.</h3>
        )}
      </div>
    </Layout>
  );
};

export default UserCourses;
