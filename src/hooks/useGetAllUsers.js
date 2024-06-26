import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers= async () => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((user) => {
      const obj = { ...user.data(), userId: user.id };
      dataArr.push(obj);
    });
    setUsers(dataArr);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return users;
};

export default useGetAllUsers;
