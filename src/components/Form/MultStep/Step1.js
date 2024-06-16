import React from "react";

const Step1 = ({ nextStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form>
      <h2>Step 1: Course Information</h2>
      <div className="form-group">
        <label htmlFor="classNum">Class Number:</label>
        <input
          type="text"
          className="form-control"
          id="classNum"
          required
          value={values.classNum}
          onChange={handleChange("classNum")}
        />
      </div>
      <label>
        Course Name:
        <input
          type="text"
          value={values.courseName}
          onChange={handleChange("courseName")}
        />
      </label>
      <div className="form-group">
        <label>
          Course Description:
          <textarea
            value={values.courseDescription}
            onChange={handleChange("courseDescription")}
          />
        </label>
      </div>
      <br />
      <button onClick={continueStep}>Next</button>
    </form>
  );
};

export default Step1;
