import React, { useState } from "react";
import { mutateFireStoreDoc } from "../../../lib/firebase";

const TitleForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.courseName);
  const [inputValue, setInputValue] = useState(initialData.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsValid(value.trim().length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await mutateFireStoreDoc("courses", courseId, { courseName: inputValue });

      setTitle(inputValue);
      alert("Course updated successfully");
      toggleEdit();
      window.location.reload();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Name
        <button
          className="bg-transparent border-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit Name
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <p className="text-sm mt-2">{title}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="e.g 'Advanced web development'"
              className="w-full p-2 border rounded"
            />
            {!isValid && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TitleForm;
