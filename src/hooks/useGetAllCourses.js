import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchAllCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  return querySnapshot.docs.map((course) => ({
    ...course.data(),
    courseId: course.id,
  }));
};

const useGetAllCourses = () => {
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
  });

  return { courses, isLoading, error };
};

export default useGetAllCourses;
