import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

// Custom ConfirmModal component
const ConfirmModal = ({ children, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Are you sure?</h2>
            <p className="mt-2 text-sm text-gray-600">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Button component
const Button = ({ onClick, disabled, variant, size, children }) => {
  const classNames = `px-4 py-2 rounded ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${
    variant === "outline"
      ? "border border-blue-500 text-blue-500"
      : variant === "destructive"
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white"
  } ${size === "sm" ? "text-sm" : "text-base"}`;

  return (
    <button onClick={onClick} disabled={disabled} className={classNames}>
      {children}
    </button>
  );
};

const Actions = ({ disabled, courseId, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const courseDoc = doc(db, "courses", courseId);

      await updateDoc(courseDoc, {
        isPublished: !isPublished,
      });
        window.location.reload();
      if (isPublished) {
        // Replace with your API call
        console.log(`Unpublish course: ${courseId}`);
        alert("Course Unpublished");
      } else {
        // Replace with your API call
        console.log(`Publish course: ${courseId}`);
        alert("Course Published");
      }

      // Replace with your refresh logic
      console.log("Refresh page");
    } catch {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      // Replace with your API call
      console.log(`Delete course: ${courseId}`);
      alert("Chapter deleted successfully");
      // Replace with your redirect logic
      console.log("Redirect to /teacher/courses");
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
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={"sm"} disabled={isLoading} variant={"destructive"}>
          <span className="h-4 w-4">🗑</span>
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
