import React, { lazy, Suspense } from "react";
import { CiClock2 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const InfoCard = lazy(() => import("../../../components/Dashboard/InfoCard"));
const TeacherCoursesList = lazy(() =>
  import("../../../components/Courses/TeacherCoursesList")
);

const TeachersCourses = ({ currentUser }) => {
  const [userCourses, setUserCourses] = React.useState([]);
  const [completedCourses, setCompletedCourses] = React.useState([]);
  const [coursesInProgress, setCoursesInProgress] = React.useState([]);
  const { courses, error, isLoading } = useGetAllCourses();

  React.useEffect(() => {
    if (currentUser) {
      setCompletedCourses(currentUser.completedCourses);
      setCoursesInProgress(currentUser.courses);
      const allCourses = [];
      if (courses) {
        courses.forEach((course) => {
          currentUser.courses.forEach((id) => {
            if (id === course.courseId) {
              allCourses.push(course);
            }
          });
        });
        setUserCourses([...allCourses]);
      }
    }
  }, [currentUser, courses]);

  if (!currentUser) return <Layout>Loading this page.</Layout>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="p-6 space-y-4">
        <h2>View Enrolled Students</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
              icon={CiClock2}
              label={"In Progress"}
              numberOfItems={coursesInProgress.length}
            />
            <InfoCard
              icon={FaCheckCircle}
              label={"Pass Courses"}
              numberOfItems={completedCourses.length}
              variant="success"
            />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {userCourses.length === 0 && (
            <TeacherCoursesList items={userCourses} />
          )}
        </Suspense>
      </div>
    </Layout>
  );
};

export default TeachersCourses;
