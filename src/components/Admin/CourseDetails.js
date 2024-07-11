import React from "react";

const imgPlaceholder =
  "https://d10grw5om5v513.cloudfront.net/assets/images/image-placeholder.png";

export default function CourseDetails({
  assignedCourse,
  setAssignedCourse,
  setIsCourseFound,
  assignCourse,
  isUserFound,
  selectedUser,
  currentUser,
  setIsUserFound,
}) {
  return (
    <div className="flex justify-center mt-4 w-full">
      <div className="card p-4 bg-white shadow-md rounded-lg w-full">
        <div className="about-product text-center mt-2">
          <img
            src={imgPlaceholder}
            width="100"
            alt="Course"
            className="mx-auto"
          />
          <div className="mt-2">
            <h4 className="text-lg font-semibold">
              Course Name: {assignedCourse.course_name}
            </h4>
            <h6 className="mt-1 text-gray-600">
              by: {assignedCourse.instructor.username}
            </h6>
          </div>
        </div>
        <div className="stats mt-4">
          <div className="flex justify-between p-2">
            <span className="text-gray-700">Class Number</span>
            <span className="text-gray-900">{assignedCourse.class_number}</span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-gray-700">Subject</span>
            <span className="text-gray-900">{assignedCourse.subject}</span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-gray-700">Grade Level</span>
            <span className="text-gray-900">{assignedCourse.grade_level}</span>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-gray-700">Number of Students Enrolled</span>
            <span className="text-gray-900">
              {assignedCourse.num_of_students}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="btn btn-danger w-36 mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => {
              setAssignedCourse({
                assignedUser: selectedUser,
              });
              setIsCourseFound(false);
              document.getElementById("assigned-course-name").value = "";
            }}
          >
            Change Course
          </button>

          <button
            type="button"
            className="btn btn-primary w-36 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              assignCourse({
                isUserFound,
                currentUser,
                assignedCourse,
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
  );
}
