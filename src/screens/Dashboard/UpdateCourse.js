import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateCourse,
  deleteCourse,
  requestCourse,
} from "../../utils/courseFunctions";
import EditCourse from "./EditCourse";
import "./Course.css";
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
import useGetCouseById from "../../hooks/useGetCouseById";
import useGetAllCategories from "../../hooks/useGetAllCategories";

const UpdateCourse = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const { isLoggedin, setCheckUser } = props;
  const [edit, setEdit] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const { currentUser, user } = useUserData();
  const { course, loading, setLoading } = useGetCouseById(id);
  const { categories, error, isLoading } = useGetAllCategories(setLoading);
 
  useEffect(() => {
    if (course && currentUser) {
      if (currentUser.isStudent || currentUser.id !== course.instructor) {
        history(-1);
      }
    }
  }, [user, currentUser, course]);

  if (!user || !currentUser) return <>Loading...</>;

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
                            <ChaptersForm initialData={course} courseId={id} />
                          </div>
                          <div>
                            <div className="flex items-center gap-x-2">
                              <IconBadge icon={BsCurrencyDollar} />
                              <h2 className="text-xl">Sell your course</h2>
                            </div>
                            <PriceForm initialData={course} courseId={id} />
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
                      <br />
                      <div className="flex justify-around w-100">
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
                                  history(`/dashboard/course/${id}/students`);
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

export default UpdateCourse;
