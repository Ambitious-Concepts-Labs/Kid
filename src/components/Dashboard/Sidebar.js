import React, { useState } from "react";
import logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import Dashboard from "../Icons/Dashboard";
import Profile from "../Icons/Profile";
import Assessments from "../Icons/Assessments";
import { GiHeartBeats } from "react-icons/gi";
import { BiSolidPurchaseTagAlt, BiLogoZoom } from "react-icons/bi";
import { TbShoppingCart } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import { GiArchiveResearch } from "react-icons/gi";
import { FaLayerGroup } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdAssignmentAdd } from "react-icons/md";
import { RiPassPendingFill } from "react-icons/ri";

export default function Sidebar({ page, setPage }) {
  const navigate = useNavigate();
  const { currentUser } = useUserData();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAdmin = currentUser?.isAdmin;
  const isTeacher = currentUser?.isTeacher;

  const teacherRoutes = [
    { name: "Dashboard", icon: <Dashboard page="dashboard" />, path: "/dashboard" },
    { name: "Create Course", icon: <Dashboard page="createcourse" />, path: "/dashboard/admin/course/new" },
    { name: "View Courses", icon: <Dashboard page="viewcourses" />, path: `/dashboard/courses/teacher/${currentUser?.username}/all` },
    { name: "Profile", icon: <Profile page="profile" />, path: "/dashboard/profile" },
    { name: "Assesments", icon: <Assessments page="assesment" />, path: "/dashboard/assesment" },
    { name: "Suggestions", icon: <VscFeedback page="suggestions" />, path: "/dashboard/suggestions" },
    { name: "Create Zoom-Sessions", icon: <BiLogoZoom page="zoom" />, path: "/dashboard/zoom" },
    { name: "My Zoom-Sessions", icon: <BiLogoZoom page="zoom" />, path: "/dashboard/zoom/mymeetings" },
  ];

  const studentRoutes = [
    { name: "Dashboard", icon: <Dashboard page="dashboard" />, path: "/dashboard" },
    { name: "My Courses", icon: <FaLayerGroup page="my courses" />, path:`/dashboard/courses/student/${currentUser?.username}/all` },
    { name: "Browse Courses", icon: <GiArchiveResearch page="my courses" />, path: `/dashboard/courses/browse` },
    // { name: "Order History", icon: <BiSolidPurchaseTagAlt page="orderhistory" />, path: `/dashboard/transactions` },
    // { name: "Products", icon: <TbShoppingCart page="products" />, path: `/dashboard/products` },
    { name: "My Profile", icon: <RiPassPendingFill page="profile" />, path: "/dashboard/profile" },
    // { name: "Assesments", icon: <Assessments page="Pre and Post assesment" />, path: "/dashboard/assesment" },
    // { name: "Suggestions", icon: <VscFeedback page="suggestions" />, path: "/dashboard/suggestions" },
    { name: "Create Zoom-Sessions", icon: <BiLogoZoom page="zoom" />, path: "/dashboard/zoom" },
    { name: "My Zoom-Sessions", icon: <BiLogoZoom page="zoom" />, path: "/dashboard/zoom/mymeetings" },
    // { name: "Thank You", icon: <GiHeartBeats page="thankyou" />, path: "/dashboard/thankyou" },
  ];
  
  const adminRoutes = [
    { name: "Dashboard", icon: <RiPassPendingFill />, path: "/dashboard" },
    { name: "All Courses", icon: <RiPassPendingFill />, path: "/dashboard/courses/browse" },
    { name: "Teacher Courses", icon: <RiPassPendingFill />, path: "/dashboard/teacher/courses" },
    { name: "Create Course", icon: <IoIosCreate />, path: "/dashboard/admin/course/new" },
    { name: "Assign Teacher", icon: <MdAssignmentAdd page="assigncourse" />, path: "/dashboard/admin/course/assign" },
    { name: "Assign Student", icon: <MdAssignmentAdd page="assigncourse" />, path: "/dashboard/admin/student/course/assign" },
    { name: "Pending Courses", icon: <RiPassPendingFill />, path: "/dashboard/admin/courses/pending" },
    { name: "Delete Courses", icon: <RiPassPendingFill />, path: "/dashboard/admin/courses/delete" },
    { name: "Create Invoice", icon: <RiPassPendingFill />, path: "/dashboard/admin/invoice/new" },
    { name: "View Invoices", icon: <RiPassPendingFill />, path: "/dashboard/admin/invoices/all" },
    { name: "User Profile", icon: <RiPassPendingFill />, path: "/dashboard/profile" },
    { name: "Create Zoom-Sessions", icon: <BiLogoZoom page="zoom" />, path: "/dashboard/zoom" },
    { name: "My Zoom-Sessions", icon: <BiLogoZoom page="zoom" />, path: "/dashboard/zoom/mymeetings" },
    { name: "Assesments", icon: <Assessments page="assessments" />, path: "/dashboard/assesment" },
    { name: "Suggestions", icon: <RiPassPendingFill />, path: "/dashboard/suggestions" },
];


  const routes = isAdmin
    ? adminRoutes
    : isTeacher
    ? teacherRoutes
    : studentRoutes;

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleOnClick = (route) => {
    console.log('route', route, page)
    const routeName = route.name.charAt(0).toUpperCase() + route.name.slice(1);
    setPage(routeName);
    navigate(route.path);
  };

  return (
    <>
      <div
        className={`w-[17%] min-w-[200px] flex flex-col items-start p-6 bg-[#C33B4C] text-white text-sm transition-transform duration-300 md:block ${
          isMobileOpen ? "fixed inset-0 z-50" : "hidden md:flex"
        }`}
      >
        <img src={logo} alt="" className="h-20 mb-6" />
        {routes.map((route) => (
          <div
            key={route.name}
            className={`flex items-center w-full pl-8 pr-5 py-1.5 rounded-md mb-4 ${page ===
              route.name.toLowerCase() &&
              "bg-[#F2E4E6] text-[#C33B4C]"} cursor-pointer hover:opacity-50`}
            onClick={() => handleOnClick(route)}
          >
            {route.icon}
            <span className="ml-2">{route.name}</span>
          </div>
        ))}
      </div>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 rounded-md bg-[#C33B4C] text-white"
          onClick={handleMobileToggle}
        >
          {isMobileOpen ? "Close" : "Menu"}
        </button>
      </div>
    </>
  );
}
