import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const useGetAllCourses = () => {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((course) => {
      const obj = { ...course.data(), courseId: course.id };
      dataArr.push(obj);
    });
    setCourses(dataArr);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return courses;
};

export default useGetAllCourses;
