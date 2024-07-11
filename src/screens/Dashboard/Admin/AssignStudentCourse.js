import React, { useState, useEffect, Suspense, lazy } from "react";
import { assignStudentToCourse, selectCourse } from "../../../utils/courseFunctions";
import Layout from "../../../components/Dashboard/Layout";
import { useNavigate } from "react-router-dom";
import useGetAllCourses from "../../../hooks/useGetAllCourses";
import useGetAllUsers from "../../../hooks/useGetAllUsers";

const StudentSearch = lazy(() => import("../../../components/Courses/StudentSearch"));
const CourseSearch = lazy(() => import("../../../components/Courses/CourseSearch"));
const CourseDetails = lazy(() => import("../../../components/Courses/CourseDetails"));

const imgPlaceholder = "https://d10grw5om5v513.cloudfront.net/assets/images/image-placeholder.png";

const AssignStudentCourse = (props) => {
  const { currentUser } = props;
  const history = useNavigate();
  const [students, setStudents] = useState([]);
  const { users } = useGetAllUsers();
  const [areStudentsLoaded, setAreStudentsLoaded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const { courses, error, isLoading } = useGetAllCourses();
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
        if (!areStudentsLoaded) {
          const getStudents = async () => {
            const studentsData = [];
            try {
              users.forEach((doc) => {
                  if (doc.isStudent) {
                    const student = { ...doc, id: doc.id };
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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div id="assign-course" className="w-1/2 mx-auto">
        <Suspense fallback={<div>Loading student search...</div>}>
          <StudentSearch
            showStudentResults={showStudentResults}
            setShowStudentResults={setShowStudentResults}
            setFocused={setFocused}
            handleAssignedStudent={handleAssignedStudent}
            filteredStudents={filteredStudents}
            handleSelectedStudent={handleSelectedStudent}
            students={students}
          />
        </Suspense>

        {isStudentFound && (
          <Suspense fallback={<div>Loading course search...</div>}>
            <CourseSearch
              isCourseFound={isCourseFound}
              showCourseResults={showCourseResults}
              setShowCourseResults={setShowCourseResults}
              setFocused={setFocused}
              handleCourseName={handleCourseName}
              courses={courses}
              filteredCourses={filteredCourses}
              handleSelectedCourse={handleSelectedCourse}
            />
          </Suspense>
        )}

        {isCourseFound && (
          <Suspense fallback={<div>Loading course details...</div>}>
            <CourseDetails
              isAssignedCourseLoading={isAssignedCourseLoading}
              assignedCourse={assignedCourse}
              imgPlaceholder={imgPlaceholder}
              currentUser={currentUser}
              selectedStudent={selectedStudent}
              setLoading={setLoading}
              setIsAssigningStudent={setIsAssigningStudent}
              isAssigningStudent={isAssigningStudent}
              setAreCoursesLoaded={setAreCoursesLoaded}
              setAssignedCourse={setAssignedCourse}
              assignStudentToCourse={assignStudentToCourse}
            />
          </Suspense>
        )}
      </div>
    </Layout>
  );
};

export default AssignStudentCourse;
