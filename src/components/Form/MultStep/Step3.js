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
    <form>
      <h2>Step 3: Course Details</h2>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          className="form-control"
          id="Subject"
          required
          value={values.subject}
          onChange={handleChange("subject")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gradeLevel">Grade Level</label>
        <input
          type="text"
          className="form-control"
          id="gradeLevel"
          required
          value={values.gradeLevel}
          onChange={handleChange("gradeLevel")}
        />
      </div>
      <br />
      <button onClick={goBack}>Back</button>
      <button onClick={continueStep}>Next</button>
    </form>
  );
};

export default Step3;
