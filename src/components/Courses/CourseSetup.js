import React from "react";
import TitleForm from "../Form/Course/TitleForm";
import DescriptionForm from "../Form/Course/DescriptionForm";
import ImageForm from "../Form/Course/ImageForm";
import CategoryForm from "../Form/Course/CategoryForm";
import PriceForm from "../Form/Course/PriceForm";
import AttachmentForm from "../Form/Course/AttachmentForm";
import IconBadge from "../IconBadge";
import { LuLayoutDashboard, LuListChecks } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import ChaptersForm from "../Form/Course/ChaptersForm";
import Actions from "../Actions";

const CourseSetup = ({
  course,
  completionText,
  isComplete,
  id,
  categories,
  currentUser,
  setEdit,
  history,
  deleteCourse,
  isPending,
  isInTransactions,
  isCourseDenied,
  isForPayment,
  isOwned,
  requestCourse,
  setLoading,
  ...props
}) => {
  return (
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
                      <h2 className="text-xl">Resources & Attachments</h2>
                    </div>
                    <AttachmentForm initialData={course} courseId={id} />
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
  );
};

export default CourseSetup;
