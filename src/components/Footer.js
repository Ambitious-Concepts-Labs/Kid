import React from "react";
import * as Components from "./all";
// touch
import touchBg from "../assets/touch-bg.png";
import touchOvrly from "../assets/touch-bg-overlay.png";
import touchBg1 from "../assets/touch-bg1.png";
// footer
import footerBg from "../assets/footer-bg.png";
import logo from "../assets/logo1.png";
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import li from "../assets/li.png";

export default function Footer() {
	return (
    <>
      {/* Stay in Touch */}
      <div className="Touch relative min-h-[100vh] w-full flex flex-col-reverse md:flex-row items-center md:items-stretch justify-center p-12 lg:p-24 z-0 overflow-hidden">
        {/* inputs */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pt-20 sm:py-20 md:pr-2 md:py-0">
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
          <Components.Button text="Apply Now" className={"md:max-w-[480px]"} />
        </div>

        {/* text */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-center lg:justify-between md:pl-[10%] sm:py-12">
          <div className="flex flex-col items-start">
            <Components.Heading>Stay In</Components.Heading>
            <Components.Heading className="flex items-center pl-1">
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

      {/* footer */}
      <footer
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="p-12 md:p-20 bg-[#C33B4C] min-h-fit flex justify-between flex-wrap"
      >
        {/* logo */}
        <div className="flex flex-col items-start text-start w-full md:w-fit mb-7 md:mr-4 md:mb-0">
          {/* logo */}
          <img
            className="h-[100px] object-contain mb-5"
            src={logo}
            alt="logo_img"
          />
          {/* text */}
          <p className=" text-white max-w-[280px] lg:max-w-[320px] opacity-80 mb-5 text-[14px] lg:text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque venenatis nulla orci, sit amet eleifend lectus porta
            nec.
          </p>
          {/* icons */}
          <div className="flex">
            <img
              src={li}
              alt="linkedIn_Img"
              className="h-9 cursor-pointer hover:opacity-80"
            />
            <img
              src={insta}
              alt="insta_Img"
              className="h-9 mx-5 cursor-pointer hover:opacity-80"
            />
            <img
              src={fb}
              alt="fb_Img"
              className="h-9 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>

        {/* links */}
        <div className="flex flex-col items-start text-start text-white mt-8 mr-4">
          <h1 className="font-bold mb-3">Helpful Links</h1>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Academic Calendar
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Developers
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Blockchain
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Leadership
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Careers
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Events
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100">
            News
          </p>
        </div>

        {/* visit */}
        <div className="flex flex-col items-start text-start text-white mt-8 mr-4">
          <h1 className="font-bold mb-3">Vist Patton U</h1>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
			<a href="/login">
           		Students
			</a>
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Faculty & Staff
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Support Center
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            FAQ
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Alumni
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Privacy
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100">
            Terms
          </p>
        </div>

        {/* departments */}
        <div className="flex flex-col items-start text-start text-white mt-8">
          <h1 className="font-bold mb-3">Departments</h1>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100 mb-3">
            Education
          </p>
          <p className="text-sm opacity-80 cursor-pointer hover:opacity-100">
            Research
          </p>
        </div>
      </footer>

      {/* copyright */}
      <div className="w-full flex-col-reverse flex md:flex-row justify-between items-center bg-white px-20 py-3">
        <p className="text-[14px] max-md:mt-2">
          Copyright © 2024 PATTON UNIVERCITY.
          <a
            className="text-success"
            target="__blank"
            href="https://www.hoseacodes.com"
          >
            {" "}
            &nbsp; 🚀 Designed by HoseaCodes
          </a>
        </p>

        <div className="flex items-center">
          <p className="text-[12px] underline cursor-pointer hover:font-semibold">
            Terms
          </p>
          <p className="text-[12px] opacity-20 mx-3">|</p>
          <p className="text-[12px] underline cursor-pointer hover:font-semibold">
            Site Information
          </p>
          <p className="text-[12px] opacity-20 mx-3">|</p>
          <p className="text-[12px] underline cursor-pointer hover:font-semibold">
            Contact
          </p>
        </div>
      </div>
    </>
  );
}
