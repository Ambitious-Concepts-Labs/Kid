import React, { lazy, Suspense } from "react";
import * as Components from "../../components/all";
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


// Lazy load dashboard components
const StudentDashboard = lazy(() => import('../../components/Dashboard/IsStudent'));
const AdminDashboard = lazy(() => import('../../components/Dashboard/IsAdmin'));
const TeacherDashboard = lazy(() => import('../../components/Dashboard/IsTeacher'));

export default function Dashboard(props) {
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
        <Suspense fallback={<div>Loading dashboard...</div>}>
          {currentUser.isStudent ? (
            <StudentDashboard currentUser={currentUser} />
          ) : currentUser.isAdmin ? (
            <AdminDashboard
              currentUser={currentUser}
              totalStudents={totalStudents}
              totalTeachers={totalTeachers}
              totalParents={totalParents}
              totalEarnings={totalEarnings}
              courses={courses}
              pendingInvoices={pendingInvoices}
              forPayments={forPayments}
              totalInvoices={totalInvoices}
            />
          ) : (
            <TeacherDashboard
              currentUser={currentUser}
              enrolledStudents={enrolledStudents}
              instructingCourses={instructingCourses}
              courses={courses}
              enrolledCourses={enrolledCourses}
            />
          )}
        </Suspense>
      </div>
    </Layout>
  );
}
