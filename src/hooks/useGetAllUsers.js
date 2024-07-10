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
  });

  return { users, isLoading, error };
};

export default useGetAllUsers;
