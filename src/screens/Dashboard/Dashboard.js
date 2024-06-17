// Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import { db } from "../../firebase";
import { query, collection, getDoc, doc, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
	const { setCheckUser } = props;
	const [currentUser, setCurrentUser] = useState(null)
	const navigate = useNavigate();

	const fetchUser = async () => {
		try {
			console.log({props})
			// console.log(props.user.uid)
			// const docRef = await getDoc(doc(db, "users", props.user.uid));
			const docRef = await getDoc(doc(db, "users", "5oZ5ta0mgbZSEqCNXftJ"));
			if (docRef) {
				console.log("Document data:", docRef);
				console.log("Document data:", docRef.data());
				setCurrentUser(docRef.data())
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (err) {
		console.error(err);
		alert("An error occured while fetching user data");
		}
	};

	useEffect(() => {
		// if (!props.user) return navigate("/login");
		// if (props.user)	
		fetchUser();
	}, [props.user]);
	
	if (!props.user || !currentUser) return (
		<>
		<h1>Loading...</h1>
		</>
	)
	console.log({currentUser})
	
	return (
    <div id="dashboard">
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <div className={currentUser.isAdmin ? "col-6" : "col"}>
          {currentUser.isAdmin && (
            <h2 style={{ textAlign: "center" }}>Courses</h2>
          )}

          {currentUser.isStudent && (
            <>
              <Link
                className="button btn btn-primary dashboard-link"
                to={`/course/student/${currentUser.username}/all`}
                // onClick={() => {
                // 	setCheckUser(false);
                // }}
              >
                My Courses
              </Link>
              <Link
                className="button btn btn-primary dashboard-link"
                to="/transactions"
                // onClick={() => {
                // 	setCheckUser(false);
                // }}
              >
                My Transactions
              </Link>
            </>
          )}

          {currentUser.isTeacher && (
            <Link
              className="button btn btn-primary dashboard-link"
              to={`/course/teacher/${currentUser.username}/all`}
              // onClick={() => {
              // 	setCheckUser(false);
              // }}
            >
              My Courses
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link
                className="button btn btn-primary dashboard-link"
                to="/admin/courses/pending"
                onClick={() => {
                  setCheckUser(false);
                }}
              >
                Pending Courses
              </Link>
            </>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "2%" }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
