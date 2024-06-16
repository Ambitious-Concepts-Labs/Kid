import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import StepForm from "../../components/Form/MultStep/StepForm";

const NewCourse = (props) => {
  const history = useNavigate();
  console.log(props)
  const { currentUser, loading, user } = props;
  const [newCourse, setNewCourse] = useState({
    num_of_students: 0,
    type: "course",
    isPublished: false,
  });
  const state = { currentUser, history, newCourse, setNewCourse, user };
  if (loading || !currentUser) return <h1>Loading...</h1>;

  return (
    <Layout>
      <div id="course" style={{ width: "50%", margin: "auto" }}>
        <h1>Create a New Course</h1>
        <StepForm state={state} />
      </div>
    </Layout>
  );
};

export default NewCourse;
