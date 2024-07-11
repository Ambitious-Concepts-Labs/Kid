import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const useUserData = () => {
  const [user, authLoading, authError] = useAuthState(auth);

  const fetchUserInfo = async () => {
    if (!user) return null;

    const usersSnapshot = await getDocs(collection(db, "users"));
    const usersData = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0]?.data();

    if (!data) return null;

    const matchingUser = usersData.find((u) => u.uid === data.uid);
    if (matchingUser) {
      data.id = matchingUser.id;
    }

    return data;
  };

  const { data: currentUser, isLoading, error } = useQuery({
    queryKey: ["userData", user?.uid],
    queryFn: fetchUserInfo,
    enabled: !!user && !authLoading,
    retry: 3, // Will retry failed requests 3 times before displaying an error
    staleTime: 5 * 60 * 1000, // Cache for  5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return {
    user,
    currentUser,
    loading: authLoading || isLoading,
    error: authError || error,
  };
};

export default useUserData;
