import { useConfettiStore } from "../../hooks/useConfettiStore";
import React from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { db, mutateFireStoreDoc } from "../../lib/firebase";
import { doc } from "firebase/firestore";
import useGetCourseById from "../../hooks/useGetCouseById";

const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}) => {
  const history = useNavigate();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = React.useState(false);
    const { data: course } = useGetCourseById(courseId);
//   const Icon = isCompleted ? XCircle : CheckCircle;
  const onClick = async () => {
    alert("clicked");
    try {
      setIsLoading(true);
       const courseRef = doc(db, "courses", courseId);
       const chapters = course.chapters || [];
       const chapterIndex = chapters.findIndex(
         (chapter) => chapter.id === chapterId
       );

       if (chapterIndex !== -1) {
         chapters[chapterIndex].isCompleted = {
           isCompleted: !chapters[chapterIndex].isCompleted,
         };

         await mutateFireStoreDoc(courseRef, { chapters });
         isCompleted = !chapters[chapterIndex].isCompleted;
       }

      if (!isCompleted && !nextChapterId) {
        // confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        history(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

    //   toast.success("Progress updated");
      window.location.reload();
    } catch (error) {
      console.error("Error updating progress: ", error);
    //   toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <span onClick={onClick}>
      {isCompleted ? <span>⭕️</span> : <span>✅</span>}
      &nbsp;
      <button disabled={isLoading} className={isCompleted ? "outline" : "success"}>
        {isCompleted ? "Not completed" : "Mark as complete"}
        {/* <Icon className="h-4 w-4 ml-2" /> */}
      </button>
    </span>
    // <Button
    //   type="button"
    //   variant={isCompleted ? "outline" : "success"}
    //   className="w-full md:w-auto"
    //   onClick={onClick}
    //   disabled={isLoading}
    // >
    //   {isCompleted ? "Not completed" : "Mark as complete"}
    //   <Icon className="h-4 w-4 ml-2" />
    // </Button>
  );
};

export default CourseProgressButton;
