import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

export default function PendingCourses({
    pendingCourses,
    searchCourse,
    setSearchedItems,
    searchedItems,
    currentUser,
    setCoursesSlice,
    coursesSlice,
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4">Pending Courses</h2>
              <SearchBar
                setSearchedItems={setSearchedItems}
                search={searchCourse}
                items={pendingCourses}
                currentUser={currentUser}
                setItemsSlice={setCoursesSlice}
                placeholder="Search course name"
              />
            </div>
            <ul className="list-none p-0">
              <li className="mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class Number
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Instructor
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Type
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Subject
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade Level
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Number of Students
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchedItems
                      .slice(coursesSlice[0], coursesSlice[1])
                      .map((user, index) =>
                        user.pendingCourses.map((course, courseIndex) => (
                          <tr key={`${course.classNum}${index}${courseIndex}`}>
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{course.classNum}</td>
                            <td className="px-4 py-2">{course.courseName}</td>
                            <td className="px-4 py-2">
                              {course.courseInstructor || "No Instructor"}
                            </td>
                            <td className="px-4 py-2">{course.subject}</td>
                            <td className="px-4 py-2">{course.gradeLevel}</td>
                            <td className="px-4 py-2">
                              {course.num_of_students}
                            </td>
                            <td className="px-4 py-2">
                              <Link
                                className="btn btn-primary"
                                to={`/admin/user/${user.username}/pendingcourse/${course.courseId}`}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
                {!searchedItems.length && (
                  <h2 className="text-center mt-4">
                    No transactions found with searched user
                  </h2>
                )}
              </li>
            </ul>
            {searchedItems.length > 3 && (
              <div className="text-center mt-4">
                {coursesSlice[0] !== 0 && (
                  <button
                    className="btn btn-primary mr-2"
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
          </div>
        </div>
      </div>
    </div>
  );
}
