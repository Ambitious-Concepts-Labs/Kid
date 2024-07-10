import React, { useState, lazy, Suspense } from "react";
import Layout from "../../../components/Dashboard/Layout";
import useGetAllCourses from "../../../hooks/useGetAllCourses";

const CourseTable = lazy(() => import("../../../components/Admin/CourseTable"));

const DeleteCourse = (props) => {
  const { currentUser } = props;
  const { courses, error, isLoading } = useGetAllCourses();
  const [updatedCourses, setUpdatedCourses] = useState(courses);

  if (!currentUser?.isAdmin)
    return <div className="text-center">Access Denied</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="container mx-auto p-4 overflow-scroll">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
              <Suspense fallback={<div>Loading courses...</div>}>
                <CourseTable
                  updatedCourses={updatedCourses}
                  setUpdatedCourses={setUpdatedCourses}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeleteCourse;
