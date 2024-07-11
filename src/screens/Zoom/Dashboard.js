import React from "react";
import { useNavigate } from "react-router-dom";
// import Header from "./Header";
import * as Components from "../../components/all";
import Layout from "../../components/Dashboard/Layout";

const dashboard1 = "https://d10grw5om5v513.cloudfront.net/assets/images/dashboard1.png";
const dashboard2 = "https://d10grw5om5v513.cloudfront.net/assets/images/dashboard2.png";
const dashboard3 = "https://d10grw5om5v513.cloudfront.net/assets/images/dashboard3.png";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Layout
        crumbs={[
          { label: "Home", link: "/dashboard" },
          { label: "Zoom" },
        ]}
      >
        <div className="p-4 flex-1 h-full overflow-auto text-start">
          <div className="flex flex-col h-full" style={{ minHeight: "100vh" }}>
            {/* <Header /> */}
            <div className="flex justify-center items-center my-20 mx-40">
              <div className="flex space-x-8">
                <div
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
                  onClick={() => navigate("/dashboard/zoom/create")}
                >
                  <img src={dashboard1} alt="icon" className="w-20 mb-4" />
                  <h2 className="text-xl font-bold mb-2">Create Meeting</h2>
                  <p className="text-gray-700">
                    Create a new meeting and invite people.
                  </p>
                </div>
                <div
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
                  onClick={() => navigate("/dashboard/zoom/mymeetings")}
                >
                  <img src={dashboard2} alt="icon" className="w-full mb-4" />
                  <h2 className="text-xl font-bold mb-2">My Meetings</h2>
                  <p className="text-gray-700">View your created meetings.</p>
                </div>
                <div
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer"
                  onClick={() => navigate("/dashboard/zoom/meetings")}
                >
                  <img src={dashboard3} alt="icon" className="w-20 mb-4" />
                  <h2 className="text-xl font-bold mb-2">Meetings</h2>
                  <p className="text-gray-700">
                    View the meetings that you are invited to.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
