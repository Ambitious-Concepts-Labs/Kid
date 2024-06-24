import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../components/Banner";
import CourseLayout from "../../components/Courses/CourseLayout";
import Layout from "../../components/Dashboard/Layout";
import VideoPlayer from "../../components/VideoPlayer";
import useGetCouseById from "../../hooks/useGetCouseById";
import useGetCourseAttachments from "../../hooks/useGetCourseAttachments";
import CourseProgressButton from "../../components/Chapters/CourseProgressButton";
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
  const { course } = useGetCouseById(courseId);
  const attachments = useGetCourseAttachments(courseId);
  const [chapId, setChapterId] = useState(null);

  useEffect(() => {
    if (course.chapters) {
      const currentIndex = course.chapters.findIndex(
        (chapter) => chapter.id === chapterId
      );
      if (currentIndex !== -1) {
        setChapterData(course.chapters[currentIndex]);
        setNextChapter(course.chapters[currentIndex + 1] || null);
      }
    }
  }, [course, chapterId, chapterData]);

  console.log({course, chapterData, nextChapter})

  if (!chapterData) {
    return <div>pLoading...</div>;
  }

  const purchase = currentUser?.courses.find((course) => course.id === courseId);

  const isLocked = !chapterData.isFree && !purchase;
  const completeOnEnd = !!purchase && !chapterData.userProgress?.isCompleted;

  return (
    <Layout>
      <CourseLayout
        courseId={courseId}
        currentUser={currentUser}
        course={course}
        setChapterId={setChapterId}
      >
        <div>
          {chapterData.userProgress?.isCompleted && (
            <Banner
              variant="success"
              label="You already complete this chapter"
            />
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
            </div>
            <div>
              <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2">
                  {chapterData.title}
                </h2>
                {purchase ? (
                  <CourseProgressButton
                    isCompleted={!!chapterData.userProgress?.isCompleted}
                    nextChapterId={nextChapter?.id}
                  />
                ) : (
                  <CourseEnrollButton price={course.price} />
                )}
              </div>
              <Separator />
              <div>
                <Preview value={chapterData.description} />
              </div>
              {!!attachments.length && (
                <>
                  <Separator />
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a
                        href={attachment.url}
                        key={attachment.id}
                        target="_blank"
                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                        rel="noreferrer"
                      >
                        {/* <File /> */}
                        <p className="line-clamp-1">{attachment.name}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CourseLayout>
    </Layout>
  );
};

export default ChapterIdPage;
