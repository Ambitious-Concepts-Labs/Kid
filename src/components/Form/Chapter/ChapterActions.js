import React, { useState } from "react";
import { ConfirmModal } from "../../Modal/Confirm";
import Button from "./Button";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Placeholder for the Trash icon
const Trash = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h10"
    />
  </svg>
);

const ChapterActions = ({ disabled, courseId, chapterId, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const courseRef = doc(db, "courses", courseId);
      const courseDoc = await getDoc(courseRef);
      const courseData = courseDoc.data();
      const chapters = courseData.chapters || [];
      const chapterIndex = chapters.findIndex(
        (chapter) => chapter.id === chapterId
      );

      if (chapterIndex !== -1) {
        chapters[chapterIndex].isPublished = !isPublished;

        await updateDoc(courseRef, { chapters });
      }
      if (isPublished) {
        alert("Chapter Unpublished");
      } else {
        alert("Chapter Published");
      }

      window.location.reload();
    } catch (error) {
      console.log({ error })
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const courseRef = doc(db, "courses", courseId);
      const courseDoc = await getDoc(courseRef);
      const courseData = courseDoc.data();
      const chapters = courseData.chapters || [];
      const chapterIndex = chapters.findIndex(
        (chapter) => chapter.id === chapterId
      );
      if (chapterIndex !== -1) {
        const removeItemByIndex = (index) => {
          const newItems = [...chapters];
          newItems.splice(index, 1);
          return newItems;
        };
        const newChapters = removeItemByIndex(chapterIndex)

        await updateDoc(courseRef, { newChapters });
      }
      alert("Chapter deleted successfully");
      window.location.reload();
      window.location.href = `/dashboard/courses/${courseId}`;
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
