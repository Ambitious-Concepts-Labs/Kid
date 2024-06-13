import React from "react";
import { createCourse } from "../../utils/courseFunctions";

const Confirm = ({ prevStep, values, state }) => {
  const {
    courseName,
    courseDescription,
    courseContent,
    classNum,
    courseInstructor,
    subject,
    gradeLevel,
  } = values;
  const { currentUser, history, setCheckUser } = state;

  const submitForm = (e) => {
    e.preventDefault();
    createCourse({ currentUser, setCheckUser, newCourse: values, history });
    alert("Form submitted!");
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form>
      <h2>Confirm your details</h2>
      <ul>
        <li>
          <strong>Class Name:</strong> {classNum}
        </li>
        <li>
          <strong>Course Name:</strong> {courseName}
        </li>
        <li>
          <strong>Course Description:</strong> {courseDescription}
        </li>
        <li>
          <strong>Course Instructor:</strong> {courseInstructor}
        </li>
        <li>
          <strong>Course Content:</strong> {courseContent}
        </li>
        <li>
          <strong>Subject:</strong> {subject}
        </li>
        <li>
          <strong>Grade Level:</strong> {gradeLevel}
        </li>
      </ul>
      <button onClick={goBack}>Back</button>
      <button onClick={submitForm}>Submit</button>
    </form>
  );
};

export default Confirm;
