import React from 'react'

export default function CourseDetails({
    isCourseFound,
    isAssignedCourseLoading,
    assignedCourse,
    imgPlaceholder,
    assignStudentToCourse,
    currentUser,
    selectedStudent,
    setLoading,
    setIsAssigningStudent,
    isAssigningStudent,
    setAreCoursesLoaded,
    setAssignedCourse,
}) {
  return (
    <>
      {isCourseFound &&
        (!isAssignedCourseLoading ? (
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
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="btn btn-primary w-36 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    assignStudentToCourse({
                      currentUser,
                      course: assignedCourse,
                      student: selectedStudent,
                      setLoading,
                      setIsAssigningStudent,
                      isAssigningStudent,
                      setAreCoursesLoaded,
                      setAssignedCourse,
                    });
                  }}
                >
                  Assign Student
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <div className="spinner-border text-indigo-600" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ))}
    </>
  );
}
