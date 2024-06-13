import React from "react";

const Step2 = ({ nextStep, prevStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form>
      <h2>Step 2: Instructor Information</h2>
      <div className="form-group">
        <label htmlFor="courseInstructor">Instructor:</label>
        <input
          type="text"
          className="form-control"
          id="courseInstructor"
          required
          value={values.courseInstructor}
          onChange={handleChange("courseInstructor")}
        />
      </div>
      <br />
      <button onClick={goBack}>Back</button>
      <button onClick={continueStep}>Next</button>
    </form>
  );
};

export default Step2;
