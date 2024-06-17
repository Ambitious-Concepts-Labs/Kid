import React, { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { cn } from "../../../utils/helperfunctions";

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}) => {
  const [isReady, setIsReady] = useState(false);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        const courseRef = doc(db, "courses", courseId);
        const courseDoc = await getDoc(courseRef);
        const courseData = courseDoc.data();
        const chapters = courseData.chapters || [];
        const chapterIndex = chapters.findIndex(
          (chapter) => chapter.id === chapterId
        );

        if (chapterIndex !== -1) {
          chapters[chapterIndex].video.progress = {isCompleted: true};

          await updateDoc(courseRef, { chapters });
        }

        if (!nextChapterId) {
        //   confetti.onOpen();
        }

        // toast.success("Progress Updated");
        // router.refresh();
        window.location.reload();

        if (nextChapterId) {
        //   router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
    //   toast.error("Something went wrong");
    alert("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isLocked && !isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          {/* <Loader2 className="h-8 w-8 animate-spin text-secondary" /> */}
          <h4>Loading...</h4>
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          {/* <Lock className="h-8 w-8" /> */}
          <p className="text-sm">This Chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
