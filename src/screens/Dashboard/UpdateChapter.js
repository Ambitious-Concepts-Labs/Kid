import React, { useEffect, useState } from "react";
import ChapterActions from "../../components/Form/Chapter/ChapterActions";
import ChapterAccessForm from "../../components/Form/Chapter/ChapterAccessForm";
import ChapterTitleForm from "../../components/Form/Chapter/ChapterTitleForm";
import ChapterDescriptionForm from "../../components/Form/Chapter/ChapterDescriptionForm";
import ChapterVideoForm from "../../components/Form/Chapter/ChapterVideoForm";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaEye, FaVideo } from "react-icons/fa";
import IconBadge from "../../components/IconBadge";
import Banner from "../../components/Banner";
import Layout from "../../components/Dashboard/Layout";
import { useLocation } from "react-router-dom";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
// Mock Data and Functions (Replace these with actual data fetching and authentication logic)
const mockFetchChapter = async (courseId, chapterId) => {
  // Mock data fetching logic
  return {
    id: chapterId,
    courseId: courseId,
    title: "Sample Chapter Title",
    description: "Sample Chapter Description",
    videoUrl: "https://sample-videos.com/video123.mp4",
    isPublished: false,
    muxData: { playbackId: "samplePlaybackId" },
  };
};

const mockAuth = () => {
  // Mock authentication logic
  return { userId: "sampleUserId" };
};

const mockRedirect = (url) => {
  // Mock redirect logic
  window.location.href = url;
};

const UpdateChapter = () => {
  const [courseId, setCourseId] = useState(null);
  const [chapterId, setChapterId] = useState(null);
  const location = useLocation();
  const { userId } = mockAuth();
  const [chapter, setChapter] = useState(mockFetchChapter(courseId, chapterId));
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const url = location.pathname;
    const regex = /\/course\/([^/]+)\/chapters\/([^/]+)/;
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

  const getCourse = async () => {
    const docRef = await getDoc(doc(db, "courses", courseId));
    if (!docRef.exists()) {
      console.log("No such document!");
      const data = await mockFetchChapter(courseId, chapterId);
      setCourse(data);
    } else {
      console.log("Document data:", docRef);
      console.log("Document data:", docRef.data());
      setCourse(docRef.data());
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      getCourse();
    };
    fetchCourse();
  }, [courseId, chapterId]);

  useEffect(() => {
    const fetchChapter = async () => {
      if (!course) return;
      const data = course.chapters.find((chapter) => chapter.id === chapterId);
      setChapter(data);
    };
    fetchChapter();
  }, [course]);

        if (!courseId || !chapterId) return <div>Loading...</div>;

  if (!userId) {
    mockRedirect("/");
    return null;
  }

  if (!chapter) {
    return <div>Loading...</div>;
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  console.log({
    chapter,
    courseId,
    chapterId,
  });
  return (
    <Layout>
      <>
        {!chapter.isPublished && (
          <Banner
            variant="warning"
            label="This chapter is unpublished. It will not be visible in the course"
          />
        )}
        <div style={{ overflow: "scroll" }} className="p-6">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <button
                onClick={() => mockRedirect(`/dashboard/course/${courseId}`)}
                className="flex items-center text-sm hover:opacity-75 transition-none mb-6"
              >
                <FaArrowLeftLong className="h-4 w-4 mr-2" />
                Back to course setup
              </button>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-2xl font-medium">Chapter Creation</h1>
                  <span className="text-sm text-slate-700">
                    Complete all fields {completionText}
                  </span>
                </div>
                <ChapterActions
                  disabled={!isComplete}
                  courseId={courseId}
                  chapterId={chapterId}
                  isPublished={chapter.isPublished}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LuLayoutDashboard} />
                  <h2 className="text-xl">Customize your chapter</h2>
                </div>
                <ChapterTitleForm
                  initialData={chapter}
                  courseId={courseId}
                  chapterId={chapterId}
                />
                <ChapterDescriptionForm
                  initialData={chapter}
                  courseId={courseId}
                  chapterId={chapterId}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={FaEye} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <ChapterAccessForm
                  initialData={chapter}
                  courseId={courseId}
                  chapterId={chapterId}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FaVideo} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <ChapterVideoForm
                initialData={chapter}
                chapterId={chapterId}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default UpdateChapter;
