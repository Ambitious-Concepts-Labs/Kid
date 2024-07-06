import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const useUserData = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      usersData.forEach((user) => {
          if (user.uid === data.uid) {
           data.id = user.id;
          }
        });
      setCurrentUser(data);
    } catch (err) {
      console.error(err);
      console.log(error);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchUserInfo();
  }, [user, loading]);

  return { user, currentUser, loading, error };
};

export default useUserData;
