import React, { useEffect, useState } from "react";
import { storage } from "../../../firebase";
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
  listAll,
} from "firebase/storage";

const AttachmentForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [attachments, setAttachments] = useState(initialData.attachments || []);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const listRef = ref(storage, `courseAttachments/${courseId}`);
        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
              console.log({ folderRef });
            });
            res.items.forEach((itemRef) => {
              // All the items under listRef.
              getDownloadURL(itemRef)
                .then((url) => {
                  console.log({ url });
                  if (!attachments.includes(url)) {
                    setAttachments((prev) => [
                      ...prev,
                      { url, name: itemRef.name, ref: itemRef },
                    ]);
                  }
                })
                .catch((error) => {
                  console.error("Error getting download URL:", error);
                });
            });
          })
          .catch((error) => {
            console.error("Error listing attachments:", error);
          });
      } catch (error) {
        console.error("Error fetching attachments:", error);
      }
    };
    fetchAttachments();
  }, [courseId]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteObject(id)
        .then(() => {
          alert("File deleted successfully");
        })
        .catch((error) => {
          alert("Uh-oh, an error occurred!", error);
        });
      alert("Attachment deleted");
      setAttachments((prev) =>
        prev.filter((attachment) => attachment.ref !== id)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting attachment:", error);
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const fileRef = ref(
        storage,
        `courseAttachments/${courseId}/${file.name}`
      );
      await uploadBytes(fileRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        console.log({ snapshot });
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed");
    }
  };
  const filteredAttachments = Array.from(
    new Set(attachments.map((a) => a.url))
  ).map((url) => attachments.find((a) => a.url === url));
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <button
          className="bg-transparent border-0 cursor-pointer"
          onClick={toggleEdit}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <span className="mr-2">➕</span>
              Add a File
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <>
          {filteredAttachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {filteredAttachments.length > 0 && (
            <div className="space-y-2">
              {filteredAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <span className="mr-2">📄</span>
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id ? (
                    <span className="ml-auto animate-spin">⏳</span>
                  ) : (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.ref)}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          <input type="file" onChange={handleFileUpload} />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
