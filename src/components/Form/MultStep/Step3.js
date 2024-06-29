import React from "react";

const Step3 = ({ nextStep, prevStep, handleChange, values }) => {
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
        <h2 className="mb-4 text-center">Step 3: Course Details</h2>
        <div className="form-group mb-4">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <br />
          <input
            type="text"
            className="form-control border border-secondary"
            id="subject"
            required
            value={values.subject}
            onChange={handleChange("subject")}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="gradeLevel" className="form-label">
            Grade Level
          </label>
          <br />
          <input
            type="text"
            className="form-control border border-secondary"
            id="gradeLevel"
            required
            value={values.gradeLevel}
            onChange={handleChange("gradeLevel")}
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

export default Step3;
