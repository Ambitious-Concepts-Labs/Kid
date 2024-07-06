import React from "react";

const Step1 = ({ nextStep, prevStep, handleChange, values }) => {
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
        <h2 className="mb-4 text-center">Step 1: Course Information</h2>
        <div className="form-group mb-3">
          <label htmlFor="classNum" className="form-label">
            Class Number:
          </label>
          <br />
          <input
            type="text"
            className="form-control border border-secondary"
            id="classNum"
            required
            value={values.classNum}
            onChange={handleChange("classNum")}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="courseName" className="form-label">
            Course Name:
          </label>
          <br />
          <input
            type="text"
            className="form-control border border-secondary"
            id="courseName"
            value={values.courseName}
            onChange={handleChange("courseName")}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="courseDescription" className="form-label">
            Course Description:
          </label>
          <br />
          <textarea
            className="form-control border border-secondary"
            id="courseDescription"
            rows="4"
            value={values.courseDescription}
            onChange={handleChange("courseDescription")}
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

export default Step1;
