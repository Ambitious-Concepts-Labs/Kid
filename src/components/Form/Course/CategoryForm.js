import React, { useState } from "react";
import { mutateFireStoreDoc } from "../../../lib/firebase";

const CategoryForm = ({ initialData, courseId, options }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setCategoryId(value);
    setIsValid(value.trim().length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      await mutateFireStoreDoc("courses", courseId, { categoryId });

      alert("Course updated successfully");
      toggleEdit();
      window.location.reload();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedOption = options.find((option) => option.value === categoryId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <button
          className="bg-transparent border-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit Category
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <p className={`text-sm mt-2 ${!categoryId && "text-slate-500 italic"}`}>
          {selectedOption?.label || "No Category"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <select
              value={categoryId}
              onChange={handleSelectChange}
              disabled={isSubmitting}
              className="w-full p-2 border rounded"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {!isValid && (
              <p className="text-red-500 text-sm">Category is required</p>
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

export default CategoryForm;
