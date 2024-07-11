import React, { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import useGetCourseById from "../../hooks/useGetCouseById";
import useGetCourseAttachments from "../../hooks/useGetCourseAttachments";

const Banner = lazy(() => import("../../components/Banner"));
const CourseLayout = lazy(() => import("../../components/Courses/CourseLayout"));
const VideoPlayer = lazy(() => import("../../components/VideoPlayer"));
const CourseProgressButton = lazy(() => import("../../components/Chapters/CourseProgressButton"));
const AttachmentList = lazy(() => import('../../components/Chapters/AttachmentList'));

// Mock functions and data to simulate authentication and database fetching
const mockUserId = "user123";
const mockChapter = {
  id: "chapter1",
  title: "Chapter 1",
  description: "This is a chapter description.",
  isFree: true,
};
const mockCourse = {
  id: "course1",
  title: "Sample Course",
  price: 100,
};
const mockMuxData = { playbackId: "playback123" };
const mockAttachments = [
  {
    id: "attachment1",
    name: "Attachment 1",
    url: "https://example.com/attachment1",
  },
];
const mockNextChapter = { id: "chapter2" };
const mockUserProgress = { isCompleted: false };
const mockPurchase = { userId: mockUserId, courseId: mockCourse.id };

const getChapter = async ({ userId, chapterId, courseId }) => {
  // Simulate an API call
  return {
    chapter: mockChapter,
    course: mockCourse,
    muxData: mockMuxData,
    attachments: mockAttachments,
    nextChapter: mockNextChapter,
    userProgress: mockUserProgress,
    purchase: mockPurchase,
  };
};

// const VideoPlayer = ({ title, playbackId, isLocked, completeOnEnd }) => (
//   <div className={`video-player ${isLocked ? "locked" : ""}`}>
//     <h3>{title}</h3>
//     {!isLocked ? (
//       <video src={`https://stream.mux.com/${playbackId}.m3u8`} controls />
//     ) : (
//       <p>Content is locked</p>
//     )}
//   </div>
// );

const CourseEnrollButton = ({ price }) => (
  <button className="enroll-button">Enroll for ${price}</button>
);

const Separator = () => <hr className="separator" />;

const Preview = ({ value }) => <div className="preview">{value}</div>;

const ChapterIdPage = ({ currentUser }) => {
  const location = useLocation();
  const url = location.pathname;
  const regex = /\/courses\/([^/]+)\/chapters\/([^/]+)/;
  const match = url.match(regex);
  const courseId = match[1];
  const chapterId = match[2];
  const [chapterData, setChapterData] = useState({
    id: "",
    title: "",
    description: "",
    isFree: false,
    muxData: null,
    userProgress: null,
  });
  const [nextChapter, setNextChapter] = useState(null);
  const { data: course } = useGetCourseById(courseId);
  const { data: attachments, isLoading, error } = useGetCourseAttachments(
    courseId
  );
  const [chapId, setChapterId] = useState(null);

  useEffect(() => {
    if (course) {
      const currentIndex = course.chapters.findIndex(
        (chapter) => chapter.id === chapterId
      );
      if (currentIndex !== -1) {
        setChapterData(course.chapters[currentIndex]);
        setNextChapter(course.chapters[currentIndex + 1] || null);
      }
    }
  }, [course, chapterId, chapterData]);

  console.log({ course, chapterData, nextChapter });

  if (!chapterData) {
    return <div>pLoading...</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const purchase = currentUser?.courses.find(
    (course) => course.id === courseId
  );

  const isLocked = !chapterData.isFree && !purchase;
  const completeOnEnd = !!purchase && !chapterData.userProgress?.isCompleted;

  return (
    <Layout>
      <Suspense fallback={<div>Loading course layout...</div>}>
        <CourseLayout
          courseId={courseId}
          currentUser={currentUser}
          course={course}
          setChapterId={setChapterId}
        >
          <div>
            {chapterData.userProgress?.isCompleted && (
              <Suspense fallback={<div>Loading banner...</div>}>
                <Banner
                  variant="success"
                  label="You already complete this chapter"
                />
              </Suspense>
            )}
            {isLocked && (
              <Suspense fallback={<div>Loading banner...</div>}>
                <Banner
                  variant="warning"
                  label="You need to purchase this course to watch this chapter"
                />
              </Suspense>
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
              <div className="p-4">
                <Suspense fallback={<div>Loading video player...</div>}>
                  <VideoPlayer
                    chapter={chapterData}
                    chapterId={chapterId}
                    title={chapterData.title}
                    courseId={courseId}
                    course={course}
                    nextChapterId={nextChapter?.id}
                    playbackId={null}
                    isLocked={isLocked}
                    completeOnEnd={completeOnEnd}
                  />
                </Suspense>
              </div>
              <div>
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                  <h2 className="text-2xl font-semibold mb-2">
                    {chapterData.title}
                  </h2>
                  {purchase ? (
                    <Suspense fallback={<div>Loading progress button...</div>}>
                      <CourseProgressButton
                        isCompleted={!!chapterData.userProgress?.isCompleted}
                        nextChapterId={nextChapter?.id}
                      />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<div>Loading enroll button...</div>}>
                      <CourseEnrollButton price={course.price} />
                    </Suspense>
                  )}
                </div>
                <Suspense fallback={<div>Loading separator...</div>}>
                  <Separator />
                </Suspense>
                <div>
                  <Suspense fallback={<div>Loading preview...</div>}>
                    <Preview value={chapterData.description} />
                  </Suspense>
                </div>
                {!!attachments.length && (
                  <>
                    <Suspense fallback={<div>Loading separator...</div>}>
                      <Separator />
                    </Suspense>
                    <Suspense fallback={<div>Loading attachments...</div>}>
                      <AttachmentList attachments={attachments} />
                    </Suspense>
                  </>
                )}
              </div>
            </div>
          </div>
        </CourseLayout>
      </Suspense>
    </Layout>
  );
};

export default ChapterIdPage;
