import React from "react";
import * as Components from "../../components/all";
import { ConfettiProvider } from "../../hooks/useConfettiStore";

export default function Layout(props) {
  const [page, setPage] = React.useState("Dashboard");
  const defaultCrumbs = [
    { label: "Home", link: "/dashboard" }
  ];
  console.log(props);
  return (
    <div className="AdminProfile bg-[#F7F9FF] flex items-stretch h-screen max-h-screen overflow-hidden">
      {/* Sidebar */}
      <Components.Sidebar setPage={setPage} page={page} />

      {/* Right */}
      <div className="flex-1 flex flex-col items-stretch overflow-hidden">
        {/* Navbar */}
        <ConfettiProvider />
        <Components.AdminNavbar page={page} />
        <Components.Breadcrumb
          crumbs={props.crumbs ? props.crumbs : defaultCrumbs}
        />
        {props.children}
      </div>
    </div>
  );
}
