import React from 'react'
import CourseMobileSidebar from './CourseMobileSidebar';
import NavbarRoutes from './NavbarRoutes';


const CourseNavbar = ({ course, progressCount, currentUser }) => {
  return (
    <div className="w-[80%] p-4 border-b h-[63%] flex justify-around items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
};

export default CourseNavbar