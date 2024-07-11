import React from "react";

const meeting1 = "https://d10grw5om5v513.cloudfront.net/assets/images/meeting1.png";

export default function Meeting1Card({ navigate }) {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
      onClick={() => navigate("/dashboard/zoom/create/1on1")}
    >
      <img src={meeting1} alt="icon" className="w-full mb-4" />
      <h2 className="text-xl font-bold mb-2">Create 1 on 1 Meeting</h2>
      <p className="text-gray-700">Create a personal single person meeting.</p>
    </div>
  );
}
