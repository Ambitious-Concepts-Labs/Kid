import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchAllTransactions = async () => {
  const querySnapshot = await getDocs(collection(db, "transactions"));
  return querySnapshot.docs.map((transaction) => ({
    ...transaction.data(),
    transactionId: transaction.id,
  }));
};

const useGetAllTransactions = () => {
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactions,
  });
  return {
    transactions,
    transactionsError: error,
    transactionsAreLoading: isLoading,
  };

};

export default useGetAllTransactions;