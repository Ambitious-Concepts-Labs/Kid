import { useState, useEffect } from "react";
import { storage } from "../lib/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const useGetCourseAttachments = (courseId) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const listRef = ref(storage, `courseAttachments/${courseId}`);
        const res = await listAll(listRef);
        res.prefixes.forEach((folderRef) => {
          // Handle folder references if needed
          console.log({ folderRef });
        });

        const attachmentPromises = res.items.map(async (itemRef) => {
          try {
            const url = await getDownloadURL(itemRef);
            if (!attachments.some((att) => att.url === url)) {
              return { url, name: itemRef.name, ref: itemRef };
            }
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        });

        const newAttachments = await Promise.all(attachmentPromises);
        setAttachments((prev) => [...prev, ...newAttachments.filter(Boolean)]);
      } catch (error) {
        console.error("Error listing attachments:", error);
      }
    };

    fetchAttachments();
  }, [courseId]);

  return attachments;
};

export default useGetCourseAttachments;
