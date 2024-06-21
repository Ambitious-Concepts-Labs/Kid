import React, { useState } from "react";
import { CourseProgress } from "./CourseProgress";
import CourseSidebarItem from "./CourseSidebarItem";
import { mockPurchase } from "../../constants/mockData";

const CourseSidebar = ({ setChapterId, course, currentUser, progressCount, courseId }) => {
  const purchasedCourse = currentUser?.courses.find(
    (userCourse) => userCourse.id === course.id
  );
  const [purchase, setPurchase] = useState(purchasedCourse || mockPurchase);


  console.log(course.chapters)
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
        {course.chapters &&
          course?.chapters.map((chapter) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={courseId}
              // isLocked={!chapter.isFree && !purchase}
              isLocked={!chapter.isFree}
              setChapterId={setChapterId}
            />
          ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
