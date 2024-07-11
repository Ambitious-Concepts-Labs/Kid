import React, { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { approve, deny } from "../../../utils/courseFunctions";
import Layout from "../../../components/Dashboard/Layout";
import useGetCourseById from "../../../hooks/useGetCouseById";

const PendingCoure = lazy(() => import("../../../components/Courses/PendingCoure"));

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
  
  const { course } = useGetCourseById(courseid);

  useEffect(() => {
    const fetchPendingCourses = async () => {
      if (currentUser) {
        const pendingCoursesData = course.pendingCourses
        setPendingCourse(pendingCoursesData);
        setLoading(false);
      }
    };

    fetchPendingCourses();
  }, [loading, currentUser, userid, courseid]);

  if (!loading) {
    return (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
        <PendingCoure
          pendingCourse={pendingCourse}
          currentUser={currentUser}
          approve={approve}
          deny={deny}
          navigate={navigate}
          {...props}
          />
          </Suspense>
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
