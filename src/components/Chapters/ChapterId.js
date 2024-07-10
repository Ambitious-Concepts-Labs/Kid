import React, { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer";
import CourseProgressButton from "./CourseProgressButton";
import CourseEnrollButton from "./CourseEnrollButton";
import Preview from "../Preview";
import Banner from "../Banner";
import useGetCourseAttachments from "../../hooks/useGetCourseAttachments";
import { FaFileDownload } from "react-icons/fa";

const ChapterId = ({ courseId, chapterId, course, currentUser }) => {
  const [chapter, setChapter] = useState(chapterId);
  const [muxData, setMuxData] = useState(null);
  const { data: attachments, isLoading, error } = useGetCourseAttachments(
      courseId
    );
  const [nextChapter, setNextChapter] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const [purchase, setPurchase] = useState(false);

  useEffect(() => {
    if (course.chapters) {
      const currentIndex = course.chapters.findIndex(
        (chapter) => chapter.id === chapterId
      );
      if (currentIndex !== -1) {
        setChapter(course.chapters[currentIndex]);
        setNextChapter(course.chapters[currentIndex + 1] || null);
      }
    }
  }, [course, chapterId]);

  useEffect(() => {
    if (currentUser) {
      const userCourse = currentUser.courses.find(
        (course) => course.course === courseId
      );
      if (userCourse) {
        setPurchase(true);
        setUserProgress(userCourse.progress)
      }
      

    }
  }, [currentUser, courseId]);

  if (!chapter || !course) {
    return <div>Chapter or course not found.</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="sucess" label="You already complete this chapter" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapter={chapter}
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            courseByID={course}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                currentUser={currentUser}
                courseId={courseId}
                price={course.price}
              />
            )}
          </div>
          <div className="separator" />
          <div>
            <Preview value={chapter.description} />
          </div>
          {!!attachments.length && (
            <>
              <div className="separator" />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    rel="noreferrer"
                  >
                    <FaFileDownload />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterId;
