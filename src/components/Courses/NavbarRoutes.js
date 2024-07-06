import React from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logout } from "../../lib/firebase";


// Mock SearchInput component
const SearchInput = () => (
  <input
    type="text"
    placeholder="Search for a course"
    className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
  />
);

// Mock Button component
const Button = ({ children, size, variant, onClick }) => (
  <button onClick={onClick} className={`btn ${size} ${variant}`}>
    {children}
  </button>
);

const NavbarRoutes = ({currentUser}) => {
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
      <div className="flex gap-x-2 ml-auto w-[100%] justify-evenly">
        {isTeacherPage || isCoursePage ? (
          <Button size="sm" variant="ghost" onClick={handleExit}>
            <span className="h-4 w-4 mr-2">🔙</span>
            Exit
          </Button>
        ) : currentUser.isTeacher ? (
          <Button size="sm" variant="ghost" onClick={handleTeacherMode}>
            Teacher mode
          </Button>
        ) : null}
        <Button size="sm" variant="ghost" onClick={logout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default NavbarRoutes;
