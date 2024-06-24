import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { searchStudent } from "../../../utils/courseFunctions";
import SearchBar from "../SearchBar";
import Layout from "../../../components/Dashboard/Layout";

const ViewStudents = (props) => {
  const { currentUser } = props;
  const { id } = useParams();
  const history = useNavigate();
  const [searchedItems, setSearchedItems] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsSlice, setCourseSlice] = useState([
    (currentPage - 1) * 10,
    currentPage * 10,
  ]);

  useEffect(() => {
    setCourseSlice([(currentPage - 1) * 10, currentPage * 10]);
  }, [currentPage]);

  useEffect(() => {
    // let source = Axios.CancelToken.source();
    let unmounted = false;
    if (!unmounted && currentUser) {
      if (loading) {
        let currentCourse = currentUser.courses.map((course) => {
          if (course._id == id) return course;
        });
        setCourse(currentCourse);

        if (currentCourse.students) {
          const sortedStudents = currentCourse.students.sort((a, b) => {
            const userA = a.username.toUpperCase();
            const userB = b.username.toUpperCase();
            if (userA < userB) {
              return -1;
            } else if (userA > userB) {
              return 1;
            }
            return 0;
          });
          setSearchedItems(sortedStudents);
        }
        setLoading(false);
        // Axios.get(
        // 	`/course/${id}`,
        // 	{ params: id },
        // 	{ cancelToken: source.token }
        // )
        // 	.then((res) => {
        // 		if (!unmounted) {
        // 			if (res.data.msg === "Course retrieved") {
        // 				const sortedStudents = res.data.course.students.sort((a, b) => {
        // 					const userA = a.username.toUpperCase();
        // 					const userB = b.username.toUpperCase();
        // 					if (userA < userB) {
        // 						return -1;
        // 					} else if (userA > userB) {
        // 						return 1;
        // 					}
        // 					return 0;
        // 				});
        // 				setCourse(res.data.course);
        // 				setSearchedItems(sortedStudents);
        // 				setLoading(false);
        // 			} else {
        // 				history("/products");
        // 			}
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
    }
    return function() {
      unmounted = true;
      // source.cancel("Cancelling in cleanup");
    };
  }, [loading, id, history]);

  console.log({ course });

  if (!loading) {
    return (
      <Layout>
        <div className="container" id="pending-items">
          <div className="row">
            <div className="col-xs-10">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h2 className="panel-title">{course.course_name}</h2>
                  <h4 className="panel-title">Students</h4>
                </div>
                <div>
                  <SearchBar
                    setSearchedItems={setSearchedItems}
                    search={searchStudent}
                    items={course.students}
                    setItemsSlice={setCourseSlice}
                    placeholder={"search student username"}
                  />
                </div>
                <ul className="list-group">
                  <li className="list-group-item">
                    <table className="table table-hover">
                      {searchedItems.length > 0 && (
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>
                              <button style={{ visibility: "hidden" }}>
                                xxxx
                              </button>
                            </th>
                          </tr>
                        </thead>
                      )}

                      {/* {searchedItems
											.slice(studentsSlice[0], studentsSlice[1])
											.map((student) => {
												return (
													<tbody
														style={{ verticalAlign: "middle" }}
														key={student._id}
													>
														<tr>
															<td>{student._id}</td>
															<td>{student.username}</td>
															<td>
																<Link
																	className="btn btn-primary"
																	to={`/course/${id}/students/${student.username}`}
																>
																	View
																</Link>
															</td>
														</tr>
													</tbody>
												);
											})} */}
                    </table>
                    {!searchedItems.length && (
                      <h2 style={{ textAlign: "center", width: "100%" }}>
                        No student found
                      </h2>
                    )}
                  </li>
                </ul>
                {searchedItems.length > 10 && (
                  <div className="div" style={{ textAlign: "center" }}>
                    {studentsSlice[0] === 0 ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setCurrentPage(currentPage - 1);
                        }}
                      >
                        Prev
                      </button>
                    )}
                    {studentsSlice[1] < searchedItems.length ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setCurrentPage(currentPage + 1);
                        }}
                      >
                        Next
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default ViewStudents;
