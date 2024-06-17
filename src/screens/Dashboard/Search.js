import React from "react";
import Layout from "../../components/Dashboard/Layout";
import SearchInput from "../../components/SearchInput";
import CoursesList from "../../components/Courses/CoursesList";
import Categories from "../../components/Courses/Categories";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Search() {
  const [courses, setCourses] = React.useState([]);
  const getAllCourses = async () => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((course) => {
      const obj = { ...course.data(), courseId: course.id };
      dataArr.push(obj);
    });
    setCourses(dataArr);

    console.log(dataArr);
  };

  React.useEffect(() => {
    getAllCourses();
  }, []);

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

  const mockcourses = [
    {
      courseId: 1,
      title: "Course Title 1",
      imageUrl: "https://via.placeholder.com/150",
      price: 100,
      progress: null,
      category: { id: 1, name: "Development" },
      chapters: [],
    },
    {
      courseId: 2,
      title: "Course Title 2",
      imageUrl: "https://via.placeholder.com/150",
      price: 200,
      progress: 30,
      category: { id: 2, name: "Business" },
      chapters: [{}, {}],
    },
    {
      courseId: 3,
      title: "Course Title 3",
      imageUrl: "https://via.placeholder.com/150",
      price: 150,
      progress: null,
      category: { id: 3, name: "Finance" },
      chapters: [],
    },
    {
      courseId: 4,
      title: "Course Title 4",
      imageUrl: "https://via.placeholder.com/150",
      price: 50,
      progress: 100,
      category: { id: 4, name: "Design" },
      chapters: [],
    },
  ];
    
    console.log({ courses });

  return (
    <Layout>
      <div>Search</div>
      <SearchInput onSearch={handleSearch} />
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        {
            courses.length > 0 && (
                <CoursesList items={[courses[5]]} />
            )
        }
        <CoursesList items={mockcourses} />
      </div>
    </Layout>
  );
}
