import React from "react";
import * as Components from "../../components/all";
import { ConfettiProvider } from "../../hooks/useConfettiStore";

export default function Layout({children}) {
  return (
    <div className="AdminProfile bg-[#F7F9FF] flex items-stretch h-screen max-h-screen overflow-hidden">
      {/* Sidebar */}
      <Components.Sidebar page={"profile"} />

      {/* Right */}
      <div className="flex-1 flex flex-col items-stretch overflow-hidden">
        {/* Navbar */}
        <ConfettiProvider />
        <Components.AdminNavbar page={"Profile"} />
        {children}
      </div>
    </div>
  );
}
