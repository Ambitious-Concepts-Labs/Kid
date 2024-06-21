import React, { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer";
import CourseProgressButton from "./CourseProgressButton";
import CourseEnrollButton from "./CourseEnrollButton";
import Preview from "../Preview";
import Banner from "../Banner";
import useGetCourseAttachments from "../../hooks/useGetCourseAttachments";

const ChapterId = ({ courseId, chapterId, course }) => {
  const [chapter, setChapter] = useState(chapterId);
  const [muxData, setMuxData] = useState(null);
  const attachments = useGetCourseAttachments(courseId);
  const [nextChapter, setNextChapter] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [purchase, setPurchase] = useState(null);
  const [userId, setUserId] = useState(null); // Replace with your method to get user ID
  const [isLoading, setIsLoading] = useState(true);

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
    
    console.log({nextChapter})

  useEffect(() => {
    const fetchData = async () => {
      const {
        muxData,
        userProgress,
        purchase,
      } = await getChapter({ userId, chapterId, courseId });
      setMuxData(muxData);
      setUserProgress(userProgress);
      setPurchase(purchase);
      setIsLoading(false);
    };
    fetchData();
  }, [userId, chapterId, courseId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
    

    console.log({ chapter, course, chapterId });

  if (!chapter || !course) {
    return <div>Chapter or course not found.</div>;
  }

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
            course={course}
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
              <CourseEnrollButton courseId={courseId} price={course.price} />
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
                    <File />
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

const File = () => <span>File Icon</span>;

// Mock function to replace the getChapter action
const getChapter = async ({ userId, chapterId, courseId }) => {
  // Mock data fetching
  return {
    chapter: {
      title: "Chapter Title",
      isFree: true,
      description: "Chapter Description",
    },
    course: { price: 100 },
    muxData: { playbackId: "playback-id" },
    attachments: [{ id: 1, url: "#", name: "Attachment 1" }],
    nextChapter: { id: "next-chapter-id" },
    userProgress: { isCompleted: false },
    purchase: { id: "purchase-id" },
  };
};

export default ChapterId;
