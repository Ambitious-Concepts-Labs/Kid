import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";

const Meeting1Card = lazy(() => import("../../components/Cards/Meeting1Card"));
const Meeting2Card = lazy(() => import("../../components/Cards/Meeting2Card"));

export default function CreateMeeting() {
  const navigate = useNavigate();

  return (
    <>
      <Layout
        crumbs={[
          { label: "Home", link: "/dashboard" },
          { label: "Zoom", link: "/dashboard/zoom" },
          { label: "Create Meeting" },
        ]}
      >
        <div className="flex flex-col h-full" style={{ minHeight: "100vh" }}>
          <div className="flex justify-center items-center my-20 mx-40">
            <div className="flex space-x-8">
              <Suspense fallback={<div>Loading...</div>}>
                <Meeting1Card navigate={navigate} />
                <Meeting2Card navigate={navigate} />
              </Suspense>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
