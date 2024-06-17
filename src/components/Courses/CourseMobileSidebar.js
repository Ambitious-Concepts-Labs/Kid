import React, { useState } from "react";

// Mock components for Menu and CourseSidebar
const MenuIcon = () => <div>Menu Icon</div>;

const CourseSidebar = ({ course, progressCount }) => (
  <div>
    {/* Render the course and progress details here */}
    <h2>{course.title}</h2>
    <p>Progress Count: {progressCount}</p>
    {/* Render chapters */}
    {course.chapters.map((chapter, index) => (
      <div key={index}>
        <h3>{chapter.title}</h3>
        <p>
          User Progress:{" "}
          {chapter.userProgress ? chapter.userProgress.length : 0}
        </p>
      </div>
    ))}
  </div>
);

const Sheet = ({ children }) => <div>{children}</div>;
const SheetContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
const SheetTrigger = ({ children, className, onClick }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const CourseMobileSidebar = ({ course, progressCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden pr-4 hover:opacity-75 transition"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </SheetTrigger>
      {isOpen && (
        <SheetContent className="p-0 bg-white w-72">
          <CourseSidebar course={course} progressCount={progressCount} />
        </SheetContent>
      )}
    </Sheet>
  );
};

export default CourseMobileSidebar;
