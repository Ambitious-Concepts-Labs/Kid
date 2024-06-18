import React from "react";
// import { getProgress } from "@/actions/getProgress";
import CourseNavbar from "./CourseNavbar";
import CourseSidebar from "./CourseSidebar";

export default function CourseLayout({ children }) {
  const { userId } = {};

//   if (!userId) return null;

//   const course = await db.course.findUnique({
//     where: {
//       id: params.courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         include: {
//           userProgress: {
//             where: {
//               userId,
//             },
//           },
//         },
//         orderBy: {
//           position: "asc",
//         },
//       },
//     },
//   });
  const course = ""

//   if (!course) return null;

    //   const progressCount = await getProgress(userId, course.id);
    const progressCount = 0;
  return (
    <div className="h-full">
      {/* <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div> */}
      {/* <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50"> */}
      <div className="hidden md:flex h-full w-80 flex-col fixed z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
};