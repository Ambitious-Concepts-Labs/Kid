import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Layout from "../../components/Dashboard/Layout";

const ViewStudent = () => {
  const [courseId, setCourseId] = useState(null);
  const [studentUsername, setStudentUsername] = useState(null);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  const fetchStudent = async () => {
    if (!studentUsername) {
      console.error("Student username is undefined");
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("username", "==", studentUsername)
    );

    try {
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (userData.length > 0) {
        setStudent(userData[0]);
      } else {
        setStudent(null);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [studentUsername]);

  useEffect(() => {
    const url = location.pathname;
    const regex = /\/course\/([^/]+)\/students\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      const courseid = match[1];
      const studentusername = match[2];
      setCourseId(courseid);
      setStudentUsername(studentusername);
      console.log(`Course ID: ${courseid}`);
      console.log(`Student Username: ${studentusername}`);
    } else {
      console.log("No match found");
    }
  }, [courseId, studentUsername]);

  if (!loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center" }}>
          <div
            className="card"
            style={{ width: "50rem", textAlign: "center", margin: "auto" }}
          >
            <div className="card-body">
              <h5 className="card-title">Username: {student.username}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Student</h6>
              <p className="card-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat ipsam, autem quis eaque, officia distinctio, excepturi
                impedit mollitia dolorum voluptatum in maiores voluptas cumque
                aut. Alias quisquam perspiciatis reiciendis harum.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="spinner-border-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default ViewStudent;
