import React, { useEffect, useState } from "react";
import Button from "./Button";
import MuxPlayer from "@mux/mux-player-react";
import CloudinaryUploadWidget from "../../Image/CloudinaryUploadWidget";
import MuxUploader from "@mux/mux-uploader-react";
import axios from "axios";


const PlusCircle = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const VideoIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 10l4.553 2.276a1 1 0 010 1.448L15 16M4 6h7a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
    />
  </svg>
);

const ChapterVideoForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [muxUrl, setMuxUrl] = useState("");
  const [publicId, setPublicId] = useState(process.env.REACT_APP_CLOUD_API_KEY);
  const [cloudName] = useState(process.env.REACT_APP_CLOUND_NAME);
  const [uploadPreset] = useState(
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  );
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    folder: "kidvercity", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    maxImageFileSize: 2000000, //restrict file size to less than 2MB
    maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const toggleEdit = () => setIsEditing((current) => !current);
  
  const handMuxUpload = async () => {
        const auth = {
          username: process.env.REACT_APP_MUX_TOKEN_ID,
          password: process.env.REACT_APP_MUX_TOKEN_SECRET,
        };
        const handleUpload = async () => {
          const url = "https://api.mux.com/video/v1/uploads";
          const data = {
            new_asset_settings: {
              playback_policy: ["public"],
              encoding_tier: "baseline",
            },
            cors_origin: "*",
          };
      
          try {
            const response = await axios.post(url, data, {
              headers: {
                "Content-Type": "application/json",
              },
              auth: auth,
            });
      
            console.log("Response:", response);
            setMuxUrl(response.data.data.url);
            return response.data.data.id;
          } catch (error) {
            console.error("Error:", error);
            return null;
          }
        };
        handleUpload().then(async (id) => { 
            const url = `https://api.mux.com//video/v1/uploads/${id}`;
            try {
            const response = await axios.get(url, {
              headers: {
                "Content-Type": "application/json",
              },
              auth: auth,
            });
      
            console.log("Response:", response);
            // setMuxUrl(response.data.data.url);
            // return response.data.data.id;
          } catch (error) {
            console.error("Error:", error);
            return null;
          }

        })
    }

  useEffect(() => {
    if (!videoUrl) {
      handMuxUpload();      
    }
  }, [isEditing]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && !videoUrl  ? (
            <> Cancel </>
          ) : (
            <>
              {!initialData.videoUrl ? (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add a Video
                </>
              ) : (
                <>
                  <span className="mr-2">✏️</span>
                  Edit Video
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl || videoUrl ? (
          <div className="flex items-center justify-center bg-slate-200 rounded-md h-60">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <video
              className="object-cover rounded-md"
              style={{ width: "100%", height: "auto" }}
              controls
            >
              <source src={initialData.videoUrl || videoUrl} type="video/mp4" />
            </video>
            {/* <MuxPlayer
              playbackId={
                initialData?.muxData?.playbackId ||
                "5021Rs017DxNRIHuCrR00IWmJbEiFdzfESNC502G01rwlLJk"
              }
            /> */}
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <div>
            <MuxUploader endpoint={muxUrl} />
          </div> */}
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            setVideoUrl={setVideoUrl}
            type="video"
            toggleEdit={toggleEdit}
            courseId={courseId}
            chapterId={chapterId}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the
          video does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
