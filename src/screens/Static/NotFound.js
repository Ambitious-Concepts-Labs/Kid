import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = ({ code, msg, link }) => {
  const navigate = useNavigate();
  const message = msg ? msg : "Oops, looks like this page has lost its way! ";

  React.useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-br",
      "from-red-600",
      "to-yellow-500"
    );
    document.body.onload = function() {
      changeText();
    };

    let header = document.querySelector("h1");
    const update = setInterval(changeText, 1);
    let number = 1;
    const max = code ? code : 405;

    function changeText() {
      header.innerHTML = number;
      number++;
      if (number == max) {
        clearInterval(update);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-xl rounded-lg overflow-hidden shadow-lg transition-transform transform hover:translate-x-1 hover:translate-y-1">
        <div className="text-center bg-white relative">
          <div className="p-8 bg-[repeating-linear-gradient(#ccc,#ccc_1px,transparent_1px,transparent_10px),repeating-linear-gradient(#ccc,#ccc_1px,transparent_1px,transparent_10px)]">
            <h1
              id="error"
              className="font-kaushan text-gray-800 text-4xl font-light"
            >
              0
            </h1>
            <h2 className="text-gray-600 text-xl font-semibold mb-8">
              {message}
            </h2>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => navigate(link ? link : -1)}
            >
              Back to Previous Screen
            </button>
            <p className="absolute left-2.5 bottom-[-26px] text-gray-900 text-xs font-light mb-8">
              <strong>Created By </strong>{" "}
              <a href="https://codepen.io/ShadowAsylum/pen/jOPERZe">Asylum</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
