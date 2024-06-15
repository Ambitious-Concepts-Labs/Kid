import React, { useState } from "react";
import CloudinaryUploadWidget from "../../Image/CloudinaryUploadWidget";

const ImageForm = ({ initialData, courseId }) => {
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

  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <button
          className="bg-transparent border-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              {imageUrl ? (
                <>
                  <span className="mr-2">✏️</span>
                  Edit Image
                </>
              ) : (
                <>
                  <span className="mr-2">➕</span>
                  Add an Image
                </>
              )}
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        !imageUrl ? (
          <div className="flex items-center justify-center bg-slate-200 rounded-md h-60">
            <span className="text-slate-500 text-2xl">🖼️</span>
            <h2>Noooo</h2>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              src={imageUrl}
              alt="Course"
              className="object-cover rounded-md"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )
      ) : (
        <div>
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            setImageUrl={setImageUrl}
            toggleEdit={toggleEdit}
            courseId={courseId}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
