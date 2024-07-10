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
    retry: 3, // Will retry failed requests 3 times before displaying an error
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return { courses, isLoading, error };
};

export default useGetAllCourses;
