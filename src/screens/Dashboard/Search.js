import React from "react";
import Layout from "../../components/Dashboard/Layout";
import SearchInput from "../../components/SearchInput";
import CoursesList from "../../components/Courses/CoursesList";
import Categories from "../../components/Courses/Categories";
import useGetAllCourses from "../../hooks/useGetAllCourses";
import { mockSearchCourses } from "../../constants/mockData";

export default function Search() {
  const courses = useGetAllCourses();
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


  return (
    <Layout>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        {(courses.length > 0 && process.env.NODE_ENV === "development") && <CoursesList items={filteredCourses} />}
        <CoursesList items={mockSearchCourses} />
      </div>
    </Layout>
  );
}
