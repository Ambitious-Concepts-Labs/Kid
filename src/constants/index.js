import Dashboard from "../components/Icons/Dashboard";
import Profile from "../components/Icons/Profile";
import Assessments from "../components/Icons/Assessments";
import Suggestions from "../components/Icons/Suggestions";
import Zoom from "../components/Icons/Zoom";
import ThankYou from "../components/Icons/ThankYou";
import { IoIosCreate } from "react-icons/io";
import { MdAssignmentAdd } from "react-icons/md";
import { RiPassPendingFill } from "react-icons/ri";

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
  { name: "Create Course", icon: <IoIosCreate />, path: "/dashboard/admin/course/new" },
  { name: "Assign Course", icon: <MdAssignmentAdd page="assigncourse" />, path: "/dashboard/admin/course/assign" },
  { name: "View Pending Courses", icon: <RiPassPendingFill />, path: "/dashboard/admin/courses/pending" },
  { name: "Profile", icon: <Profile page="profile" />, path: "/profile" },
  { name: "Assesments", icon: <Assessments page="assessments" />, path: "/assesment" },
  { name: "Suggestions", icon: <Suggestions page="suggestions" />, path: "/suggestions" },
  { name: "StudentCourses", icon: "", path: "/course/student/:username/all" },
  { name: "ViewStudents", icon: "", path: "/course/:id/students" },
  { name: "View Teacher Courses", icon: "", path: "/teacher/courses" },
  { name: "Browse Courses", icon: "", path: "/dashboard/courses/browse" },
  { name: "View All Courses", icon: "", path: "/admin/courses/all" },
  { name: "Create Invoice", icon: "", path: "/admin/invoice/new" },
  { name: "View Pending Invoices", icon: "", path: "/admin/invoices/pending" },
  { name: "View Invoices For Payment", icon: "", path: "/admin/invoices/payment" },
  { name: "View Invoices Completed", icon: "", path: "/admin/invoices/completed" },
  { name: "Pending Items", icon: <Dashboard page="pendingitems" />, path: "/dashboard/admin/pendingitems" },
  { name: "For Payment Items", icon: <Dashboard page="forpayment" />, path: "/dashboard/admin/forpayment" },
  { name: "Completed Items", icon: <Dashboard page="completeditems" />, path: "/dashboard/admin/completeditems" },
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