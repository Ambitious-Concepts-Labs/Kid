import { createContext, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({
  courseId,
  uwConfig,
  setPublicId,
  setImageUrl,
  toggleEdit
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        async (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            const courseDoc = doc(db, "courses", courseId);
            await updateDoc(courseDoc, {
              imageUrl: result.info.url,
            });
            setImageUrl(result.info.url);
            alert("Course updated successfully");
            toggleEdit();
          }
          if (error) {
            console.log(error);
            alert("Something went wrong");
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function() {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
