import React, { useState } from "react";
import * as Components from "../all";
import "./Navbar.css";
// nabvar
import logoWhite from "../../assets/logo1.png";
import logoBlack from "../../assets/logo2.png";
import menuBlack from "../../assets/menu.png";
import menuOrange from "../../assets/menu1.png";
import close from "../../assets/menu-close.png";
import right from "../../assets/navbar-right.png";
// sidebar
import fb from "../../assets/fb.png";
import insta from "../../assets/insta.png";
import li from "../../assets/li.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ white }) {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const logo = white ? logoBlack : logoWhite;
	const menu = white ? menuOrange : menuBlack;

	return (
    <>
      <div
        style={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        }}
        className={`Navbar bg-white md:bg-transparent fixed md:absolute top-0 left-0 w-full flex items-center justify-between px-10 md:px-20 py-6 ${white &&
          "bg-white z-30"}`}
      >
        <img
          src={logo}
          alt="logo_img"
          className="h-[50px] object-contain cursor-pointer md:z-50"
          onClick={() => {}}
        />

        <img
          src={menu}
          alt="logo_img"
          className="bg-black md:bg-transparent w-[40px] h-[40px] cursor-pointer hover:opacity-80"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* Backdrop */}
      <Components.Backdrop className={showMenu ? "block" : "hidden"} />

      {/* Sidebar */}
      <div
        className={`Menu 
				fixed 
				bg-[#C33B4C] 
				z-40 
				duration-500 ease-in-out 
				h-screen 
				overflow-y-auto
				md:w-[45%] 
				max-w-[600px] min-w-[300px] 
				${showMenu ? "right-0" : "right-[-100%]"}
				top-0 w-[80%] 
				py-6 pl-12
				flex flex-col justify-center items-stretch 
				text-start text-white
				text-[22px]
				font-bold
				`}
      >
        <div className="ml-auto pr-20">
          <img
            src={close}
            alt="logo_img"
            className="w-[40px] h-[40px] cursor-pointer hover:opacity-80 z-50"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 mt-auto relative main"
          onClick={() => navigate("/")}
        >
          Home
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[50%] sm:w-[70%] md:w-[50%] lg:w-[70%] top-[50%] translate-y-[-2px] right-0 right"
          />
        </h1>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 relative main"
          onClick={() => navigate("/about-us")}
        >
          About Us
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[50%] sm:w-[70%] md:w-[50%] lg:w-[70%] top-[50%] translate-y-[-2px] right-0 right"
          />
        </h1>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 relative main"
          onClick={() => navigate("/academics")}
        >
          Academics
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[50%] sm:w-[70%] md:w-[50%] lg:w-[70%] top-[50%] translate-y-[-2px] right-0 right"
          />
        </h1>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 relative main"
          onClick={() => navigate("/facilities")}
        >
          Facilities
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[50%] sm:w-[70%] md:w-[50%] lg:w-[70%] top-[50%] translate-y-[-2px] right-0 right"
          />
        </h1>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 relative main"
          onClick={() => navigate("/our-works")}
        >
          Our Works
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[50%] sm:w-[70%] md:w-[50%] lg:w-[70%] top-[50%] translate-y-[-2px] right-0 right"
          />{" "}
        </h1>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 relative main"
          onClick={() => navigate("/student-life")}
        >
          Student Life
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[40%] sm:w-[70%] md:w-[50%] lg:w-[65%] top-[50%] translate-y-[-2px] right-0 right"
          />{" "}
        </h1>

        <h1
          className="opacity-40 hover:opacity-100 cursor-pointer mb-3 relative main"
          onClick={() => navigate("/admission-and-aid")}
        >
          Admission and Aid
          <img
            src={right}
            alt="navbar_right_img"
            className="absolute hidden w-[20%] sm:w-[50%] md:w-[30%] lg:w-[50%] top-[50%] translate-y-[-2px] right-0 right"
          />{" "}
        </h1>

        <div className="flex items-center justify-between mt-auto pr-20">
          {/* contact */}
          <p className="underline font-light text-[16px] cursor-pointer hover:opacity-80">
            + 1(770) 234 0987
          </p>

          {/* icons */}
          <div className="flex">
            <img
              src={li}
              alt="linkedIn_Img"
              className="h-7 cursor-pointer hover:opacity-80"
            />
            <img
              src={insta}
              alt="insta_Img"
              className="h-7 mx-2 cursor-pointer hover:opacity-80"
            />
            <img
              src={fb}
              alt="fb_Img"
              className="h-7 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>
    </>
  );
}
