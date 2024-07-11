import React, { useState, useEffect, lazy } from "react";
import { searchCourse } from "../../../utils/courseFunctions";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const PendingCoursesList = lazy(() => import("../../../components/Courses/PendingCourses"));

const PendingCourses = (props) => {
  const { currentUser } = props;
  const { users, userError, usersAreLoading } = useGetAllUsers();
  const [searchedItems, setSearchedItems] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesSlice, setCoursesSlice] = useState([0, 10]);
  const { courses } = useGetAllCourses();

  useEffect(() => {
    const fetchPendingCourses = () => {
      if (currentUser && users.length > 0) {
        const usersWithPendingCourses = users.filter(
          (user) => user.pendingCourses.length > 0
        );

        const pendingCoursesData = usersWithPendingCourses.map((user) => {
          const userPendingCourses = courses.filter((course) => {
            return user.pendingCourses.includes(course.courseId);
          });
          return { ...user, pendingCourses: userPendingCourses };
        });

        setPendingCourses(pendingCoursesData);
        setSearchedItems(pendingCoursesData);
        setLoading(false);
      }
    };

    fetchPendingCourses();
  }, [currentUser, users]);

  if (usersAreLoading) return <div>Loading...</div>;
  if (userError) return <div>Error: {userError.message}</div>;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!searchedItems.length) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-center">
                  There are no pending courses
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PendingCoursesList
        pendingCourses={pendingCourses}
        searchCourse={searchCourse}
        setSearchedItems={setSearchedItems}
        searchedItems={searchedItems}
        currentUser={currentUser}
        setCoursesSlice={setCoursesSlice}
        coursesSlice={coursesSlice}
      />
    </Layout>
  );
};

export default PendingCourses;
