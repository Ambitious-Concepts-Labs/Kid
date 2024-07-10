import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateCourse,
  deleteCourse,
  requestCourse,
} from "../../utils/courseFunctions";
import "./Course.css";
import useUserData from "../../hooks/useUserData";
import Layout from "../../components/Dashboard/Layout";
import Banner from "../../components/Banner";
import useGetCourseById from "../../hooks/useGetCouseById";
import useGetAllCategories from "../../hooks/useGetAllCategories";

const EditCourse = lazy(() => import("./EditCourse"));
const CourseSetup = lazy(() => import("../../components/Courses/CourseSetup"));

const UpdateCourse = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const { isLoggedin, setCheckUser } = props;
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const { currentUser, user } = useUserData();
  const { data: course } = useGetCourseById(id);
  const { categories, error, isLoading } = useGetAllCategories(setLoading);

  useEffect(() => {
    if (course && currentUser) {
      if (currentUser.isStudent || currentUser.id !== course.courseInstructor) {
        history(-1);
      }
    }
  }, [currentUser, course]);

  if (!currentUser) return <>Loading...</>;

  const requiredFields = [
    course.courseName,
    course.courseDescription,
    course.classNum,
    course.courseInstructor,
    course.subject,
    course.gradeLevel,
    course.price,
    course.imageUrl,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field).length;
  const completionText = `${completedFields}/${totalFields} fields completed`;
  const isComplete = requiredFields.every(Boolean);

  let isInTransactions = false;
  let isForPayment = false;
  let isCourseDenied = false;

  if (isLoggedin && currentUser.transactions.length) {
    isInTransactions = currentUser.transactions.some((trans) => {
      if (
        trans.cart.items.some((s) => {
          return s._id === course._id;
        })
      ) {
        return true;
      } else {
        return undefined;
      }
    });
  }
  if (isLoggedin && currentUser.transactions.length) {
    isForPayment = currentUser.transactions.some((trans) => {
      if (
        trans.status === "for payment" &&
        trans.cart.items.some((s) => {
          return s._id === course._id;
        })
      ) {
        return true;
      } else {
        return undefined;
      }
    });
  }

  if (isLoggedin && currentUser.transactions.length) {
    isCourseDenied = currentUser.transactions.some((trans) => {
      if (
        trans.status === "cancelled" &&
        trans.cart.items.some((s) => {
          return s._id === course._id;
        })
      ) {
        return true;
      } else {
        return undefined;
      }
    });
  }
  const isPending = (p) => {
    if (
      currentUser.pendingCourses.some((c) => {
        return c._id === p._id;
      })
    )
      return true;
  };

  const isOwned = (o) => {
    if (
      currentUser.courses.some((c) => {
        return c._id === o._id;
      })
    )
      return true;
  };

  if (isLoading || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!loading) {
    return (
      <Layout>
        {!course.isPublished && (
          <Banner label="This Course is unpublished. It will not be visible to the students" />
        )}
        <div style={{ overflow: "scroll" }}>
          <Suspense fallback={<div>Loading...</div>}>
            {!edit ? (
              <CourseSetup
                course={course}
                completionText={completionText}
                isComplete={isComplete}
                id={id}
                categories={categories}
                currentUser={currentUser}
                setEdit={setEdit}
                history={history}
                deleteCourse={deleteCourse}
                isPending={isPending}
                isInTransactions={isInTransactions}
                isCourseDenied={isCourseDenied}
                isForPayment={isForPayment}
                isOwned={isOwned}
                requestCourse={requestCourse}
                {...props}
              />
            ) : (
              <EditCourse
                course={course}
                currentUser={currentUser}
                setCheckUser={setCheckUser}
                updateCourse={updateCourse}
                updatedCourse={updatedCourse}
                setUpdatedCourse={setUpdatedCourse}
                setEdit={setEdit}
                setLoading={setLoading}
                user={user}
              />
            )}
          </Suspense>
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="spinner-border-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...All</span>
        </div>
      </div>
    );
  }
};

export default UpdateCourse;
