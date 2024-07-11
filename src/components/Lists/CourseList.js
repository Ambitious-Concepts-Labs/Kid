import React from "react";

const imgPlaceholder = "https://d10grw5om5v513.cloudfront.net/assets/images/image-placeholder.png";

const CourseList = ({
  courses,
  coursesSlice,
  setCoursesSlice,
  currentUser,
}) => {
  return (
    <>
      <ul className="courses-list" style={{ margin: "auto", width: "60%" }}>
        {courses.slice(coursesSlice[0], coursesSlice[1]).map((course) => (
          <li key={course._id} style={{ marginTop: "2%", cursor: "pointer" }}>
            <img loading="lazy" src={imgPlaceholder} alt="img" />
            <div className="info">
              <h2 className="title">{course.course_name}</h2>
              <p className="desc">Subject: {course.subject}</p>
              <p className="desc">Grade Level: {course.grade_level}</p>
              <p className="desc">
                Number of Students: {course.num_of_students || 0}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="div" style={{ textAlign: "center" }}>
        {coursesSlice[0] !== 0 && (
          <button
            className="btn btn-primary"
            onClick={() =>
              setCoursesSlice([coursesSlice[0] - 3, coursesSlice[1] - 3])
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
                setCoursesSlice([coursesSlice[0] + 3, coursesSlice[1] + 3])
              }
            >
              Next
            </button>
          )}
      </div>
    </>
  );
};

export default CourseList;
