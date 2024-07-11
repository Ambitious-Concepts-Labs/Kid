import React, { lazy, Suspense } from "react";
import * as Components from "../../components/all";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import Reader from "../../components/Icons/Reader";
import Teacher from "../../components/Icons/Teacher";
import Group from "../../components/Icons/Group";
import Progression from "../../components/Icons/Progression";
import {
  barData,
  barOptions,
  lineData,
  lineOptions,
  doughnutOptions,
  doughnutData,
} from "../../utils/chartJsOptions";
import Student from "../../components/Icons/Student";
import Earnings from "../../components/Icons/Earnings";

const IsTeacher = ({
  currentUser,
  enrolledStudents,
  instructingCourses,
  courses,
  enrolledCourses,
}) => {
  return (
    <>
      <div className="mt-4 flex justify-between flex-wrap">
        <div className="h-28 flex w-full xl:w-[50%] mt-4">
          <div className="h-full flex-1 bg-white flex p-4 rounded-md shadow">
            <div className="flex-col items-start text-left h-full">
              <Components.Paragraph className="!font-[Grandstander]">
                Total Students
              </Components.Paragraph>
              <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                {enrolledStudents}
              </Components.Paragraph>
            </div>
            <Reader />
          </div>
          <div className="h-full ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
            <div className="flex-col items-start text-left h-full">
              <Components.Paragraph className="!font-[Grandstander]">
                My Courses
              </Components.Paragraph>
              <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                {instructingCourses}
              </Components.Paragraph>
            </div>
            <Teacher />
          </div>
        </div>
        <div className="h-28 flex w-full xl:w-[50%] mt-3 xl:mt-4">
          <div className="h-full xl:ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
            <div className="flex-col items-start text-left h-full">
              <Components.Paragraph className="!font-[Grandstander]">
                All Courses
              </Components.Paragraph>
              <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                {courses.length}
              </Components.Paragraph>
            </div>
            <Group />
          </div>
          <div className="h-full ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
            <div className="flex-col items-start text-left h-full">
              <Components.Paragraph className="!font-[Grandstander]">
                Total Earning
              </Components.Paragraph>
              <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                $ {enrolledCourses}
              </Components.Paragraph>
            </div>
            <Earnings />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between flex-wrap">
        <div className="h-96 w-full xl:w-[60%] mt-4 bg-white flex flex-col p-4 rounded-md shadow">
          <div className="flex justify-between">
            <Components.Paragraph className="!text-lg !font-bold">
              Total Earnings
            </Components.Paragraph>
            <select
              name=""
              id=""
              className="focus:outline-none border border-[#A7AFB2] p-2 rounded text-sm text-[#A7AFB2]"
            >
              <option value="">Filter</option>
            </select>
          </div>
          <div className="flex flex-col flex-1 w-full overflow-hidden">
            <div className="flex mb-5">
              <Components.Paragraph className="!text-sm !text-[#474747]">
                This Year
              </Components.Paragraph>
              <Progression />
              <Components.Paragraph className="!text-sm !text-[#474747]">
                430k
              </Components.Paragraph>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <Line
                options={lineOptions}
                data={lineData}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="h-96 w-full xl:w-auto flex-1 mt-3 xl:mt-4 xl:ml-4 bg-white flex flex-col p-4 rounded-md shadow">
          <div className="flex justify-between">
            <Components.Paragraph className="!text-lg !font-bold">
              Students
            </Components.Paragraph>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden">
            <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
              <Doughnut options={doughnutOptions} data={doughnutData} />
              <div className="absolute text-center font-medium text-xl mb-7">
                Total Students
                <br /> Enrolled
                <br /> {enrolledStudents}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between flex-wrap">
        <div className="h-96 w-full xl:w-[60%] mt-4 bg-white flex flex-col p-4 rounded-md shadow">
          <div className="flex justify-between mb-2">
            <Components.Paragraph className="!text-lg !font-bold">
              Notice board
            </Components.Paragraph>
            <select
              name=""
              id=""
              className="focus:outline-none border border-[#A7AFB2] p-2 rounded text-sm text-[#A7AFB2]"
            >
              <option value="">Filter</option>
            </select>
          </div>
          <div className="flex flex-col flex-1 w-full overflow-hidden">
            {currentUser.announcements &&
            currentUser.announcements.teachers > 0 ? (
              currentUser.announcements.teachers.map((announcement) => (
                <div className="flex items-center p-2">
                  <Student />
                  <div className="flex flex-col items-start px-3">
                    <Components.Paragraph>
                      {announcement.msg}
                    </Components.Paragraph>
                    <Components.Paragraph
                      className={"text-[#A7AFB2] !text-sm mt-1"}
                    >
                      {announcement.from}
                    </Components.Paragraph>
                  </div>
                  <div className="p-2 px-5 bg-[#A7AFB2] ml-auto rounded-full text-[#C33B4C] bg-opacity-40">
                    {announcement.createdAt}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center p-2">
                No Announcements
              </div>
            )}
          </div>
        </div>
        <div className="h-96 w-full xl:w-auto flex-1 mt-3 xl:mt-4 xl:ml-4 bg-white flex flex-col p-4 rounded-md shadow">
          <div className="flex justify-between mb-2">
            <Components.Paragraph className="!text-lg !font-bold">
              Statistics
            </Components.Paragraph>

            <select
              name=""
              id=""
              className="focus:outline-none border border-[#A7AFB2] p-2 rounded text-sm text-[#A7AFB2]"
            >
              <option value="">Filter</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden mt-3">
            <div className="flex-1 w-full overflow-hidden flex items-center justify-center">
              <Bar options={barOptions} data={barData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IsTeacher;
