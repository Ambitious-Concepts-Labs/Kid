import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import useGetCourseById from "../../hooks/useGetCouseById";

const ChapterId = lazy(() => import("../../components/Chapters/ChapterId"));
const CourseLayout = lazy(() =>
  import("../../components/Courses/CourseLayout")
);

export default function ViewCourse(props) {
  const { currentUser } = props;
  const { id } = useParams();
  const { data: course, isLoading, error } = useGetCourseById(id);
  const [chapterId, setChapterId] = React.useState(null);
  React.useEffect(() => {
    if (course && course.chapters && course.chapters.length > 0) {
      setChapterId(course.chapters[0]);
    }
  }, [course, id]);
  if (isLoading) return <div>Loading course...</div>;
  if (error) return <div>Error loading course: {error.message}</div>;
  return (
    <Layout>
      <Suspense fallback={<div>Loading course layout...</div>}>
        <CourseLayout
          courseId={id}
          currentUser={currentUser}
          course={course}
          setChapterId={setChapterId}
        >
          <ChapterId course={course} courseId={id} chapterId={chapterId} />
        </CourseLayout>
      </Suspense>
    </Layout>
  );
}
