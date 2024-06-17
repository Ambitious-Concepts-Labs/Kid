import React, { useState, useEffect } from "react";
import { CourseProgress } from "./CourseProgress";
import CourseSidebarItem from "./CourseSidebarItem";

// Mock data and functions to simulate authentication and database
const mockUserId = "user123";
const mockCourse = {
  id: "course1",
  title: "Sample Course",
  chapters: [
    {
      id: "chapter1",
      title: "Chapter 1",
      isFree: true,
      userProgress: [{ isCompleted: true }],
    },
    {
      id: "chapter2",
      title: "Chapter 2",
      isFree: false,
      userProgress: [{ isCompleted: false }],
    },
  ],
};
const mockProgressCount = 50;
const mockPurchase = { userId: mockUserId, courseId: mockCourse.id };


const CourseSidebar = () => {
  const [userId, setUserId] = useState(null);
  const [course, setCourse] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    // Simulate authentication
    setUserId(mockUserId);
    // Simulate fetching course data
    setCourse(mockCourse);
    setProgressCount(mockProgressCount);
    setPurchase(mockPurchase);
  }, []);

  if (!userId) {
    // window.location.href = "/";
    // return null;
  }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-[27.5px] flex flex-col border-b">
        <h1 className="font-semibold">{course?.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course?.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
