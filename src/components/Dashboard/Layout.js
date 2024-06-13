import React from "react";
import * as Components from "../../components/all";

export default function Layout({children}) {
  return (
    <div className="AdminProfile bg-[#F7F9FF] flex items-stretch h-screen max-h-screen overflow-hidden">
      {/* Sidebar */}
      <Components.Sidebar page={"profile"} />

      {/* Right */}
      <div className="flex-1 flex flex-col items-stretch overflow-hidden">
        {/* Navbar */}
        <Components.AdminNavbar page={"Profile"} />
        {children}
      </div>
    </div>
  );
}
