import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "../../components/all";
import logo from "../../assets/logo1.png";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../lib/firebase";

function SignUpScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="StudentScreen bg-[#FFF] flex flex-row h-screen">
      {/* left */}
      <div className="h-full w-[23%] bg-[#C33B4C] flex flex-col items-start py-10 px-16 text-left">
        <img
          src={logo}
          alt="logo_img"
          className="h-[50px] object-contain cursor-pointer md:z-50"
          onClick={() => {}}
        />

        <Components.BiggerParagraph className="text-left text-white font-bold font-[riffic] capitalize mb-3 mt-auto">
          Whatever your dream is, KidverCity is proud to offer a values-based
          educational
        </Components.BiggerParagraph>
        <p className="text-[13px] text-white mb-auto">
          Patton is at the frontier of academic and intellectual discovery.
          Those who venture here—to learn, research, teach, work, and grow—join
          nearly four centuries of students and scholars in the pursuit of
          truth, knowledge, and a better world..
        </p>
      </div>

      {/* right */}
      <div className="h-full w-[77%] relative flex flex-col items-center justify-center">
        {/* right svg */}
        <svg
          width="140"
          height="160"
          viewBox="0 0 158 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0"
        >
          <ellipse
            cx="119.5"
            cy="63.5"
            rx="119.5"
            ry="116.5"
            fill="#F38315"
            fill-opacity="0.6"
          />
        </svg>

        {/* form */}
        <div
          style={{
            boxShadow: "0px 4px 68px rgba(0, 0, 0, 0.08)",
            borderRadius: 32,
          }}
          className="flex flex-col bg-[#FFF] min-h-[500px] w-[40%] p-8"
        >
          {/* top circle */}
          <div className="rounded-full bg-[#FFDED1] flex items-center justify-center h-[60px] w-[60px] mx-auto">
            <svg
              width="35"
              height="35"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.7841 36.963H45.3409V34.5198C45.3409 33.1705 44.247 32.0766 42.8978 32.0766C41.5485 32.0766 40.4546 33.1705 40.4546 34.5198V36.963H38.0114C36.6621 36.963 35.5682 38.0569 35.5682 39.4062C35.5682 40.7554 36.6621 41.8493 38.0114 41.8493H40.4546V44.2925C40.4546 45.6418 41.5485 46.7357 42.8978 46.7357C44.247 46.7357 45.3409 45.6418 45.3409 44.2925V41.8493H47.7841C49.1334 41.8493 50.2273 40.7554 50.2273 39.4062C50.2273 38.0569 49.1334 36.963 47.7841 36.963Z"
                fill="#F38315"
              />
              <path
                d="M42.8978 22.3039C37.2809 22.3039 32.2879 25.0261 29.1683 29.2202C27.8985 28.9532 26.6044 28.8187 25.3069 28.8191C23.8991 28.8191 22.5275 28.9762 21.2081 29.272C14.999 30.6635 9.94519 35.1464 7.75334 41.0142C6.97282 43.1048 6.57401 45.3185 6.57589 47.5501C6.57589 48.8994 7.66978 49.9932 9.01906 49.9932H29.4759C32.6107 53.959 37.4619 56.5084 42.8978 56.5084C52.3281 56.5084 60 48.8365 60 39.4062C60 29.9758 52.3281 22.3039 42.8978 22.3039ZM42.8978 51.622C40.7623 51.6237 38.6641 51.0619 36.8152 49.9932C33.1537 47.8812 30.6819 43.9283 30.6819 39.4062C30.6819 36.147 31.9673 33.1844 34.0548 30.9915C36.2813 28.6528 39.421 27.1903 42.8978 27.1903C49.6336 27.1903 55.1136 32.6703 55.1136 39.4062C55.1136 46.142 49.6336 51.622 42.8978 51.622ZM5.31342 13.7122C5.31342 17.5669 8.30501 20.7338 12.0882 21.0185C10.8858 18.8519 10.1998 16.3608 10.1998 13.7122C10.1998 11.0637 10.8858 8.57246 12.0882 6.40601C8.30501 6.69056 5.31342 9.85757 5.31342 13.7122ZM15.2273 26.1949C14.3773 26.0176 13.5113 25.9281 12.6429 25.928C5.67159 25.928 0 31.5997 0 38.5711C0 39.9204 1.09389 41.0142 2.44318 41.0142H2.61013C4.49984 34.462 9.1567 29.0717 15.2273 26.1949ZM16.9745 7.80432C15.7873 9.47383 15.0861 11.5121 15.0861 13.7121C15.0861 15.9121 15.7873 17.9503 16.9745 19.6198C18.8286 22.2269 21.8715 23.9325 25.3069 23.9325C30.9427 23.9325 35.5275 19.3477 35.5275 13.7119C35.5275 8.07617 30.9427 3.4913 25.3069 3.4913C21.8713 3.49163 18.8286 5.19729 16.9745 7.80432Z"
                fill="#F38315"
              />
            </svg>
          </div>

          {/*  */}
          <Components.SubHeading className="!text-2xl mt-5">
            Sign Up To Your Student Dasboard{" "}
          </Components.SubHeading>

          {/*  */}
          <Components.Paragraph className="!text-sm mt-1">
            Set Up Your Account Details{" "}
          </Components.Paragraph>

          {/*inputs*/}
          <div className="w-[80%] mx-auto mt-7 flex flex-col">
            {/*Name*/}
            <div className="text-[12px] ml-2 mr-auto">
              Full Name <span className="text-[#EB2F2F]">*</span>
            </div>
            <div className="flex items-center px-2 p-1 border border-[#CDD2E1] rounded-full mx-2">
              <input
                type="text"
                className="flex-1 px-4 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
              <svg
                width="17"
                height="15"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.95 19.9524L9.7 15.2976L11.1 13.7643L13.95 16.8857L19.6 10.6976L21 12.2309L13.95 19.9524ZM10 7.90476L18 2.42857H2L10 7.90476ZM0 17.7619V0.238091H20V7.19285L18 9.38333V4.61904L10 10.0952L2 4.61904V15.5714H7.15L9.15 17.7619H0Z"
                  fill="#A7AFB2"
                />
              </svg>
            </div>
            <br />

            {/*student id*/}
            <div className="text-[12px] ml-2 mr-auto">
              {/* Student ID <span className="text-[#EB2F2F]">*</span> */}
              Email <span className="text-[#EB2F2F]">*</span>
            </div>
            <div className="flex items-center px-2 p-1 border border-[#CDD2E1] rounded-full mx-2">
              <input
                type="text"
                className="flex-1 px-4 focus:outline-none"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg
                width="17"
                height="15"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.95 19.9524L9.7 15.2976L11.1 13.7643L13.95 16.8857L19.6 10.6976L21 12.2309L13.95 19.9524ZM10 7.90476L18 2.42857H2L10 7.90476ZM0 17.7619V0.238091H20V7.19285L18 9.38333V4.61904L10 10.0952L2 4.61904V15.5714H7.15L9.15 17.7619H0Z"
                  fill="#A7AFB2"
                />
              </svg>
            </div>

            {/*password*/}
            <div className="text-[12px] mt-3 ml-2  mr-auto">
              Password <span className="text-[#EB2F2F]">*</span>
            </div>
            <div className="flex items-center px-2 p-1 border border-[#CDD2E1] rounded-full mx-2">
              <input
                type="text"
                className="flex-1 px-4 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <svg
                width="17"
                height="15"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12C15.34 12 15.67 12.04 16 12.09V9C16 8.46957 15.7893 7.96086 15.4142 7.58579C15.0391 7.21071 14.5304 7 14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C1.46957 7 0.960859 7.21071 0.585786 7.58579C0.210714 7.96086 0 8.46957 0 9V19C0 20.11 0.89 21 2 21H9.81C9.3 20.12 9 19.1 9 18C9 14.69 11.69 12 15 12ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM8 16C7.60444 16 7.21776 15.8827 6.88886 15.6629C6.55996 15.4432 6.30362 15.1308 6.15224 14.7654C6.00087 14.3999 5.96126 13.9978 6.03843 13.6098C6.1156 13.2219 6.30608 12.8655 6.58579 12.5858C6.86549 12.3061 7.22186 12.1156 7.60982 12.0384C7.99778 11.9613 8.39991 12.0009 8.76537 12.1522C9.13082 12.3036 9.44318 12.56 9.66294 12.8889C9.8827 13.2178 10 13.6044 10 14C10 15.11 9.11 16 8 16ZM18.5 16.25L13.75 21L11 18L12.16 16.84L13.75 18.43L17.34 14.84L18.5 16.25Z"
                  fill="#A7AFB2"
                />
              </svg>
            </div>

            {/*secret*/}
            <div className="text-[12px] mt-3 ml-2  mr-auto">
              Secret <span className="text-[#EB2F2F]">*</span>
            </div>
            <div className="flex items-center px-2 p-1 border border-[#CDD2E1] rounded-full mx-2">
              <input
                type="text"
                className="flex-1 px-4 focus:outline-none"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Secret"
              />
              <svg
                width="17"
                height="15"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12C15.34 12 15.67 12.04 16 12.09V9C16 8.46957 15.7893 7.96086 15.4142 7.58579C15.0391 7.21071 14.5304 7 14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C1.46957 7 0.960859 7.21071 0.585786 7.58579C0.210714 7.96086 0 8.46957 0 9V19C0 20.11 0.89 21 2 21H9.81C9.3 20.12 9 19.1 9 18C9 14.69 11.69 12 15 12ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM8 16C7.60444 16 7.21776 15.8827 6.88886 15.6629C6.55996 15.4432 6.30362 15.1308 6.15224 14.7654C6.00087 14.3999 5.96126 13.9978 6.03843 13.6098C6.1156 13.2219 6.30608 12.8655 6.58579 12.5858C6.86549 12.3061 7.22186 12.1156 7.60982 12.0384C7.99778 11.9613 8.39991 12.0009 8.76537 12.1522C9.13082 12.3036 9.44318 12.56 9.66294 12.8889C9.8827 13.2178 10 13.6044 10 14C10 15.11 9.11 16 8 16ZM18.5 16.25L13.75 21L11 18L12.16 16.84L13.75 18.43L17.34 14.84L18.5 16.25Z"
                  fill="#A7AFB2"
                />
              </svg>
            </div>

            {/* remember me */}
            {/* <div className="flex flow-row mt-3 items-center mx-2">
							<input type="checkbox" name="" id="" />
							<div className="text-[12px] ml-2">Remember Me</div>
						</div> */}

            {/* button */}
            {secret === process.env.REACT_APP_AUTH_SECRET && (
              <div
                className="w-full text-center p-1 bg-[#F38315] text-white rounded-lg text-sm mt-3"
                onClick={register}
              >
                Sign Up
              </div>
            )}

            {/*  */}
            <div className="w-full flex flow-row mt-4">
              <div className="text-[10px]">
                Already have an account?{" "}
                <span
                  className="text-[#C33B4C] hover:opacity-50 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  login
                </span>
              </div>

              <div
                className="text-[10px] ml-auto text-[#A7AFB2] hover:opacity-50 cursor-pointer"
                onClick={() => navigate("/forgot")}
              >
                Forgot Your Id Or Password?
              </div>
            </div>

            {/*  */}
            <div className="w-full flex justify-between items-center mt-5 text-[12px]">
              <svg
                width="100"
                height="2"
                viewBox="0 0 138 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="5.85019e-08"
                  y1="1.0378"
                  x2="137.852"
                  y2="1.03781"
                  stroke="#E8ECF4"
                  stroke-width="1.33837"
                />
              </svg>
              Or Continue with
              <svg
                width="100"
                height="2"
                viewBox="0 0 138 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.147949"
                  y1="1.0378"
                  x2="138"
                  y2="1.03781"
                  stroke="#E8ECF4"
                  stroke-width="1.33837"
                />
              </svg>
            </div>

            {/*  */}
            <div className="flex items-center justify-center w-full mt-4">
              {/* google */}
              {secret === process.env.REACT_APP_AUTH_SECRET && (
                <svg
                  onClick={signInWithGoogle}
                  width="53"
                  height="53"
                  viewBox="0 0 73 73"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer hover:opacity-70"
                >
                  <circle
                    cx="36.5"
                    cy="36.5"
                    r="35.83"
                    fill="white"
                    stroke="#E8ECF4"
                    stroke-width="1.34"
                  />
                  <g clip-path="url(#clip0_1_92)">
                    <path
                      d="M28.0919 39.338L26.978 43.4963L22.9068 43.5824C21.6901 41.3257 21 38.7438 21 36C21 33.3468 21.6453 30.8448 22.789 28.6418H22.7899L26.4144 29.3063L28.0021 32.909C27.6698 33.8778 27.4887 34.9178 27.4887 36C27.4888 37.1745 27.7016 38.2998 28.0919 39.338Z"
                      fill="#FBBB00"
                    />
                    <path
                      d="M52.7203 33.011C52.904 33.9789 52.9998 34.9784 52.9998 36C52.9998 37.1455 52.8794 38.2629 52.6499 39.3407C51.8711 43.0084 49.8359 46.211 47.0166 48.4774L47.0157 48.4765L42.4504 48.2435L41.8043 44.2101C43.6751 43.113 45.1371 41.396 45.9072 39.3407H37.3516V33.011H52.7203Z"
                      fill="#518EF8"
                    />
                    <path
                      d="M47.0157 48.4765L47.0166 48.4774C44.2747 50.6813 40.7915 52 36.9999 52C30.9067 52 25.6092 48.5943 22.9067 43.5824L28.0918 39.3381C29.443 42.9442 32.9217 45.5113 36.9999 45.5113C38.7529 45.5113 40.3951 45.0374 41.8043 44.2101L47.0157 48.4765Z"
                      fill="#28B446"
                    />
                    <path
                      d="M47.2128 23.6835L42.0295 27.927C40.5711 27.0154 38.8471 26.4887 37.0001 26.4887C32.8295 26.4887 29.2858 29.1736 28.0023 32.909L22.7899 28.6418H22.7891C25.4519 23.5077 30.8163 20 37.0001 20C40.8822 20 44.4418 21.3829 47.2128 23.6835Z"
                      fill="#F14336"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_92">
                      <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(21 20)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
              {secret !== process.env.REACT_APP_AUTH_SECRET && (
                <div>Secret Required To Login</div>
              )}
              {/* apple */}
              {/* <svg
								width="50"
								height="50"
								viewBox="0 0 73 73"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="mx-5 cursor-pointer hover:opacity-70"
							>
								<circle cx="36.5" cy="36.5" r="36.5" fill="black" />
								<path
									d="M29.1961 51.4873C28.4193 51.0677 27.7308 50.5493 27.1571 49.952C26.5261 49.3354 25.9414 48.6886 25.4063 48.0149C24.1505 46.5214 23.1657 44.8891 22.4821 43.1682C21.6609 41.1691 21.2632 39.253 21.2632 37.3789C21.2632 35.2859 21.8209 33.4587 22.9118 31.9234C23.7205 30.7234 24.9094 29.7206 26.3556 29.0188C27.7571 28.3121 29.3675 27.9254 31.0171 27.8993C31.5945 27.8993 32.2163 27.9673 32.8763 28.0972C33.3503 28.2062 33.9277 28.3781 34.6332 28.592C35.5308 28.8729 36.0246 29.0448 36.192 29.0868C36.7177 29.2427 37.1598 29.3107 37.507 29.3107C37.7705 29.3107 38.1423 29.2427 38.5646 29.1387C38.8022 29.0708 39.2504 28.9508 39.8919 28.7279C40.5272 28.54 41.0271 28.3791 41.4248 28.2592C42.0342 28.1132 42.624 27.9783 43.1498 27.9103C43.773 27.8305 44.4055 27.8094 45.0348 27.8473C46.1252 27.9052 47.1992 28.0928 48.2225 28.4041C49.8957 28.9508 51.2489 29.8044 52.256 31.0179C51.8303 31.2309 51.4308 31.4765 51.0629 31.7515C50.2622 32.3278 49.5801 33.0044 49.0425 33.7556C48.3398 34.7822 47.9755 35.9386 47.9848 37.113C48.0107 38.5553 48.4663 39.8257 49.3638 40.9242C50.0237 41.7383 50.8813 42.4346 51.8842 42.9703C52.3976 43.2511 52.8396 43.444 53.2632 43.574C53.065 44.0737 52.8532 44.5575 52.6032 45.0373C52.0364 46.1132 51.3493 47.1447 50.5508 48.1188C49.8391 48.9574 49.2813 49.5822 48.8578 49.998C48.1978 50.6327 47.5625 51.1174 46.9211 51.4553C46.2155 51.8351 45.382 52.038 44.5349 52.038C43.9612 52.0559 43.3877 51.9995 42.8358 51.8711C42.3618 51.7411 41.8927 51.6002 41.4309 51.4393C40.9509 51.2603 40.456 51.109 39.9498 50.9865C38.6984 50.7256 37.3865 50.7239 36.1341 50.9815C35.6207 51.1014 35.127 51.2414 34.6394 51.4133C33.9536 51.6472 33.498 51.8041 33.2346 51.8711C32.7088 51.996 32.1634 52.074 31.6118 52.1C30.7585 52.1 29.9631 51.9021 29.1751 51.5013L29.1961 51.4873ZM40.4496 26.8838C39.3341 27.3366 38.2691 27.5295 37.2115 27.4665C37.0453 26.6019 37.2115 25.7173 37.6535 24.7488C38.0298 23.9282 38.5858 23.1697 39.2947 22.5098C40.0433 21.8152 40.9517 21.2458 41.969 20.8336C43.0525 20.3808 44.0855 20.136 45.073 20.1C45.201 21.0056 45.073 21.8961 44.663 22.8587C44.2835 23.7096 43.7285 24.5018 43.0217 25.2016C42.3003 25.8972 41.4149 26.4688 40.4176 26.8828L40.4496 26.8838Z"
									fill="white"
								/>
							</svg> */}
              {/* fb */}
              {/* <svg
								width="50"
								height="50"
								viewBox="0 0 73 73"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer hover:opacity-70"
							>
								<circle cx="36.5" cy="36.5" r="36.5" fill="#4D9CCC" />
								<path
									d="M39.0526 50.8703V37.4183H43.4268L44.077 32.1514H39.0526V28.7967C39.0526 27.2768 39.4608 26.2363 41.5632 26.2363H44.2272V21.5405C42.931 21.3964 41.6281 21.3268 40.3245 21.3321C36.4582 21.3321 33.8037 23.7809 33.8037 28.2764V32.1416H29.458V37.4085H33.8132V50.8703H39.0526Z"
									fill="white"
								/>
							</svg> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;
