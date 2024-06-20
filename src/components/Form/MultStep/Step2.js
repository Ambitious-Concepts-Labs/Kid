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
    <div className="container mt-5">
      <form className="shadow p-4 rounded bg-white">
        <h2 className="mb-4 text-center">Step 2: Instructor Information</h2>
        <div className="form-group mb-4">
          <label htmlFor="courseInstructor" className="form-label">
            Instructor:
          </label>
          <br />
          <input
            type="text"
            className="form-control border border-secondary"
            id="courseInstructor"
            required
            value={values.courseInstructor}
            onChange={handleChange("courseInstructor")}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={goBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={continueStep}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
