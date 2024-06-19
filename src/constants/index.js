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
];

const adminRoutes = [
  { name: "Dashboard", icon: <Dashboard fill="white" page="dashboard" />, path: "/dashboard" },
  { name: "Create Course", icon: <IoIosCreate />, path: "/dashboard/admin/course/new" },
  { name: "Assign Course", icon: <MdAssignmentAdd page="assigncourse" />, path: "/dashboard/admin/course/assign" },
  { name: "View Pending Courses", icon: <RiPassPendingFill />, path: "/dashboard/admin/courses/pending" },
  { name: "Profile", icon: <Profile page="profile" />, path: "/dashboard/profile" },
  { name: "Assesments", icon: <Assessments page="assessments" />, path: "/dashboard/assesment" },
  { name: "Suggestions", icon: <Suggestions page="suggestions" />, path: "/dashboard/suggestions" },
  { name: "View Invoices", icon: "", path: "/dashboard/admin/invoices/all" },
  { name: "View Teacher Courses", icon: "", path: "/dashboard/teacher/courses" },
  { name: "Browse Courses", icon: "", path: "/dashboard/courses/browse" },
  { name: "Create Invoice", icon: "", path: "/dashboard/admin/invoice/new" },
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