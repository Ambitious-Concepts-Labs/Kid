import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseLayout from "../../components/Courses/CourseLayout";
import Layout from "../../components/Dashboard/Layout";
import VideoPlayer from "../../components/Form/Chapter/VideoPlayer";

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

const Banner = ({ variant, label }) => (
  <div className={`banner ${variant}`}>{label}</div>
);

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

const CourseProgressButton = ({ isCompleted, nextChapterId }) => (
  <button className={`progress-button ${isCompleted ? "completed" : ""}`}>
    {isCompleted ? "Completed" : "Mark as Complete"}
  </button>
);

const CourseEnrollButton = ({ price }) => (
  <button className="enroll-button">Enroll for ${price}</button>
);

const Separator = () => <hr className="separator" />;

const Preview = ({ value }) => <div className="preview">{value}</div>;

const ChapterIdPage = ({ params }) => {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [chapterId, setChapterId] = useState(null);

  useEffect(() => {
    const url = location.pathname;
    const regex = /\/courses\/([^/]+)\/chapters\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      const courseId = match[1];
      const chapterId = match[2];
      setCourseId(courseId);
      setChapterId(chapterId);
      console.log(`Course ID: ${courseId}`);
      console.log(`Chapter ID: ${chapterId}`);
    } else {
      console.log("No match found");
    }
  }, [courseId, chapterId]);

  useEffect(() => {
    // Simulate authentication
    setUserId(mockUserId);

    // Fetch chapter data
    const fetchChapterData = async () => {
      const data = await getChapter({
        userId: mockUserId,
        chapterId: chapterId,
        courseId: courseId,
      });
      setChapterData(data);
    };

    fetchChapterData();
  }, [chapterId, courseId]);

  if (!userId) {
    // window.location.href = "/";
    // return null;
  }

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = chapterData;
  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <Layout>
      <CourseLayout>
        <div>
          {userProgress?.isCompleted && (
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
                title={chapter.title}
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
                    isCompleted={!!userProgress?.isCompleted}
                    nextChapterId={nextChapter?.id}
                  />
                ) : (
                  <CourseEnrollButton price={course.price} />
                )}
              </div>
              <Separator />
              <div>
                <Preview value={chapter.description} />
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
