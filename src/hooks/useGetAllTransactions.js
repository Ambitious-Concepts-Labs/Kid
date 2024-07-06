import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const useGetAllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, "transactions"));
    querySnapshot.forEach((transactions) => {
      const obj = { ...transactions.data(), transactionsId: transactions.id };
      dataArr.push(obj);
    });
    setTransactions(dataArr);
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return transactions;
};

export default useGetAllTransactions;
