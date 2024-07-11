import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((user) => ({
    ...user.data(),
    userId: user.id,
  }));
};

const useGetAllUsers = () => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    retry: 3, // Will retry failed requests 3 times before displaying an error
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return { users, isLoading, error };
};

export default useGetAllUsers;
