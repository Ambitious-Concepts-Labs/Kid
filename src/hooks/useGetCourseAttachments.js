import { useQuery } from "@tanstack/react-query";
import { storage } from "../lib/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";

// Function to fetch course attachments from Firebase Storage
const fetchCourseAttachments = async (courseId) => {
  const listRef = ref(storage, `courseAttachments/${courseId}`);
  const res = await listAll(listRef);

  const attachmentPromises = res.items.map(async (itemRef) => {
    try {
      const url = await getDownloadURL(itemRef);
      return { url, name: itemRef.name, ref: itemRef };
    } catch (error) {
      console.error("Error getting download URL:", error);
      return null;
    }
  });

  const attachments = await Promise.all(attachmentPromises);
  return attachments.filter(Boolean);
};

// Custom hook to fetch course attachments
const useGetCourseAttachments = (courseId) => {
  return useQuery({
    queryKey: ["courseAttachments", courseId],
    queryFn: () => fetchCourseAttachments(courseId),
    enabled: !!courseId, // Ensure the query runs only if courseId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

export default useGetCourseAttachments;
