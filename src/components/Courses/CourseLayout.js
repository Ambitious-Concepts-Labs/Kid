import React from "react";
// import { getProgress } from "@/actions/getProgress";
import CourseNavbar from "./CourseNavbar";
import CourseSidebar from "./CourseSidebar";

export default function CourseLayout({
  children,
  setChapterId,
  course,
  currentUser,
  courseId,
}) {
  const [progressCount, setProgressCount] = React.useState(0);

  const getProgress = () => {
    if (currentUser.courses.find((id) => id.course === courseId)) {
      const progress = currentUser.courses.find((id) => id.course === courseId)
        .progress;
      return progress;
    } else {
      return 0;
    }
    // if (course.chapters) {
    //   try {
    //     const publishedChapters = course.chapters.filter(
    //       (chapter) => chapter.isPublished
    //     );
    //     const publishedChapterIds = publishedChapters.map(
    //       (chapter) => chapter.id
    //     );
    //     const validCompletedChapters = course.chapters.filter(
    //       (chapter) => chapter.isCompleted
    //     );
    //     const progressPercentage =
    //       (validCompletedChapters / publishedChapters.length) * 100;

    //     return progressPercentage;
    //   } catch (error) {
    //     console.error("[GET_PROGRESS]", error);
    //     return 0;
    //   }
    // }
  };

  React.useEffect(() => {
    if (!currentUser) return;
    const progress = getProgress();
    setProgressCount(progress);
  }, [currentUser]);

  if (!course || !currentUser) return <h1>Loading...</h1>;

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          currentUser={currentUser}
          course={course}
          progressCount={progressCount}
        />
      </div>
      {/* <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50"> */}
      <div className="hidden md:flex h-full w-80 flex-col fixed z-50">
        <CourseSidebar
          currentUser={currentUser}
          setChapterId={setChapterId}
          course={course}
          progressCount={progressCount}
          courseId={courseId}
        />
      </div>
      <main className="overflow-scroll md:pl-80 h-full">{children}</main>
    </div>
  );
}
