import React from "react";
import CoursesList from "../../components/Courses/CoursesList";
import InfoCard from "../../components/Dashboard/InfoCard";
import { CiClock2 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import Layout from "../../components/Dashboard/Layout";
import useGetAllCourses from "../../hooks/useGetAllCourses";

const Dashboard = ({ currentUser }) => {
  const [userCourses, setUserCourses] = React.useState([]);
  const [completedCourses, setCompletedCourses] = React.useState([]);
  const [coursesInProgress, setCoursesInProgress] = React.useState([]);
  const courses = useGetAllCourses();
  React.useEffect(() => {
    if (currentUser) {
      setCompletedCourses(currentUser.completedCourses);
      setCoursesInProgress(currentUser.courses);
      const allCourses = [];
      if (courses) {
        courses.forEach((course) => {
          const userCourse = currentUser.courses.find((c) => c.id === course.id);
          const userProgressCourse = currentUser.completedCourses.find(
            (c) => c.id === course.id
          );
          if (userProgressCourse) {
            allCourses.push(course);
          } 
          if (userCourse) {
            allCourses.push(course);
          }
        });
        setUserCourses(allCourses);
      }
    }
  }, [currentUser, userCourses]);

  if (!currentUser) {
    return <Layout>Loading this page.</Layout>;
  }

  return (
    <Layout>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={CiClock2}
            label={"In Progress"}
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={FaCheckCircle}
            label={"Completed"}
            numberOfItems={completedCourses.length}
            variant="success"
          />
        </div>
        {
          userCourses.length === 0 ? (
            <h2>Loading...</h2>
          ) : (
            <CoursesList items={userCourses} />
          )
        }
      </div>
    </Layout>
  );
};

export default Dashboard;
