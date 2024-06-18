import Dashboard from "../components/Icons/Dashboard";
import Profile from "../components/Icons/Profile";
import Assessments from "../components/Icons/Assessments";
import Suggestions from "../components/Icons/Suggestions";
import Zoom from "../components/Icons/Zoom";
import ThankYou from "../components/Icons/ThankYou";

const teacherRoutes = [
  { name: "Dashboard", icon: "", path: "/dashboard" },
  { name: "Dashboard", icon: "", path: "/dash" },
  { name: "Profile", icon: "", path: "/profile" },
  { name: "Assesments", icon: "", path: "/assesment" },
  { name: "Suggestions", icon: "", path: "/suggestions" },
  { name: "TeacherCourses", icon: "", path: "/course/teacher/:username/all" },
  { name: "ViewStudents", icon: "", path: "/course/:id/students" },
  { name: "Create Course", icon: "", path: "/admin/course/new" },
  { name: "Assign Course", icon: "", path: "/admin/assigncourse" },
  { name: "Pending Courses", icon: "", path: "/admin/pendingcourses" },
  { name: "Pending Items", icon: "", path: "/admin/pendingitems" },
  { name: "Pending Items", icon: "", path: "/admin/pendingitems" },
  { name: "ForPayment Items", icon: "", path: "/admin/forpayment" },
  { name: "Completeditems Items", icon: "", path: "/admin/completeditems" },
];

const adminRoutes = [
  { name: "Dashboard", icon: <Dashboard fill="white" page="dashboard" />, path: "/dashboard" },
  { name: "Profile", icon: <Profile page="profile" />, path: "/profile" },
  { name: "Assesments", icon: <Assessments page="assessments" />, path: "/assesment" },
  { name: "Suggestions", icon: <Suggestions page="suggestions" />, path: "/suggestions" },
  { name: "StudentCourses", icon: "", path: "/course/student/:username/all" },
  { name: "ViewStudents", icon: "", path: "/course/:id/students" },
  { name: "View Teacher Courses", icon: "", path: "/teacher/courses" },
  { name: "Browse Courses", icon: "", path: "/dashboard/courses/browse" },
  { name: "Create Course", icon: "", path: "/admin/course/new" },
  { name: "View All Courses", icon: "", path: "/admin/courses/all" },
  { name: "View Pending Courses", icon: "", path: "/admin/courses/pending" },
  { name: "Create Invoice", icon: "", path: "/admin/invoice/new" },
  { name: "View Pending Invoices", icon: "", path: "/admin/invoices/pending" },
  { name: "View Invoices For Payment", icon: "", path: "/admin/invoices/payment" },
  { name: "View Invoices Completed", icon: "", path: "/admin/invoices/completed" },
];

const studentRoutes = [
  { name: "Dashboard", icon: <Dashboard fill="white" page="dashboard" />, path: "/dashboard" },
  // { name: "Courses", icon: <Dashboard fill="white" page="dashboard" />, path: `/course/student/${currentUser.username}/all` },
  { name: "Profile", icon: <Profile page="profile" />, path: "/profile" },
  { name: "Assesments", icon: <Assessments page="assessments"/>, path: "/assesment" },
  { name: "Suggestions", icon: <Suggestions page="suggestions"/>, path: "/suggestions" },
  { name: "Zoom Sessions", icon: <Zoom page="zoom"/>, path: "/zoom" },
  { name: "Thank You", icon: <ThankYou page="thankyou"/>, path: "/thankyou" },
 
];

export { studentRoutes, teacherRoutes, adminRoutes };