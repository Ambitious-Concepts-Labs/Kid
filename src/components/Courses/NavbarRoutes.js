import React, { useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Mock authentication function
const useAuth = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Replace with actual authentication logic
    const mockUserId = "some-user-id"; // Mock user ID
    setUserId(mockUserId);
  }, []);

  return { userId };
};

// Mock logout function
const logOut = () => {
  // Replace with actual logout logic
  console.log("User logged out");
};

// Mock isTeacher function
const isTeacher = (userId) => {
  return userId === process.env.REACT_APP_TEACHER_ID;
};

// Mock SearchInput component
const SearchInput = () => (
  <input
    type="text"
    placeholder="Search for a course"
    className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
  />
);

// Mock UserButton component
const UserButton = ({ afterSignOutUrl }) => (
  <button onClick={logOut}>
    <span>Log Out</span>
  </button>
);

// Mock Button component
const Button = ({ children, size, variant, onClick }) => (
  <button onClick={onClick} className={`btn ${size} ${variant}`}>
    {children}
  </button>
);

const NavbarRoutes = () => {
  const { userId } = useAuth();
  // const history = useHistory();
  const location = useLocation();

  const pathname = location.pathname;

  const isTeacherPage = pathname.startsWith("/teacher");
  const isCoursePage = pathname.includes("/courses");
  const isSearchPage = pathname === "/search";

  const handleExit = () => {
    // history.push("/");
  };

  const handleTeacherMode = () => {
    // history.push("/teacher/courses");
  };

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Button size="sm" variant="ghost" onClick={handleExit}>
            <span className="h-4 w-4 mr-2">🔙</span>
            Exit
          </Button>
        ) : isTeacher(userId) ? (
          <Button size="sm" variant="ghost" onClick={handleTeacherMode}>
            Teacher mode
          </Button>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
