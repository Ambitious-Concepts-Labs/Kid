//Imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchCourse } from "../../utils/courseFunctions";
import SearchBar from "./SearchBar";
// import Axios from "axios";
// End

const PendingCourses = (props) => {
	const { currentUser } = props;
	const [searchedItems, setSearchedItems] = useState([]);
	const [pendingCourses, setPendingCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [coursesSlice, setCoursesSlice] = useState([0, 10]);

	useEffect(() => {
		// let source = Axios.CancelToken.source();
		let unmounted = false;
		if (currentUser.isAdmin && loading) {
			if (!unmounted) {
				if (currentUser.pendingCourses.length) {
					const sortedPendingCourses = currentUser.pendingCourses.sort(
						(a, b) => {
							const userA = a.user.username.toUpperCase();
							const userB = b.user.username.toUpperCase();
							if (userA < userB) {
								return -1;
							} else if (userA > userB) {
								return 1;
							}
							return 0;
						}
					);
					setPendingCourses(sortedPendingCourses);
					setSearchedItems(sortedPendingCourses);
				}
				setLoading(false);
			}
			// Axios.get("/admin/pendingcourses", { cancelToken: source.token })
			// 	.then((res) => {
			// 		if (!unmounted) {
			// 			if (res.data.pendingCourses.length) {
			// 				const sortedPendingCourses = res.data.pendingCourses.sort(
			// 					(a, b) => {
			// 						const userA = a.user.username.toUpperCase();
			// 						const userB = b.user.username.toUpperCase();
			// 						if (userA < userB) {
			// 							return -1;
			// 						} else if (userA > userB) {
			// 							return 1;
			// 						}
			// 						return 0;
			// 					}
			// 				);
			// 				setPendingCourses(sortedPendingCourses);
			// 				setSearchedItems(sortedPendingCourses);
			// 			}
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
		return function () {
			unmounted = true;
			// source.cancel("Cancelling in cleanup");
		};
	}, [loading, currentUser.isAdmin]);

	console.log({pendingCourses}, {searchedItems})

	if (!loading) {
		return (
			<div className="container" id="pending-items">
				<div className="row">
					<div className="col-xs-10">
						<div className="panel panel-primary">
							{pendingCourses.length > 0 ? (
								<>
									<div className="panel-heading">
										<h2 className="panel-title">Pending Courses</h2>
									</div>
									<div>
										<SearchBar
											setSearchedItems={setSearchedItems}
											search={searchCourse}
											items={pendingCourses}
											currentUser={currentUser}
											setItemsSlice={setCoursesSlice}
											placeholder="search course name"
										/>
									</div>
									<ul className="list-group">
										<li className="list-group-item">
											<table className="table table-hover">
												<thead>
													<tr>
														<th>Username</th>
														<th>Class Number</th>
														<th>Course Name</th>
														<th>Course Instructor</th>
														<th>Course Type</th>
														<th>Course Subject</th>
														<th>Grade Level</th>
														<th>Number of Students</th>
														<th>
															<button style={{ visibility: "hidden" }}>
																xxxx
															</button>
														</th>
													</tr>
												</thead>

												{searchedItems
													// .slice(coursesSlice[0], coursesSlice[1])
													.map((course, index) => {
														return (
															<tbody
																style={{ verticalAlign: "middle" }}
																key={`${course.class_number}${index}`}
															>
																<tr>
																	<td>{currentUser.username}</td>
																	<td>{course.class_number}</td>
																	<td>{course.course_name}</td>
																	<td>{course.instructor || "No Instructor"}</td>
																	<td>{course.type.toUpperCase()}</td>
																	<td>{course.subject}</td>
																	<td>{course.grade_level}</td>
																	<td>{course.num_of_students}</td>
																	<td>
																		<Link
																			className="btn btn-primary"
																			to={`/admin/user/${currentUser.username}/pendingcourse/${course._id}`}
																		>
																			View
																		</Link>
																	</td>
																</tr>
															</tbody>
														);
													})}
											</table>
											{!searchedItems.length && (
												<h2 style={{ textAlign: "center", width: "100%" }}>
													No transactions found with searched user
												</h2>
											)}
										</li>
									</ul>
									{searchedItems.length > 3 && (
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
								<h2>There are no pending courses</h2>
							)}
						</div>
					</div>
				</div>
			</div>
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

export default PendingCourses;
