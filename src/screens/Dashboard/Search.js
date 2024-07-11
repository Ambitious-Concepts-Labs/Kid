import React, { lazy, Suspense } from "react";
import Layout from "../../components/Dashboard/Layout";
import SearchInput from "../../components/SearchInput";
import useGetAllCourses from "../../hooks/useGetAllCourses";
import { mockSearchCourses } from "../../constants/mockData";

const Categories = lazy(() => import("../../components/Courses/Categories"));
const CoursesList = lazy(() => import("../../components/Courses/CoursesList"));

export default function Search() {
  const { courses, error, isLoading } = useGetAllCourses();
  const filteredCourses = courses.filter(
    (course) => Array.isArray(course.chapters) && course.chapters.length > 0
  );

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
    // Here you can handle the search logic, such as filtering data
  };

  const categories = [
    { id: 1, name: "Development" },
    { id: 2, name: "Business" },
    { id: 3, name: "Finance" },
    { id: 4, name: "Design" },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="p-6 space-y-4">
        <Suspense fallback={<div>Loading categories...</div>}>
          <Categories items={categories} />
        </Suspense>
        {courses.length > 0 && process.env.NODE_ENV === "development" && (
          <Suspense fallback={<div>Loading courses...</div>}>
            <CoursesList items={filteredCourses} />
          </Suspense>
        )}
        <Suspense fallback={<div>Loading mock courses...</div>}>
          <CoursesList items={mockSearchCourses} />
        </Suspense>
      </div>
    </Layout>
  );
}
