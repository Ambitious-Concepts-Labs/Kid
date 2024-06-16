import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirm from "./Confirm";

const StepForm = ({ state }) => {
  const { newCourse, user } = state;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseName: "",
    classNum: "",
    courseDescription: "",
    courseContent: "",
    courseInstructor: "",
    subject: "",
    gradeLevel: "",
    imageUrl: "",
    userId: user.uid,
    price: "",
    categoryId: "",
    category: "",
    chapters: [],
    attachments: [],
    purchases: [],
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    setFormData({ ...newCourse });
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 3:
      return (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 4:
      return <Confirm state={state} prevStep={prevStep} values={formData} />;
    default:
      return <div>Form submitted successfully!</div>;
  }
};

export default StepForm;
