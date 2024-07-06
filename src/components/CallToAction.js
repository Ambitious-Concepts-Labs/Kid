import React from "react";

const CallToAction = ({ message, handleToggle }) => {
  return (
    <button
      onClick={() => handleToggle()}
      className="fixed z-20 bottom-0 left-0 w-full bg-red-600 text-white py-4 text-center md:hidden"
    >
      {message}
    </button>
  );
};

export default CallToAction;