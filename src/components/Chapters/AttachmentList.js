import React from 'react';

const AttachmentList = ({ attachments }) => (
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
);

export default AttachmentList;