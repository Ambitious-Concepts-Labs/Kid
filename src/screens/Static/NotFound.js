import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  React.useEffect(() => {
    document.body.onload = function() {
      changeText();
    };

    var header = document.querySelector("h1");
    var update = setInterval(changeText, 1);
    var number = 1;
    var max = 405;

    function changeText() {
      header.innerHTML = number;
      number++;
      if (number == max) {
        clearInterval(update);
      }
    }
  }, []);

  return (
    <div class="page-wrap">
      <div class="screen">
        <div class="innehall">
          <div class="body">
            <h1 id="error">0</h1>

            <h2>Oops, looks line this page has lost it´s way! </h2>
            <button
              onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.color = "#007bff")}
              onClick={() => navigate(-1)}
            >
              Back to Previous Screen
            </button>
            <p>
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
