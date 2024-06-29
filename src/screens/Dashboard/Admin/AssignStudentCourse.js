import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import imgPlaceholder from "../image-placeholder.png";
import { assignStudentToCourse, selectCourse } from "../../../utils/courseFunctions";
import { db } from "../../../lib/firebase";
import Layout from "../../../components/Dashboard/Layout";
import { useNavigate } from "react-router-dom";

const AssignStudentCourse = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [students, setStudents] = useState([]);
  const [areStudentsLoaded, setAreStudentsLoaded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [courses, setCourses] = useState([]);
  const [areCoursesLoaded, setAreCoursesLoaded] = useState(false);
  const [showStudentResults, setShowStudentResults] = useState(false);
  const [showCourseResults, setShowCourseResults] = useState(false);
  const [focused, setFocused] = useState({});
  const [loading, setLoading] = useState(true);
  const [isStudentFound, setIsStudentFound] = useState(false);
  const [isCourseFound, setIsCourseFound] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [assignedCourse, setAssignedCourse] = useState({
    student: { username: "" },
  });
  const [isAssignedCourseLoading, setIsAssignedCourseLoading] = useState({
    student: { username: "" },
  });
    const [isAssigningStudent, setIsAssigningStudent] = useState(false);

  const handleAssignedStudent = (e) => {
    setShowStudentResults(true);
    setIsStudentFound(false);
    setIsCourseFound(false);
    setFilteredStudents(
      students.filter((s) =>
        s.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setAssignedCourse({
      ...assignedCourse,
      student: { username: e.target.value },
    });
  };

  const handleCourseName = (e) => {
    setShowCourseResults(true);
    setIsCourseFound(false);
    setAssignedCourse({
      ...assignedCourse,
      course_name: e.target.value,
    });

    if (e.target.value.length > 0) {
      setFilteredCourses(
        courses.filter((c) => 
          c.courseName.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  };

  const handleSelectedStudent = (student) => {
    setShowStudentResults(false);
    if (student.username !== assignedCourse.student.username) {
      setSelectedStudent(student);
      setShowCourseResults(false);
      setIsCourseFound(false);
      setIsStudentFound(true);
      setAssignedCourse({ student });
      document.getElementById("assigned-student").value = student.username;
    }
    if (filteredCourses.length) {
      document.getElementById("assigned-course-name").value = "";
    }
  };

  const handleSelectedCourse = (course) => {
    setIsAssignedCourseLoading(true);
    setIsCourseFound(true);
    setShowCourseResults(false);
    selectCourse({
        ...props,
        assignedCourse,
        setAssignedCourse,
        setIsAssignedCourseLoading,
        course,
    });
    document.getElementById(
        "assigned-course-name"
    ).value = `Name: ${course.course_name}, Instructor: ${course.instructor.username}`;
  };

  useEffect(() => {
    if (loading) {
      const getData = async () => {
        if (!areCoursesLoaded) {
          const getAllCourses = async () => {
            const coursesData = [];
            const querySnapshot = await getDocs(collection(db, "courses"));
            querySnapshot.forEach((doc) => {
              const course = { ...doc.data(), id: doc.id };
              coursesData.push(course);
            });
            setCourses(coursesData);
            setAreCoursesLoaded(true);
          };
          getAllCourses();
        }

        if (!areStudentsLoaded) {
          const getStudents = async () => {
            const studentsData = [];
            try {
              const querySnapshot = await getDocs(collection(db, "users"));
              querySnapshot.forEach((doc) => {
                  if (doc.data().isStudent) {
                    const student = { ...doc.data(), id: doc.id };
                    studentsData.push(student);
                  }
              });
              setStudents(studentsData);
              setAreStudentsLoaded(true);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching students: ", error);
            }
          };
          getStudents();
        }
      };
      getData();
    }
  }, [loading, areCoursesLoaded, areStudentsLoaded]);
    
  useEffect(() => {
    if (focused && focused !== "assigned-course-name") {
      setShowCourseResults(false);
    } else if (focused && focused !== "assigned-student") {
      setShowStudentResults(false);
    }
  }, [focused]);

  if (!currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin) history("/dashboard");

  return (
    <Layout>
      <div id="assign-course" className="w-1/2 mx-auto">
        <div className="form-group mb-4">
          <label
            htmlFor="assigned-student"
            className="block text-sm font-medium text-gray-700"
          >
            Student
          </label>
          <input
            type="text"
            className="form-control block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="assigned-student"
            onClick={(e) => {
              setShowStudentResults(true);
              setFocused(e.target.id);
              if (!e.target.value.length) {
                setFilteredStudents(students);
              }
            }}
            onChange={(e) => {
              handleAssignedStudent(e);
            }}
          />
          {showStudentResults && (
            <div id="results-container" className="mt-2 space-y-2">
              {filteredStudents.slice(0, 10).map((student) => (
                <button
                  key={student.id}
                  type="button"
                  className="form-control block w-full text-left border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onClick={() => {
                    handleSelectedStudent(student);
                  }}
                >
                  {student.username}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className={`form-group mb-4 ${isStudentFound ? "block" : "hidden"}`}
        >
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
      </div>
    </Layout>
  );
};

export default AssignStudentCourse;
