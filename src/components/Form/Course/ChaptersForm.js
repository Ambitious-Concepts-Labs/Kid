import React, { useState } from "react";
import ChaptersList from "../../ChaptersList";
import { FiPlusCircle } from "react-icons/fi";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

// Input component
const Input = ({ disabled, placeholder, ...props }) => (
  <input
    disabled={disabled}
    placeholder={placeholder}
    className="input-class" // Add your input styles here
    {...props}
  />
);

// Button component
const Button = ({ variant, onClick, children, disabled, type }) => (
  <button
    className={`button-class ${variant}`} // Add your button styles here
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

// Loader2 component (simple spinner)
const Loader2 = ({ className }) => (
  <div className={className}>
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  </div>
);


// Validation function
const validateTitle = (title) => {
  if (!title) {
    return "Description is required";
  }
  return null;
};

// Main component
const ChaptersForm = ({ initialData, courseId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formState, setFormState] = useState(initialData.chapters || {});
  const [title, setTitle] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCreating = () => setIsCreating(!isCreating);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setTitle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    const titleError = validateTitle(formState.title);
    if (titleError) {
      validationErrors.title = titleError;
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const courseDoc = doc(db, "courses", courseId);

      await updateDoc(courseDoc, {
        chapters: [...initialData.chapters, title],
      });
      alert("Chapter created successfully");
      toggleCreating();
      window.location.reload();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReorder = async (updateData) => {
    try {
      setIsUpdating(true);
      const courseDoc = doc(db, "courses", courseId);

      await updateDoc(courseDoc, {
        chapters: updateData,
      });
      alert("Chapters Reordered");
      window.location.reload(); // or any other method to refresh
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = (id) => {
    // window.location.href = `/teacher/courses/${courseId}/chapters/${id}`;
    window.location.href = `/course/${courseId}/chapters/${id}`;
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <FiPlusCircle className="h-4 w-4 mr-2" />
              Add a Chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-item">
            <Input
              name="title"
              disabled={isSubmitting}
              placeholder="e.g 'Introduction to the course'"
              value={formState.title}
              onChange={handleChange}
            />
            {errors.title && <p className="form-message">{errors.title}</p>}
          </div>
          <Button disabled={isSubmitting || !!errors.title} type="submit">
            Create
          </Button>
        </form>
      )}
      {!isCreating && (
        <div
          className={`text-sm mt-2 ${!initialData.chapters.length &&
            "text-slate-500 italic"}`}
        >
          {initialData.chapters.length === 0 ?
            "No Chapter"
            :
            <ChaptersList
              onEdit={handleEdit}
              onReorder={handleReorder}
              items={initialData.chapters || []}
            />
          }
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
