import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { approve, deny } from "../../../utils/courseFunctions";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Layout from "../../../components/Dashboard/Layout";

const User = (props) => {
  const { currentUser } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [userid, setUserId] = useState("");
  const [courseid, setCourseId] = useState("");
  const [pendingCourse, setPendingCourse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = location.pathname;
    const regex = /\/user\/([^/]+)\/pendingcourse\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      const userId = match[1];
      const courseId = match[2];
      setUserId(userId);
      setCourseId(courseId);
      console.log(`User ID: ${userId}`);
      console.log(`Course ID: ${courseId}`);
    } else {
      console.log("No match found");
    }
  }, [courseid, userid]);

  const getUserPendingCourses = async (id) => {
    const docRef = await getDoc(doc(db, "courses", id));
    return { ...docRef.data(), courseId: id };
  };

  useEffect(() => {
    const fetchPendingCourses = async () => {
      if (currentUser) {
        const pendingCoursesData = await getUserPendingCourses(courseid);
        setPendingCourse(pendingCoursesData);
        setLoading(false);
      }
    };

    fetchPendingCourses();
  }, [loading, currentUser, userid, courseid]);

  if (!loading) {
    return (
      <Layout>
        <div
          id="pending-course"
          className="flex justify-center items-center min-h-screen"
        >
          <div className="card text-center w-full max-w-lg mx-4 sm:mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="card-body">
              <h5 className="card-title text-2xl font-bold mb-4">
                User: {currentUser.username}
              </h5>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="col-span-1 font-medium">
                  Course Class Number:
                </div>
                <div className="col-span-1">{pendingCourse.classNum}</div>
                <div className="col-span-1 font-medium">Course Name:</div>
                <div className="col-span-1">{pendingCourse.courseName}</div>
              </div>
              <div className="mt-6">
                <button
                  className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                  onClick={() => {
                    approve({ ...props, pendingCourse, navigate });
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                  onClick={() => {
                    deny({ ...props, pendingCourse, navigate });
                  }}
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default User;
