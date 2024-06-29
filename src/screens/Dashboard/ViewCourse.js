import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Dashboard/Layout'
import CourseLayout from '../../components/Courses/CourseLayout'
import ChapterId from '../../components/Chapters/ChapterId'
import useGetCouseById from '../../hooks/useGetCouseById'

export default function ViewCourse(props) {
  const { currentUser } = props;
  const { id } = useParams();
  const { course } = useGetCouseById(id);
  const [chapterId, setChapterId] = React.useState(null);
  React.useEffect(() => {
    if (course && course.chapters && course.chapters.length > 0) {
      setChapterId(course.chapters[0]);
    }
  }, [course]);
  return (
    <Layout>
      <CourseLayout courseId={id} currentUser={currentUser} course={course} setChapterId={setChapterId}>
        <ChapterId course={course} courseId={id} chapterId={chapterId} />
      </CourseLayout>
    </Layout>
  );
}
