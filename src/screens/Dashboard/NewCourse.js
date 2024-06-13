import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../utils/courseFunctions";
import Layout from "../../components/Dashboard/Layout";
import StepForm from "../../components/Form/StepForm";

const NewCourse = (props) => {
	const history = useNavigate();
	const { currentUser, loading } = props;
	const [newCourse, setNewCourse] = useState({
		num_of_students: 0,
		type: "course",
	});
	const state = { currentUser, history, newCourse, setNewCourse };
	if (loading || !currentUser) return <h1>Loading...</h1>;

	return (
    <Layout>
      <h1>Create a New Course</h1>
      <StepForm state={state} />
      <div id="course" style={{ width: "50%", margin: "auto" }}>
        <div className="form-group">
          <label htmlFor="classNum">Class Number</label>
          <input
            type="text"
            className="form-control"
            id="classNum"
            required
            onChange={(e) => {
              setNewCourse({ ...newCourse, class_number: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            required
            onChange={(e) => {
              setNewCourse({ ...newCourse, course_name: e.target.value });
            }}
          />
        </div>
        {currentUser.isAdmin && (
          <div className="form-group">
            <label htmlFor="courseInstructor">Instructor</label>
            <input
              type="text"
              className="form-control"
              id="courseInstructor"
              required
              onChange={(e) => {
                setNewCourse({ ...newCourse, instructor: e.target.value });
              }}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="Subject"
            required
            onChange={(e) => {
              setNewCourse({ ...newCourse, subject: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gradeLevel">Grade Level</label>
          <input
            type="text"
            className="form-control"
            id="gradeLevel"
            required
            onChange={(e) => {
              setNewCourse({ ...newCourse, grade_level: e.target.value });
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            createCourse({ currentUser, newCourse, history });
          }}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default NewCourse;
