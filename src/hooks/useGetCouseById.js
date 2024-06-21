import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const useGetCouseById = (id) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCourseLoaded, setIsCourseLoaded] = useState(false);

  const getCourse = async () => {
    try {
      const docRef = await getDoc(doc(db, "courses", id));
      if (!docRef.exists()) {
        console.log("No such document!");
      } else {
        setCourse(docRef.data());
      }
    } catch (error) {
      console.error("Error fetching course: ", error);
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted && loading && !isCourseLoaded) {
      getCourse();
      setIsCourseLoaded(true);
      setLoading(false);
    }
    return () => {
      unmounted = true;
    };
  }, [loading, isCourseLoaded, id]);

  return { course, loading, setLoading };
};

export default useGetCouseById;
