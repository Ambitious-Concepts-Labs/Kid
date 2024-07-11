import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchCourseById = async (id) => {
  const docRef = await getDoc(doc(db, "courses", id));
  if (!docRef.exists()) {
    throw new Error("No such document!");
  }
  console.log(docRef.data());
  return { id: docRef.id, ...docRef.data() };
};

const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id, // Ensure the query runs only if an ID is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetCourseById;
