import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { approve, deny } from "../../../utils/courseFunctions";
// import Axios from "axios";
import "./PendingCourse.css";

const User = (props) => {
	const { currentUser } = props;
	const history = useNavigate();
	const { userid, courseid } = useParams();
	const [pendingCourse, setPendingCourse] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// let source = Axios.CancelToken.source();
		let unmounted = false;
		if (currentUser.isAdmin && loading) {
			setPendingCourse(currentUser.pendingCourses.find(
				(course) => course._id.toString() === courseid.toString()
			));
			setLoading(false);

			// Axios.get(
			// 	`/admin/user/${userid}/pendingcourse/${courseid}`,
			// 	{ params: { userid: userid, courseid: courseid } },
			// 	{ cancelToken: source.token }
			// )
			// 	.then((res) => {
			// 		if (!unmounted) {
			// 			setPendingCourse(res.data);
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
	}, [loading, currentUser.isAdmin, userid, courseid]);

	if (!loading) {
		return (
			<div id="pending-course">
				<div
					className="card text-center"
					style={{ width: "50%", margin: "auto" }}
				>
					<div className="card-body">
						<h5 className="card-title">User: {currentUser.username}</h5>
						<div className="row card-text">
							<div className="col labels">
								<div>Course Class Number:</div>
								<div>Course Name:</div>
							</div>
							<div className="col info">
								<div>{pendingCourse.class_number}</div>
								<div>{pendingCourse.course_name}</div>
							</div>
						</div>
						<button
							className="btn btn-primary"
							onClick={() => {
								approve({ ...props, pendingCourse, history });
								// approve({ ...props, pendingCourse });
							}}
						>
							Approve
						</button>
						<button
							className="btn btn-danger"
							onClick={() => {
								deny({ ...props, pendingCourse, history });
								// deny({ ...props, pendingCourse });
							}}
						>
							Deny
						</button>
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

export default User;
