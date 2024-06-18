import React, { useState } from "react";
import logo from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { adminRoutes } from "../constants/index";
import Dashboard from "../components/Icons/Dashboard";
import Profile from "../components/Icons/Profile";
import Assessments from "../components/Icons/Assessments";
import Suggestions from "../components/Icons/Suggestions";
import Zoom from "../components/Icons/Zoom";
import ThankYou from "../components/Icons/ThankYou";
import { GiClassicalKnowledge, GiHeartBeats } from "react-icons/gi";
import { BiSolidPurchaseTagAlt, BiLogoZoom } from "react-icons/bi";
import { TbShoppingCart } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

export default function Sidebar({ page }) {
  const navigate = useNavigate();
  const { currentUser } = useUserData();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAdmin = currentUser?.isAdmin;
  const isTeacher = currentUser?.isTeacher;

  const teacherRoutes = [
    {
      name: "Dashboard",
      icon: <Dashboard page="dashboard" />,
      path: "/dashboard",
    },
    { name: "Profile", icon: <Profile page="profile" />, path: "/profile" },
    {
      name: "Assesments",
      icon: <Assessments page="assesment" />,
      path: "/assesment",
    },
    {
      name: "Suggestions",
      icon: <Suggestions page="suggestions" />,
      path: "/suggestions",
    },
    {
      name: "View Courses",
      icon: <Dashboard page="viewcourses" />,
      path: `/course/teacher/${currentUser?.username}/all`,
    },
    {
      name: "View Students",
      icon: <Dashboard page="viewstudents" />,
      path: "/course/:id/students",
    },
    {
      name: "Create Course",
      icon: <Dashboard page="createcourse" />,
      path: "/admin/course/new",
    },
    {
      name: "Assign Course",
      icon: <Dashboard page="assigncourse" />,
      path: "/admin/assigncourse",
    },
    {
      name: "Pending Courses",
      icon: <Dashboard page="pendingcourses" />,
      path: "/admin/pendingcourses",
    },
    {
      name: "Pending Items",
      icon: <Dashboard page="pendingitems" />,
      path: "/admin/pendingitems",
    },
    {
      name: "For Payment Items",
      icon: <Dashboard page="forpayment" />,
      path: "/admin/forpayment",
    },
    {
      name: "Completed Items",
      icon: <Dashboard page="completeditems" />,
      path: "/admin/completeditems",
    },
  ];

  const studentRoutes = [
    {
      name: "Dashboard",
      icon: <Dashboard page="dashboard" />,
      path: "/dashboard",
    },
    {
      name: "My Courses",
      icon: <GiClassicalKnowledge page="my courses" />,
      path: `/dashboard/course/student/${currentUser?.username}/all`,
    },
    {
      name: "Order History",
      icon: <BiSolidPurchaseTagAlt page="orderhistory" />,
      path: `/dashboard/transactions`,
    },
    {
      name: "Products",
      icon: <TbShoppingCart page="products" />,
      path: `/dashboard/products`,
    },
    {
      name: "Profile",
      icon: <Profile page="profile" />,
      path: "/dashboard/profile",
    },
    {
      name: "Assesments",
      icon: <Assessments page="assessments" />,
      path: "/dashboard/assesment",
    },
    {
      name: "Suggestions",
      icon: <VscFeedback page="suggestions" />,
      path: "/dashboard/suggestions",
    },
    {
      name: "Zoom Sessions",
      icon: <BiLogoZoom page="zoom" />,
      path: "/dashboard/zoom",
    },
    {
      name: "Thank You",
      icon: <GiHeartBeats page="thankyou" />,
      path: "/dashboard/thankyou",
    },
  ];

  const routes = isAdmin
    ? adminRoutes
    : isTeacher
    ? teacherRoutes
    : studentRoutes;

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
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
            onClick={() => navigate(route.path)}
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
