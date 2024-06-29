import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Preview = ({ value }) => {
  return (
    <div className="bg-slate-100">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export default Preview;
