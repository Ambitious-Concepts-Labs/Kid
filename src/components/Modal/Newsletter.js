import React from "react";
import * as Components from "../all";
import { IoMdClose } from "react-icons/io";

const touchBg = "https://d10grw5om5v513.cloudfront.net/assets/images/touch-bg.png";
const touchOvrly = "https://d10grw5om5v513.cloudfront.net/assets/images/touch-bg-overlay.png";
const touchBg1 = "https://d10grw5om5v513.cloudfront.net/assets/images/touch-bg1.png";

const Newsletter = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[34rem] w-full">
        <div className="Touch relative w-full flex flex-col-reverse md:flex-col items-center md:items-stretch justify-center p-12 z-0 overflow-hidden">
          <button
            style={{ position: "absolute", top: "2%", left: "2%" }}
            onClick={onClose}
          >
            <IoMdClose className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-2xl font-bold mb-4">
            Sign Up for Our Newsletter
          </h2>
          {/* inputs */}
          <div className="w-full flex flex-col justify-center pt-20 sm:py-20 md:pr-2 md:py-0">
            <Components.Input
              placeholder="First Name"
              className={"md:max-w-[480px] mb-5 md:mb-8"}
            />
            <Components.Input
              placeholder="Last Name"
              className={"md:max-w-[480px] mb-5 md:mb-8"}
            />
            <Components.Input
              placeholder="Phone Number"
              className={"md:max-w-[480px] mb-5 md:mb-8"}
            />
            <Components.Input
              placeholder="Email Address"
              className={"md:max-w-[480px] mb-8 md:mb-12"}
            />
            <Components.Button
              onClick={onSubmit}
              text="Sign Up"
              className={"md:max-w-[480px]"}
            />
          </div>
          {/* text */}
          <div className="w-full relative flex flex-col justify-center lg:justify-between md:pl-[10%] sm:py-12">
            <div className="flex flex-col items-start">
              <Components.Heading className={`lg:text-[300%]`}>
                Stay In
              </Components.Heading>
              <Components.Heading className="flex items-center pl-1 lg:text-[300%]">
                <svg
                  height="5"
                  viewBox="0 0 269 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[70px] md:w-[140px] 
                    mr-2 md:mr-3"
                >
                  <path
                    d="M0.416016 2.60938L268.731 2.6094"
                    stroke="black"
                    strokeWidth="6"
                  />
                </svg>
                Touch
              </Components.Heading>
            </div>

            <p className="text-[15px] md:text-[16px] opacity-60 w-[300px] text-left mt-5 md:mt-16 lg:m-0">
              It is very important for us to keep in touch with you, so we are
              always ready to answer any question that interests you.
            </p>

            <img
              src={touchOvrly}
              alt="touch_overlay_img"
              className="absolute top-[55%] sm:top-[54%] left-[15%] sm:left-0 md:left-[50%] object-contain md:-translate-x-1/2 -translate-y-1/2 w-[58%] sm:w-[44%] md:w-[68%] ml-[-30px]"
            />
          </div>
          {/* bg image */}
          <img
            src={touchBg}
            alt="touch_bg_img"
            className="hidden md:block absolute top-0 left-0 h-full object-cover -z-10  min-h-full min-w-full"
          />
          <img
            src={touchBg1}
            alt="touch_bg_img"
            className="block md:hidden absolute bottom-0 left-0 w-full object-cover -z-10 min-h-full min-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
