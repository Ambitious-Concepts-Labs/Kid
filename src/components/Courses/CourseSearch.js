import React from "react";

export default function CourseSearch({
  courses,
  filteredCourses,
  handleCourseName,
  handleSelectedCourse,
  setShowCourseResults,
  setFocused,
  isStudentFound,
  isCourseFound,
  showCourseResults,
}) {
  return (
    <div className={`form-group mb-4 ${isStudentFound ? "block" : "hidden"}`}>
      <label
        htmlFor="assigned-course-name"
        className="block text-sm font-medium text-gray-700"
      >
        Course
      </label>
      {!isCourseFound ? (
        <input
          type="text"
          className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="assigned-course-name"
          onClick={(e) => {
            setShowCourseResults(true);
            setFocused(e.target.id);
          }}
          onChange={(e) => {
            handleCourseName(e);
          }}
        />
      ) : (
        <input
          type="text"
          className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="assigned-course-name"
          disabled
        />
      )}

      {showCourseResults && (
        <div id="results-container" className="mt-2 space-y-2">
          {courses.map((course) => (
            <button
              key={course.id}
              type="button"
              className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => {
                handleSelectedCourse(course);
              }}
            >
              Name: {course.courseName}
            </button>
          ))}
          {filteredCourses.slice(0, 10).map((course) => (
            <button
              key={course.id}
              type="button"
              className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => {
                handleSelectedCourse(course);
              }}
            >
              {course.course_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
