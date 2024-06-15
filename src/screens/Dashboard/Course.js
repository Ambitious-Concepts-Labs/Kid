import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateCourse,
  deleteCourse,
  requestCourse,
} from "../../utils/courseFunctions";
import EditCourse from "./EditCourse";
import imgPlaceholder from "./image-placeholder.png";
import "./Course.css";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import useUserData from "../../hooks/useUserData";
import Layout from "../../components/Dashboard/Layout";
import TitleForm from "../../components/Form/Course/TitleForm";
import DescriptionForm from "../../components/Form/Course/DescriptionForm";
import ImageForm from "../../components/Form/Course/ImageForm";
import CategoryForm from "../../components/Form/Course/CategoryForm";
import PriceForm from "../../components/Form/Course/PriceForm";
import AttachmentForm from "../../components/Form/Course/AttachmentForm";
import IconBadge from "../../components/IconBadge";
import { LuLayoutDashboard, LuListChecks } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import ChaptersForm from "../../components/Form/Course/ChaptersForm";
import Banner from "../../components/Banner";
import Actions from "../../components/Actions";

const Course = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const { isLoggedin, setCheckUser } = props;
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCourseLoaded, setIsCourseLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const { user, currentUser } = useUserData();
  const [categories, setCategories] = useState([]);

  const getCourse = async () => {
    const docRef = await getDoc(doc(db, "courses", id));
    if (!docRef.exists()) {
      console.log("No such document!");
    } else {
      console.log("Document data:", docRef);
      console.log("Document data:", docRef.data());
      setCourse(docRef.data());
    }
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (loading && !isCourseLoaded) {
        console.log(currentUser);
        getCourse();
        setIsCourseLoaded(true);
        setLoading(false);
      }
    }
    return function() {
      unmounted = true;
    };
  }, [loading, isCourseLoaded, id, history]);

  const getCategories = async () => {
    try {
      const dataArr = [];
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((course) => {
        console.log({ course: course.data() });
        const obj = { ...course.data() };
        console.log({ obj });
        dataArr.push(obj);
      });

      if (dataArr.length === 0) {
        console.log("No matching documents.");
        return [];
      }

      return dataArr;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  if (!user || !currentUser) return <>Loading...</>;

  const requiredFields = [
    course.courseName,
    course.courseDescription,
    course.courseContent,
    course.classNum,
    course.courseInstructor,
    course.subject,
    course.gradeLevel,
    course.price,
    course.imageUrl,
    course.category,
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

  if (!loading) {
    return (
      <Layout>
        {!course.isPublished && (
          <Banner label="This Course is unpublished. It will not be visible to the students" />
        )}
        <div style={{ overflow: "scroll" }}>
          {!edit ? (
            <div className="container-fluid p-6">
              <div className="row">
                <div className="col-12">
                  <div className="tile">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">Course Setup</h1>
                        <span className="text-slate-700 text-sm">
                          Complete all fields {completionText}
                        </span>
                      </div>
                      <Actions
                        disabled={!isComplete}
                        courseId={id}
                        isPublished={course.isPublished}
                      />
                    </div>
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <div>
                          <div className="flex items-center gap-x-2">
                            <IconBadge icon={LuLayoutDashboard} />
                            <h2 className="text-xl">Customize your course</h2>
                          </div>
                          <TitleForm initialData={course} courseId={id} />
                          <DescriptionForm initialData={course} courseId={id} />
                          <ImageForm initialData={course} courseId={id} />
                          <CategoryForm
                            initialData={course}
                            courseId={id}
                            options={categories.map((category) => ({
                              label: category.category,
                              value: category.id,
                            }))}
                          />
                        </div>
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center gap-x-2">
                              <IconBadge icon={LuListChecks} />
                              <h2 className="text-xl">Course Chapters</h2>
                            </div>
                            <ChaptersForm
                              initialData={course}
                              courseId={id}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-x-2">
                              <IconBadge icon={BsCurrencyDollar} />
                              <h2 className="text-xl">Sell your course</h2>
                            </div>
                            <PriceForm
                              initialData={course}
                              courseId={id}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-x-2">
                              <IconBadge icon={FaRegFile} />
                              <h2 className="text-xl">
                                Resources & Attachments
                              </h2>
                            </div>
                            <AttachmentForm
                              initialData={course}
                              courseId={id}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="header">{course.courseName}</div>

                      <div className="banner-img">
                        <img src={imgPlaceholder} alt="img-placeholder" />
                      </div>

                      <div className="author">
                        <div className="start">
                          <strong>CLASS NUMBER</strong>
                          {course.classNum}
                        </div>
                        <div className="ends">
                          <strong>INSTRUCTOR</strong>
                          {course.courseInstructor}
                        </div>
                      </div>

                      <div className="stats">
                        <div>
                          <strong>SUBJECT</strong> {course.subject}
                        </div>
                        <div>
                          <strong>GRADE LEVEL</strong> {course.gradeLevel}
                        </div>

                        <div>
                          <strong>STUDENTS ENROLLED</strong>
                          {course.num_of_students || 0}
                        </div>
                      </div>

                      <div className="footer">
                        {!currentUser.isStudent ? (
                          (currentUser.isAdmin ||
                            currentUser._id === course.instructor._id) && (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setEdit(true);
                                }}
                              >
                                Update
                              </button>

                              <button
                                className="btn btn-info"
                                onClick={() => {
                                  history(`/course/${id}/students`);
                                }}
                              >
                                Students
                              </button>

                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteCourse({ ...props, course, history });
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )
                        ) : isPending(course) ? (
                          <button className="btn btn-warning" disabled>
                            Pending
                          </button>
                        ) : isInTransactions ? (
                          isCourseDenied ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                requestCourse({
                                  ...props,
                                  course: course[0],
                                  setLoading,
                                  history,
                                });
                              }}
                            >
                              Request
                            </button>
                          ) : isForPayment ? (
                            <button className="btn btn-secondary" disabled>
                              For Payment
                            </button>
                          ) : isOwned(course) ? (
                            <button className="btn btn-success" disabled>
                              Owned
                            </button>
                          ) : (
                            <button className="btn btn-warning" disabled>
                              Pending
                            </button>
                          )
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              requestCourse({
                                ...props,
                                course,
                                setLoading,
                                history,
                              });
                            }}
                          >
                            Request
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Course;
