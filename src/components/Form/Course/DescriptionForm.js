import React, { useState } from "react";
import { db, mutateFireStoreDoc } from "../../../lib/firebase";
import { doc } from "firebase/firestore";

const DescriptionForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    initialData?.courseDescription || ""
  );
  const [inputValue, setInputValue] = useState(
    initialData?.courseDescription || ""
  );
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
      const courseDoc = doc(db, "courses", courseId);

      await mutateFireStoreDoc(courseDoc, { courseDescription: inputValue });

      setDescription(inputValue);
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
        Course Description
        <button
          className="bg-transparent border-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit Description
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <p
          className={`text-sm mt-2 ${!description && "text-slate-500 italic"}`}
        >
          {description || "No description"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="e.g 'This course is about...'"
              className="w-full p-2 border rounded"
            />
            {!isValid && (
              <p className="text-red-500 text-sm">Description is required</p>
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

export default DescriptionForm;
