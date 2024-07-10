import React from "react";
import imgPlaceholder from "./image-placeholder.png";
import { updateFireStoreDoc } from "../../lib/firebase";

const EditCourse = (props) => {
	const {
		currentUser,
		setCheckUser,
		course,
		updateCourse,
		updatedCourse,
		setUpdatedCourse,
		setEdit,
		setLoading,
		user
	} = props;

	const handleUpdate = (properties) => {
		const { e, key } = properties;

		setUpdatedCourse(async () => {
			if (key !== "instructor") {
				course[key] = e.target.value;
				await updateFireStoreDoc("users", user.uid, { course: [...course] });
				if (e.target.value.length) {
					return {
						...updatedCourse,
						[key]: e.target.value,
					};
				} else {
					return {
						...updatedCourse,
						[key]: course[key],
					};
				}
			} else {
				if (e.target.value.length) {
					return {
						...updatedCourse,
						[key]: {
							...updatedCourse[key],
							username: e.target.value,
						},
					};
				} else {
					return {
						...updatedCourse,
						[key]: course[key],
					};
				}
			}
		});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12">
					<div className="tile">
						<div className="wrapper">
							<div className="header">
								<strong>COURSE NAME</strong>
								<br />
								<input
									type="text"
									placeholder={course.course_name}
									onChange={(e) => {
										handleUpdate({ e, key: "course_name" });
									}}
								/>
							</div>
							<div className="banner-img">
								<img loading="lazy" src={imgPlaceholder} alt="img-placeholder" />
							</div>
							<div className="author">
								<div>
									<strong>CLASS NUMBER</strong>
									<input
										type="text"
										placeholder={course.class_number}
										onChange={(e) => {
											handleUpdate({ e, key: "class_number" });
										}}
									/>
								</div>

								{/* {currentUser.isAdmin ? (
									<div className="ends">
										<strong>INSTRUCTOR</strong>
										<input
											type="text"
											placeholder={course.instructor.username}
											onChange={(e) => {
												handleUpdate({ e, key: "instructor" });
											}}
										/>
									</div>
								) : (
									<div className="ends">
										<strong>INSTRUCTOR</strong>
										{course.instructor.username}
									</div>
								)} */}
							</div>
							<div className="stats">
								<div>
									<strong>SUBJECT</strong>
									<input
										type="text"
										placeholder={course.subject}
										onChange={(e) => {
											handleUpdate({ e, key: "subject" });
										}}
									/>
								</div>
								<div>
									<strong>GRADE LEVEL</strong>
									<input
										type="text"
										placeholder={course.grade_level}
										onChange={(e) => {
											handleUpdate({ e, key: "grade_level" });
										}}
									/>
								</div>
								{currentUser.isAdmin ? (
									<div className="end">
										<strong>STUDENTS ENROLLED</strong>
										<input
											type="text"
											placeholder={course.num_of_students || 0}
											min="0"
											onChange={(e) => {
												handleUpdate({ e, key: "num_of_students" });
											}}
										/>
									</div>
								) : (
									<div>
										<strong>STUDENTS ENROLLED</strong>
										{course.num_of_students || 0}
									</div>
								)}
							</div>
							<div className="footer">
								<button
									className="btn btn-primary"
									onClick={() => {
										if (updatedCourse.num_of_students < 0) {
											window.alert("Number of students cannot be negative");
										} else {
											updateCourse({
												...props,
												setEdit,
												setCheckUser,
												originalCourse: course,
												updatedCourse,
												setUpdatedCourse,
												setLoading,
											});
										}
									}}
								>
									Confirm
								</button>
								<button
									className="btn btn-danger"
									onClick={() => {
										setEdit(false);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCourse;
