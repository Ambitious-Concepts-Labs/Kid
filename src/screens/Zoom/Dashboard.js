import React from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import dashboard1 from "./assets/dashboard1.png";
import dashboard2 from "./assets/dashboard2.png";
import dashboard3 from "./assets/dashboard3.png";
// import Header from "./Header";
import * as Components from "../../components/all";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="AdminProfile bg-[#F7F9FF] flex items-stretch h-screen max-h-screen overflow-hidden">
        {/* Sidebar */}
        <Components.Sidebar page={"zoom"} />

        {/* Right */}
        <div className="flex-1 flex flex-col items-stretch overflow-hidden">
          {/* Navbar */}
          <Components.AdminNavbar page={"Zoom Session"} />
          {/* Page */}
          <div className="p-4 flex-1 h-full overflow-auto text-start">
            {/* heading */}
            <Components.Paragraph className="font-bold mt-5">
              BreadCrumbs (6)
            </Components.Paragraph>

            <div
              style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column",
              }}
            >
              {/* <Header /> */}
              <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                style={{ margin: "5vh 10vw" }}
              >
                <EuiFlexItem>
                  <EuiCard
                    icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
                    title={`Create Meeting`}
                    description="Create a new meeting and invite people."
                    onClick={() => navigate("/create")}
                    paddingSize="xl"
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
                    title={`My Meetings`}
                    description="View your created meetings."
                    onClick={() => navigate("/mymeetings")}
                    paddingSize="xl"
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
                    title={`Meetings`}
                    description="View the meetings that you are invited to."
                    onClick={() => navigate("/meetings")}
                    paddingSize="xl"
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
