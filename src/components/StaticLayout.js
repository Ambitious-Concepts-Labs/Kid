import React from "react";
import * as Components from "../components/all";

export default function StaticLayout(props) {
  const { children, page } = props;
  return (
    <div className="bg-[#E2E2E2]">
      <div className="flex-1 flex flex-col items-stretch overflow-hidden">
        { page === "home" ?
            <Components.Navbar white={false} /> : <Components.Navbar white={true} />
        }
        {children}
        {/* Footer */}
        <Components.Footer />
      </div>
    </div>
  );
}
