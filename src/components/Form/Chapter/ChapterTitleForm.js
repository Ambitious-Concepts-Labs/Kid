import React, { useState } from "react";
import Button from "./Button";
import { mutateFireStoreDoc } from "../../../lib/firebase";
import useGetCourseById from "../../../hooks/useGetCouseById";
// Input component
const Input = ({ disabled, placeholder, value, onChange }) => (
  <input
    type="text"
    disabled={disabled}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="input-class" // Add your input styles here
  />
);

// Simple form validation function
const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  return errors;
};

const ChapterTitleForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState(initialData.title);
    const { data: course, isLoading, error } = useGetCourseById(courseId);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFormValues({ ...formValues, title: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      try {
        setIsSubmitting(true);
        const chapters = course.chapters || [];
        const chapterIndex = chapters.findIndex(
          (chapter) => chapter.id === chapterId
        );

        if (chapterIndex !== -1) {
          chapters[chapterIndex].title = inputValue;

          await mutateFireStoreDoc("courses", courseId, { chapters });
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
        Chapter Title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit Title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              disabled={isSubmitting}
              placeholder="e.g 'Introduction to the course'"
              value={inputValue}
              onChange={handleInputChange}
              name="title"
            />
            {formErrors.title && (
              <p className="form-error">{formErrors.title}</p>
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

export default ChapterTitleForm;
