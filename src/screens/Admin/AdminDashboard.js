import React from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "../../components/all";
// chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
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
  studentLineOptions,
  studentDoughnutData,
  studentBarData,
} from "../../utils/chartJsOptions";
import Student from "../../components/Icons/Student";
import Earnings from "../../components/Icons/Earnings";
import Layout from "../../components/Dashboard/Layout";
import Character from "../../components/SVG/Character";
import Circle from "../../components/SVG/Circle";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useGetAllTransactions from "../../hooks/useGetAllTransactions";
import useGetAllCourses from "../../hooks/useGetAllCourses";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function AdminDashboard(props) {
  console.log(props);
  const { currentUser, loading } = props;
  const { courses, isLoading, error } = useGetAllCourses();
  const { users } = useGetAllUsers();
  const { transactions } = useGetAllTransactions();
  const [totalStudents, setTotalStudents] = React.useState(0);
  const [totalTeachers, setTotalTeachers] = React.useState(0);
  const [totalParents, setTotalParents] = React.useState(0);
  const [totalEarnings, setTotalEarnings] = React.useState(0);
  const [pendingInvoices, setPendingInvoices] = React.useState(0);
  const [forPayments, setForPayments] = React.useState(0);
  const [totalInvoices, setTotalInvoices] = React.useState(0);
  const [enrolledStudents, setEnrolledStudents] = React.useState(0);
  const [instructingCourses, setInstructingCourses] = React.useState(0);
  const [enrolledCourses, setEnrolledCourses] = React.useState(0);

  React.useEffect(() => {
    if (users) {
      const students = users.filter((user) => user.isStudent);
      const teachers = users.filter((user) => user.isTeacher);
      const parents = users.filter((user) => user.isParent);
      setTotalStudents(students.length);
      setTotalTeachers(teachers.length);
      setTotalParents(parents.length);

      let earnings = 0;
      transactions.map(
        (transaction) => (earnings += parseFloat(transaction.cart.total_price))
      );
      setTotalEarnings(earnings);

      let pendingInvoices = [];
      users.map((user) => pendingInvoices.push(user.pendingInvoices));
      setPendingInvoices(pendingInvoices);

      let forPayments = [];
      users.map((user) => forPayments.push(user.forPaymentCourses));
      setForPayments(forPayments);

      let totalInvoices = [];
      users.map((user) => totalInvoices.push(user.transactions));
      setTotalInvoices(totalInvoices);

      let enrolledStudentsCount = 0;
      let instructingCoursesCount = 0;
      let enrolledCoursesCount = 0;
      courses.map((course) => {
        if (course.instructor === currentUser.id) {
          enrolledStudentsCount =
            enrolledStudentsCount + course.num_of_students;
          instructingCoursesCount++;
          enrolledCoursesCount =
            enrolledCoursesCount + parseFloat(course.price);
          if (course.students) {
            enrolledStudentsCount =
              enrolledStudentsCount + course.students.length;
          }
        }
        return { enrolledStudentsCount, instructingCoursesCount };
      });
      setEnrolledStudents(enrolledStudentsCount);
      setInstructingCourses(instructingCoursesCount);
    }
  }, [users]);

  const navigate = useNavigate();

  const isStudent = () => {
    const gradeData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          fill: false,
          lineTension: 0.5,
          data: [75, 90, 80, 85, 90, 86, 88, 92, 96, 84, 83, 96],
          borderColor: "#F38315",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
        {
          fill: false,
          lineTension: 0.5,
          data: [80, 83, 83, 84, 89, 89, 100, 80, 88, 92, 93, 93],
          borderColor: "#C33B4C",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    };
    return (
      <>
        <div className="mt-4 flex justify-between flex-wrap">
          <div className="h-28 flex w-full xl:w-[50%] mt-4">
            <div className="h-full flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Total Classes
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {currentUser.courses ? currentUser.courses.length : 0}
                </Components.Paragraph>
              </div>
              <Reader />
            </div>
            <div className="h-full ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Total Assessments
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {currentUser.assessments ? currentUser.assessments.length : 0}
                </Components.Paragraph>
              </div>
              <Teacher />
            </div>
          </div>
          <div className="h-28 flex w-full xl:w-[50%] mt-3 xl:mt-4">
            <div className="h-full xl:ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Total Tutoring Sessions
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {currentUser.tutoringSessions
                    ? currentUser.tutoringSessions.length
                    : 0}
                </Components.Paragraph>
              </div>
              <Group />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between flex-wrap">
          <div className="h-96 w-full xl:w-[60%] mt-4 bg-white flex flex-col p-4 rounded-md shadow">
            <div className="flex justify-between">
              <Components.Paragraph className="!text-lg !font-bold">
                Course Progress
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
                  options={studentLineOptions}
                  data={gradeData}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="h-96 w-full xl:w-auto flex-1 mt-3 xl:mt-4 xl:ml-4 bg-white flex flex-col p-4 rounded-md shadow">
            <div className="flex justify-between">
              <Components.Paragraph className="!text-lg !font-bold">
                Classes
              </Components.Paragraph>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden">
              <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
                <Doughnut
                  options={doughnutOptions}
                  data={studentDoughnutData(currentUser.courses)}
                />
                <div className="absolute text-center font-medium text-xl mb-7">
                  Current Classes <br />{" "}
                  {currentUser.courses.length ? currentUser.courses.length : 0}{" "}
                  <br />
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
              {currentUser.announcements.students ||
              currentUser.announcements.students !== undefined ? (
                currentUser.announcements.students.map((announcement) => (
                  <div className="flex items-center p-2">
                    <Student />
                    <div className="flex flex-col items-start px-3">
                      <Components.Paragraph>
                        {announcement.msg}
                      </Components.Paragraph>
                      <Components.Paragraph
                        className={"text-[#A7AFB2] !text-sm mt-1"}
                      >
                        {announcement.from} Upload {announcement.sinceCreation}
                      </Components.Paragraph>
                    </div>
                    <div className="p-2 px-5 bg-[#A7AFB2] ml-auto rounded-full text-[#C33B4C] bg-opacity-40">
                      {announcement.createdAt}
                    </div>
                  </div>
                ))
              ) : (
                <>No Announcements</>
              )}
            </div>
          </div>
          <div className="h-96 w-full xl:w-auto flex-1 mt-3 xl:mt-4 xl:ml-4 bg-white flex flex-col p-4 rounded-md shadow">
            {/* heading and select */}
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
                <Bar options={barOptions} data={studentBarData} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const isAdmin = () => {
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
                  {totalStudents}
                </Components.Paragraph>
              </div>
              <Reader />
            </div>
            <div className="h-full ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Total Teacher
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {totalTeachers}
                </Components.Paragraph>
              </div>
              <Teacher />
            </div>
          </div>
          <div className="h-28 flex w-full xl:w-[50%] mt-3 xl:mt-4">
            <div className="h-full xl:ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Total Parents
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {totalParents}
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
                  $&nbsp;{totalEarnings}
                </Components.Paragraph>
              </div>
              <Earnings />
            </div>
          </div>
          <div className="h-28 flex w-full xl:w-[50%] mt-3 xl:mt-4">
            <div className="h-full xl:ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Total Courses
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
                  Pending Invoices
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {pendingInvoices.length}
                </Components.Paragraph>
              </div>
              <Earnings />
            </div>
          </div>
          <div className="h-28 flex w-full xl:w-[50%] mt-3 xl:mt-4">
            <div className="h-full xl:ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Pending For Payments
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {forPayments.length}
                </Components.Paragraph>
              </div>
              <Group />
            </div>
            <div className="h-full ml-3 flex-1 bg-white flex p-4 rounded-md shadow">
              <div className="flex-col items-start text-left h-full">
                <Components.Paragraph className="!font-[Grandstander]">
                  Completed Invoices
                </Components.Paragraph>
                <Components.Paragraph className="!font-[Grandstander] !text-xl mt-5">
                  {totalInvoices.length}
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
                  Total of <br /> {totalStudents} <br /> Students
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
              currentUser.announcements.admins > 0 ? (
                currentUser.announcements.admins.map((announcement) => (
                  <div className="flex items-center p-2">
                    <Student />
                    <div className="flex flex-col items-start px-3">
                      <Components.Paragraph>
                        {announcement.msg}
                      </Components.Paragraph>
                      <Components.Paragraph
                        className={"text-[#A7AFB2] !text-sm mt-1"}
                      >
                        {announcement.from} {announcement.sinceCreation}
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

  const isTeacher = () => {
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
  if (loading || !currentUser) return <h1>Loading...</h1>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="p-4 flex-1 flex flex-col h-full overflow-auto">
        <div className="relative flex bg-white py-3 px-8 items-center rounded-md shadow">
          <div className="flex flex-col items-start">
            <Components.SubHeading className="!text-2xl">
              Welcome Back{" "}
              <span className="text-[#F38315]">{currentUser.name}!</span>
            </Components.SubHeading>
            <Components.Paragraph className="!font-[Grandstander]">
              Have a nice day!
            </Components.Paragraph>
          </div>
          <Character />
          <Circle />
        </div>
        {currentUser.isStudent
          ? isStudent()
          : currentUser.isAdmin
          ? isAdmin()
          : isTeacher()}
      </div>
    </Layout>
  );
}
