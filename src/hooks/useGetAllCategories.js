import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const useGetAllCategories = (setLoading) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const dataArr = [];
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((category) => {
        const obj = { ...category.data(), id: category.id };
        dataArr.push(obj);
      });

      if (dataArr.length === 0) {
        console.log("No matching documents.");
        return [];
      }

      setCategories(dataArr);
      setLoading(false);

      console.log("Categories fetched successfully:", dataArr);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
};

export default useGetAllCategories;
