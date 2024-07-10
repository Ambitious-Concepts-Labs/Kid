import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const dataArr = querySnapshot.docs.map((category) => ({
    ...category.data(),
    id: category.id,
  }));

  if (dataArr.length === 0) {
    console.log("No matching documents.");
  } else {
    console.log("Categories fetched successfully:", dataArr);
  }

  return dataArr;
};

const useGetAllCategories = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return { categories, isLoading, error };
};

export default useGetAllCategories;
