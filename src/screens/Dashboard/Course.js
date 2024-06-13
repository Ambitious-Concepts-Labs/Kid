// Imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateCourse,
  deleteCourse,
  requestCourse,
} from "../../utils/courseFunctions";
import EditCourse from "./EditCourse";
import imgPlaceholder from "./image-placeholder.png";
// import Axios from "axios";
import "./Course.css";
//End

const Course = (props) => {
	const { id } = useParams();
	const history = useNavigate();
	const { currentUser, isLoggedin, setCheckUser } = props;
	const [course, setCourse] = useState({});
	const [loading, setLoading] = useState(true);
	const [isCourseLoaded, setIsCourseLoaded] = useState(false);
	const [edit, setEdit] = useState(false);
	const [updatedCourse, setUpdatedCourse] = useState({});

	useEffect(() => {
		// let source = Axios.CancelToken.source();
		let unmounted = false;
		if (!unmounted) {
			if (loading && !isCourseLoaded) {
				console.log(currentUser)
				if (currentUser.courses) {
					let currentCourse = currentUser.courses.map((course) => {
						if (course._id === id) return course 
					})
					setCourse(currentCourse);
					setUpdatedCourse(currentCourse);
					setIsCourseLoaded(true);
					setLoading(false);
				}
				// Axios.get(
				// 	`/course/${id}`,
				// 	{ params: id },
				// 	{ cancelToken: source.token }
				// )
				// 	.then((res) => {
				// 		if (!unmounted) {
				// 			if (res.data.msg === "Course retrieved") {
				// 				setCourse(res.data.course);
				// 				setUpdatedCourse(res.data.course);
				// 				setIsCourseLoaded(true);
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
		return function () {
			unmounted = true;
			// source.cancel("Cancelling in cleanup");
		};
	}, [loading, isCourseLoaded, id, history]);

	let isInTransactions = false;
	let isForPayment = false;
	let isCourseDenied = false;

	if (isLoggedin && currentUser.transactions.length) {
		isInTransactions = currentUser.transactions.some((trans) => {
			if (
				trans.cart.items.some((s) => {
					return s._id === course._id;
				})
			) {
				return true;
			} else {
				return undefined;
			}
		});
	}
	if (isLoggedin && currentUser.transactions.length) {
		isForPayment = currentUser.transactions.some((trans) => {
			if (
				trans.status === "for payment" &&
				trans.cart.items.some((s) => {
					return s._id === course._id;
				})
			) {
				return true;
			} else {
				return undefined;
			}
		});
	}

	if (isLoggedin && currentUser.transactions.length) {
		isCourseDenied = currentUser.transactions.some((trans) => {
			if (
				trans.status === "cancelled" &&
				trans.cart.items.some((s) => {
					return s._id === course._id;
				})
			) {
				return true;
			} else {
				return undefined;
			}
		});
	}
	const isPending = (p) => {
		if (
			currentUser.pendingCourses.some((c) => {
				return c._id === p._id;
			})
		)
			return true;
	};

	const isOwned = (o) => {
		if (
			currentUser.courses.some((c) => {
				return c._id === o._id;
			})
		)
			return true;
	};

	console.log(course)

	if (!loading) {
		return (
			<div id="course" style={{ margin: "auto" }}>
				{!edit ? (
					<div className="container-fluid">
						<div className="row">
							<div className="col-12">
								<div className="tile">
									<div className="wrapper">
										<div className="header">{course[0].course_name}</div>

										<div className="banner-img">
											<img src={imgPlaceholder} alt="img-placeholder" />
										</div>

										<div className="author">
											<div className="start">
												<strong>CLASS NUMBER</strong>
												{course[0].class_number}
											</div>
											{/* <div className="ends">
												<strong>INSTRUCTOR</strong>
												{course.instructor.username}
											</div> */}
										</div>

										<div className="stats">
											<div>
												<strong>SUBJECT</strong> {course[0].subject}
											</div>
											<div>
												<strong>GRADE LEVEL</strong> {course[0].grade_level}
											</div>

											<div>
												<strong>STUDENTS ENROLLED</strong>
												{course[0].num_of_students || 0}
											</div>
										</div>

										<div className="footer">
											{!currentUser.isStudent ? (
												(currentUser.isAdmin ||
													currentUser._id === course.instructor._id) && (
													<>
														<button
															className="btn btn-primary"
															onClick={() => {
																setEdit(true);
															}}
														>
															Update
														</button>

														<button
															className="btn btn-info"
															onClick={() => {
																history(`/course/${id}/students`);
															}}
														>
															Students
														</button>

														<button
															className="btn btn-danger"
															onClick={() => {
																deleteCourse({ ...props, course, history });
															}}
														>
															Delete
														</button>
													</>
												)
											) : isPending(course) ? (
												<button className="btn btn-warning" disabled>
													Pending
												</button>
											) : isInTransactions ? (
												isCourseDenied ? (
													<button
														className="btn btn-primary"
														onClick={() => {
															requestCourse({
																...props,
																course: course[0],
																setLoading,
																history,
															});
														}}
													>
														Request
													</button>
												) : isForPayment ? (
													<button className="btn btn-secondary" disabled>
														For Payment
													</button>
												) : isOwned(course) ? (
													<button className="btn btn-success" disabled>
														Owned
													</button>
												) : (
													<button className="btn btn-warning" disabled>
														Pending
													</button>
												)
											) : (
												<button
													className="btn btn-primary"
													onClick={() => {
														requestCourse({
															...props,
															course,
															setLoading,
															history,
														});
													}}
												>
													Request
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<EditCourse
						course={course}
						currentUser={currentUser}
						setCheckUser={setCheckUser}
						updateCourse={updateCourse}
						updatedCourse={updatedCourse}
						setUpdatedCourse={setUpdatedCourse}
						setEdit={setEdit}
						setLoading={setLoading}
					/>
				)}
			</div>
		);
	} else {
		return (
			<div className="spinner-border-container">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...All</span>
				</div>
			</div>
		);
	}
};

export default Course;
