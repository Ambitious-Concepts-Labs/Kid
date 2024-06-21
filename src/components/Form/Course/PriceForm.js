import React, { useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const PriceForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(initialData?.price || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setPrice(value);
    setIsValid(value.trim().length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const courseDoc = doc(db, "courses", courseId);

      await updateDoc(courseDoc, {
        price: parseFloat(price),
      });

      alert("Course updated successfully");
      toggleEdit();
      window.location.reload();
    } catch (error) {
      alert("Something went wrong");
      console.error("Error updating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <button
          className="bg-transparent border-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">✏️</span>
              Edit Price
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <p className={`text-sm mt-2 ${!price && "text-slate-500 italic"}`}>
          {price ? `$${price.toFixed(2)}` : "No Price"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Set a price for your course"
              className="w-full p-2 border rounded"
            />
            {!isValid && (
              <p className="text-red-500 text-sm">Price is required</p>
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

export default PriceForm;
