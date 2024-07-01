import React from "react";
import { useNavigate } from "react-router-dom";
import meeting1 from "../../assets/meeting1.png";
import meeting2 from "../../assets/meeting2.png";
import * as Components from "../../components/all";
import Layout from "../../components/Dashboard/Layout";

export default function CreateMeeting() {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <div className="p-4 flex-1 h-full overflow-auto text-start">
          <Components.Paragraph className="font-bold mt-5">
            BreadCrumbs (6)
          </Components.Paragraph>
        </div>
        <div className="flex flex-col h-full" style={{ minHeight: "100vh" }}>
          <div className="flex justify-center items-center my-20 mx-40">
            <div className="flex space-x-8">
              <div
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
                onClick={() => navigate("/dashboard/zoom/create/1on1")}
              >
                <img src={meeting1} alt="icon" className="w-full mb-4" />
                <h2 className="text-xl font-bold mb-2">
                  Create 1 on 1 Meeting
                </h2>
                <p className="text-gray-700">
                  Create a personal single person meeting.
                </p>
              </div>
              <div
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
                onClick={() => navigate("/dashboard/zoom/create/video-conference")}
              >
                <img src={meeting2} alt="icon" className="w-full mb-4" />
                <h2 className="text-xl font-bold mb-2">
                  Create Video Conference
                </h2>
                <p className="text-gray-700">
                  Invite multiple persons to the meeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
