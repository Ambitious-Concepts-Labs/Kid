import React, { useState } from "react";
import { Checkbox } from "../../Checkbox";
import Button from "./Button";
import { db } from "../../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { cn } from "../../../utils/helperfunctions";
import useGetCourseById from "../../../hooks/useGetCouseById";

const ChapterAccessForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFree, setIsFree] = useState(initialData.isFree || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: course, isLoading, error } = useGetCourseById(courseId);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
        const courseRef = doc(db, "courses", courseId);
        const chapters = course.chapters || [];
        const chapterIndex = chapters.findIndex(
          (chapter) => chapter.id === chapterId
        );

        if (chapterIndex !== -1) {
          chapters[chapterIndex].isFree = isFree;

          await updateDoc(courseRef, { chapters });
        }
      alert("Chapter updated");
      toggleEdit();
      window.location.reload(); 
    } catch {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter access
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.isFree && "text-slate-500 italic"
          )}
        >
          {initialData.isFree
            ? "This chapter is free for preview."
            : "This chapter is not free."}
        </p>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox checked={isFree} onChange={setIsFree} />
            <div className="space-y-1 leading-none">
              <p>
                Check this box if you want to make this chapter free for preview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Button disabled={isSubmitting} type="submit">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
