import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "./image-placeholder.png";
import "./StudentCourses.css";
import Layout from "../../components/Dashboard/Layout";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import SearchBar from "./SearchBar";
import { searchCourse } from "../../utils/courseFunctions";
import { removeDuplicates } from "../../utils/helperfunctions";

function StudentCourses(props) {
  const history = useNavigate();
  const { currentUser } = props;
  const [coursesSlice, setCoursesSlice] = useState([0, 3]);
  const [courses, setCourses] = useState([]);

  const getCourses = async () => { 
    currentUser.courses.map(async (course) => {
      const courseRef = doc(db, "courses", course);
      const courseDoc = await getDoc(courseRef);
      const courseData = courseDoc.data();
      setCourses(prev => [...prev, courseData])
    });
    const uniqueCourses = removeDuplicates(courses);
    setCourses(uniqueCourses);
  }

  const getInstructor = async (id) => { 
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const { name } = userData;
    return name;
  }

  React.useEffect(() => {
    // 3000 milliseconds = 3 seconds
    const threeMilliseconds = 3 * 1000;
    const timer = setTimeout(() => {
      getCourses();
    }, threeMilliseconds);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [currentUser]);

  if (!currentUser) return <h1>Loading...</h1>;

  return (
    <Layout>
      <div id="student-courses" style={{ textAlign: "center" }}>
        {currentUser.courses.length > 0 && courses.length > 0 ? (
          <div className="col">
            <div>
              <SearchBar
                currentUser={currentUser}
                setSearchedItems={setCourses}
                search={searchCourse}
                items={courses}
                setItemsSlice={setCoursesSlice}
                placeholder="search a course name"
              />
            </div>
            <ul
              className="courses-list"
              style={{ margin: "auto", width: "60%" }}
            >
              <h2>Your Courses</h2>
              {courses
                .slice(coursesSlice[0], coursesSlice[1])
                .map((course) => {
                  return (
                    <li
                      key={course.courseName}
                      style={{ marginTop: "2%", cursor: "pointer" }}
                      onClick={() => {
                        history(`/dashboard/course/${course._id}`);
                      }}
                    >
                      <img src={imgPlaceholder} alt="img" />
                      <div className="info">
                        <h2 className="title">{course.courseName}</h2>
                        <p className="desc">Instructor: {course.instructor}</p>
                        <p className="desc">Subject: {course.subject}</p>
                        <p className="desc">Grade Level: {course.gradeLevel}</p>
                        <p className="desc">
                          Number of Students: {course.num_of_students || 0}
                        </p>
                      </div>
                    </li>
                  );
                })}
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
              {coursesSlice[1] <= courses.length - 1 &&
                courses.length > 3 && (
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
          </div>
        ) : (
          <h3>You have no courses enrolled</h3>
        )}
      </div>
    </Layout>
  );
};

export default StudentCourses;
