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
    retry: 3, // Will retry failed requests 3 times before displaying an error
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
  return {
    transactions,
    transactionsError: error,
    transactionsAreLoading: isLoading,
  };

};

export default useGetAllTransactions;