import React, { useState, lazy, Suspense } from "react";
// import { useHistory } from "react-router-dom";
import { searchCourse } from "../../../utils/courseFunctions";
import "./TeacherCourses.css";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const SearchBar = lazy(() => import("../../../components/SearchBar"));
const CourseList = lazy(() => import("../../../components/Lists/CourseList"));

const UserCourses = (props) => {
  // const history = useHistory();
  const { currentUser } = props;
  const [searchedItems, setSearchedItems] = useState();
  const [coursesSlice, setCoursesSlice] = useState([0, 3]);
  const { courses, error, isLoading } = useGetAllCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentUser) return <h1>Loading...</h1>;
  return (
    <Layout>
      <div id="teacher-courses" style={{ textAlign: "center" }}>
        {currentUser.courses.length > 0 ? (
          <div className="col">
            <Suspense fallback={<div>Loading search bar...</div>}>
              <SearchBar
                currentUser={currentUser}
                setSearchedItems={setSearchedItems}
                search={searchCourse}
                items={currentUser.courses}
                setItemsSlice={setCoursesSlice}
                placeholder="search a course name"
              />
            </Suspense>
            <h2>Your Courses</h2>
            <Suspense fallback={<div>Loading courses...</div>}>
              <CourseList
                courses={courses}
                coursesSlice={coursesSlice}
                setCoursesSlice={setCoursesSlice}
                currentUser={currentUser}
              />
            </Suspense>
          </div>
        ) : (
          <h3>You have no courses.</h3>
        )}
      </div>
    </Layout>
  );
};

export default UserCourses;
