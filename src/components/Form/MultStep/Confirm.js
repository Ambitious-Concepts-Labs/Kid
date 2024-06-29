import React from "react";
import { createCourse } from "../../../utils/courseFunctions";

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
  const { currentUser, history, setCheckUser, user } = state;

  const submitForm = (e) => {
    e.preventDefault();
    createCourse({
      currentUser,
      setCheckUser,
      newCourse: values,
      history,
      user,
    });
    alert("Form submitted!");
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="container mt-5">
      <form className="shadow p-4 rounded bg-white">
        <h2 className="mb-4 text-center">Confirm Your Details</h2>
        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Class Number:</strong> {classNum}
          </li>
          <li className="list-group-item">
            <strong>Course Name:</strong> {courseName}
          </li>
          <li className="list-group-item">
            <strong>Course Description:</strong> {courseDescription}
          </li>
          <li className="list-group-item">
            <strong>Course Instructor:</strong> {courseInstructor}
          </li>
          <li className="list-group-item">
            <strong>Course Content:</strong> {courseContent}
          </li>
          <li className="list-group-item">
            <strong>Subject:</strong> {subject}
          </li>
          <li className="list-group-item">
            <strong>Grade Level:</strong> {gradeLevel}
          </li>
        </ul>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={goBack}>
            Back
          </button>
          <button className="btn btn-success" onClick={submitForm}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Confirm;
