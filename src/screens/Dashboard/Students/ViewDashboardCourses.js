import React, { Suspense, lazy } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const CoursesList = lazy(() => import("../../../components/Courses/CoursesList"));
const InfoCard = lazy(() => import("../../../components/Dashboard/InfoCard"));

const Dashboard = ({ currentUser }) => {
  const [userCourses, setUserCourses] = React.useState([]);
  const [completedCourses, setCompletedCourses] = React.useState([]);
  const [coursesInProgress, setCoursesInProgress] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { courses, error, isLoading } = useGetAllCourses();

  React.useEffect(() => {
    if (currentUser && courses) {
      setCompletedCourses(currentUser.completedCourses);
      setCoursesInProgress(currentUser.courses);
      const allCourses = [];
      if (courses) {
        currentUser.courses.forEach((c) => {
          courses.forEach((course) => {
            if (c.course === course.courseId) {
              course.progress = c.progress;
              allCourses.push(course);
            }
          });
        });
        setUserCourses(allCourses);
      }
      setLoading(false);
    }
  }, [currentUser, courses]);

  if (!currentUser) return <Layout>Loading this page.</Layout>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Suspense fallback={<div>Loading info cards...</div>}>
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
            </Suspense>
        </div>
        <Suspense fallback={<div>Loading courses...</div>}>
          <CoursesList items={userCourses} />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Dashboard;
