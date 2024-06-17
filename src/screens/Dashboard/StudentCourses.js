import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "./image-placeholder.png";
import "./StudentCourses.css";
import Layout from "../../components/Dashboard/Layout";

const StudentCourses = (props) => {
  const history = useNavigate();
  const { currentUser } = props;
  const [coursesSlice, setCoursesSlice] = useState([0, 3]);

  if (!currentUser) return <h1>Loading...</h1>;
  // const sortedCourses = currentUser.courses.sort((a, b) => {
  // 	const aName = a.course_name.toUpperCase();
  // 	const bName = b.course_name.toUpperCase();
  // 	if (aName < bName) {
  // 		return -1;
  // 	} else if (aName > bName) {
  // 		return 1;
  // 	}
  // 	return 0;
  // });

  return (
    <Layout>
      <div id="student-courses" style={{ textAlign: "center" }}>
        {currentUser.courses.length > 1 ? (
          <div className="col">
            <ul
              className="courses-list"
              style={{ margin: "auto", width: "60%" }}
            >
              {currentUser.courses
                // .slice(coursesSlice[0], coursesSlice[1])
                .map((course) => {
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
                        {/* <p className="desc">
												Instructor: {course.instructor.username}
											</p> */}
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
              {/* {sortedCourses
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
										<img src={imgPlaceholder} alt="img" />
										<div className="info">
											<h2 className="title">{course.course_name}</h2>
											<p className="desc">
												Instructor: {course.instructor.username}
											</p>
											<p className="desc">Subject: {course.subject}</p>
											<p className="desc">Grade Level: {course.grade_level}</p>
											<p className="desc">
												Number of Students: {course.num_of_students || 0}
											</p>
										</div>
									</li>
								);
							})} */}
            </ul>
            <div className="div" style={{ textAlign: "center" }}>
              {/* {coursesSlice[0] !== 0 && (
							<button
								className="btn btn-primary"
								onClick={() =>
									setCoursesSlice([coursesSlice[0] - 3, coursesSlice[1] - 3])
								}
							>
								Prev
							</button>
						)}
						{coursesSlice[1] <= sortedCourses.length - 1 &&
							sortedCourses.length > 3 && (
								<button
									className="btn btn-primary"
									onClick={() =>
										setCoursesSlice([coursesSlice[0] + 3, coursesSlice[1] + 3])
									}
								>
									Next
								</button>
							)} */}
            </div>
          </div>
        ) : (
          <h3>You have no courses enrolled</h3>
        )}
      </div>
    </Layout>
  );
};

export default StudentCourses;
