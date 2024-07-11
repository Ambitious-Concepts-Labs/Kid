import React, { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Dashboard/Layout";

const StepForm = lazy(() =>
  import("../../../components/Form/MultStep/StepForm")
);

const NewCourse = (props) => {
  const history = useNavigate();
  const { currentUser, loading, user } = props;
  const [newCourse, setNewCourse] = useState({
    num_of_students: 0,
    type: "course",
    isPublished: false,
  });
  const state = { currentUser, history, newCourse, setNewCourse, user };
  if (loading || !currentUser) return <h1>Loading...</h1>;
  if (!currentUser.isAdmin || !currentUser.isTeacher) {
    history("/dashboard");
  }
  return (
    <Layout>
      <div id="course" style={{ margin: "auto" }}>
        <h1>Create a New Course</h1>
        <Suspense fallback={<div>Loading form...</div>}>
          <StepForm state={state} />
        </Suspense>
      </div>
    </Layout>
  );
};

export default NewCourse;
