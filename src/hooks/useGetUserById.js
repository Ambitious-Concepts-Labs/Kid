import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const useGetUserById = (id) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const getCourse = async () => {
    try {
      const docRef = await getDoc(doc(db, "user", id));
      if (!docRef.exists()) {
        console.log("No such document!");
      } else {
        setUser(docRef.data());
      }
    } catch (error) {
      console.error("Error fetching course: ", error);
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted && loading && !isUserLoaded) {
      getCourse();
      setIsUserLoaded(true);
      setLoading(false);
    }
    return () => {
      unmounted = true;
    };
  }, [loading, isUserLoaded, id]);

  return { user, loading, setLoading };
};

export default useGetUserById;
