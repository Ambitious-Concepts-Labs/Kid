import React, { useState } from "react";
import Editor from "../../Editor";
import Preview from "../../Preview";
import Button from "./Button";
import { db, mutateFireStoreDoc } from "../../../lib/firebase";
import { doc } from "firebase/firestore";
import { cn } from "../../../utils/helperfunctions";
import useGetCourseById from "../../../hooks/useGetCouseById";

// Simple form validation function
const validate = (values) => {
  const errors = {};
  if (!values) {
    errors.description = "Description is required";
  }
  return errors;
};

const ChapterDescriptionForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    description: initialData?.description || "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: course } = useGetCourseById(courseId);


  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      try {
        setIsSubmitting(true);
        const courseRef = doc(db, "courses", courseId);
        const chapters = course.chapters || [];
        const chapterIndex = chapters.findIndex(
          (chapter) => chapter.id === chapterId
        );

        if (chapterIndex !== -1) {
          chapters[chapterIndex].description = formValues;

          await mutateFireStoreDoc(courseRef, { chapters });
        }
        alert("Chapter updated successfully");
        toggleEdit();
        window.location.reload(); 
      } catch {
        alert("Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {!initialData.description ? (
            "No description"
          ) : (
            <Preview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div name="description">
            <Editor
              value={formValues}
              onChange={setFormValues}
              name="description"
            />
            {formErrors.description && (
              <p className="form-error">{formErrors.description}</p>
            )}
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

export default ChapterDescriptionForm;
