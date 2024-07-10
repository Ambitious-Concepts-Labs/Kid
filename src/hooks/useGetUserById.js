import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Function to fetch a user by ID from Firestore
const fetchUserById = async (id) => {
  const docRef = await getDoc(doc(db, "user", id));
  if (!docRef.exists()) {
    throw new Error("No such user!");
  }
  return { id: docRef.id, ...docRef.data() };
};

// Custom hook to fetch a user by ID
const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id, // Ensure the query runs only if an ID is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetUserById;
