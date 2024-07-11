import React from "react";

const meeting2 =
  "https://d10grw5om5v513.cloudfront.net/assets/images/meeting2.png";

export default function Meeting2Card({ navigate }) {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
      onClick={() => navigate("/dashboard/zoom/create/video-conference")}
    >
      <img src={meeting2} alt="icon" className="w-full mb-4" />
      <h2 className="text-xl font-bold mb-2">Create Video Conference</h2>
      <p className="text-gray-700">Invite multiple persons to the meeting.</p>
    </div>
  );
}
