import React from "react";

export default function AssignCourseForm({
  users,
  courses,
  handleAssignedUser,
  handleCourseName,
  handleSelectedUser,
  handleSelectedCourse,
  setShowUserResults,
  setFocused,
  setFilteredUsers,
  filteredUsers,
  showUserResults,
  isUserFound,
  isCourseFound,
  setShowCourseResults,
  filteredCourses,
  showCourseResults,
}) {
  return (
    <>
      <div className="form-group mb-4">
        <label
          htmlFor="assigned-user"
          className="block text-sm font-medium text-gray-700"
        >
          User
        </label>
        <input
          type="text"
          className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="assigned-user"
          onClick={(e) => {
            setShowUserResults(true);
            setFocused(e.target.id);
            if (!e.target.value.length) {
              setFilteredUsers(users);
            }
          }}
          onChange={(e) => {
            handleAssignedUser(e);
          }}
        />
        {showUserResults && (
          <div id="results-container" className="mt-2 space-y-2">
            {filteredUsers.slice(0, 10).map((user) => {
              return (
                <button
                  key={user._id}
                  type="button"
                  className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onClick={() => {
                    handleSelectedUser(user);
                  }}
                >
                  {user.username}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className={`form-group mb-4 ${isUserFound ? "block" : "hidden"}`}>
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
            {courses.map((course) => {
              return (
                <button
                  key={course._id}
                  type="button"
                  className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onClick={() => {
                    handleSelectedCourse(course);
                  }}
                >
                  {`Name: ${course.courseName}`}
                </button>
              );
            })}
            {filteredCourses.slice(0, 10).map((course) => {
              return (
                <button
                  key={course._id}
                  type="button"
                  className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onClick={() => {
                    handleSelectedCourse(course);
                  }}
                >
                  {`Name: ${course.course_name}, Instructor: ${course.instructor.username}`}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
