import React, { useEffect, useState, useRef } from "react";
import * as Components from "../../../components/all";
import logo from "../../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../lib/firebase";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(
    localStorage.getItem("kidsvercity-email") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("kidsvercity-password") || ""
  );
  const [secret, setSecret] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const rememberCheck = useRef(null);

  function remember() {
    if (rememberCheck.current.checked) {
      localStorage.setItem("kidsvercity-email", email);
      localStorage.setItem("kidsvercity-password", password);
    } else {
      localStorage.setItem("kidsvercity-email", "");
      localStorage.setItem("kidsvercity-password", "");
    }
  }

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="StudentScreen bg-[#FFF] flex flex-row h-screen">
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

      <div className="h-full w-[77%] relative flex flex-col items-center justify-center">
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

        <div
          style={{
            boxShadow: "0px 4px 68px rgba(0, 0, 0, 0.08)",
            borderRadius: 32,
          }}
          className="flex flex-col bg-[#FFF] min-h-[500px] w-[40%] p-8"
        >
          <div className="rounded-full bg-[#FFDED1] flex items-center justify-center h-[60px] w-[60px] mx-auto">
            <svg
              width="35"
              height="35"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_59)">
                <path
                  d="M15.4106 55.3125H7.11292C6.11237 55.3125 5.50874 54.7541 5.23804 54.4212C4.77069 53.8463 4.58964 53.0981 4.74163 52.3682C7.1755 40.6774 17.4927 32.1397 29.4032 31.8627C29.6016 31.8701 29.8004 31.875 30.0005 31.875C30.2023 31.875 30.4029 31.87 30.603 31.8625C33.5155 31.9289 36.3603 32.4765 39.0682 33.4934C40.2799 33.9486 41.6312 33.3349 42.0862 32.1231C42.5413 30.9114 41.9278 29.5601 40.716 29.105C40.3284 28.9599 39.9379 28.8226 39.5447 28.6935C43.4237 25.7837 45.938 21.1487 45.938 15.9375C45.938 7.14961 38.7885 0 30.0005 0C21.2125 0 14.063 7.14961 14.063 15.9375C14.063 21.1534 16.5816 25.792 20.4664 28.7013C16.9073 29.873 13.5675 31.695 10.6446 34.0992C5.28538 38.5075 1.55917 44.6562 0.152567 51.4128C-0.288292 53.53 0.239754 55.7045 1.60136 57.3786C2.95604 59.0446 4.96499 60 7.11292 60H15.4106C16.7051 60 17.7544 58.9507 17.7544 57.6562C17.7544 56.3618 16.7051 55.3125 15.4106 55.3125ZM18.7505 15.9375C18.7505 9.73418 23.7971 4.6875 30.0005 4.6875C36.2038 4.6875 41.2505 9.73418 41.2505 15.9375C41.2505 21.9571 36.498 26.8873 30.5482 27.174C30.3656 27.1703 30.1831 27.1683 30.0005 27.1679C29.8172 27.1679 29.634 27.1706 29.451 27.1739C23.5019 26.8863 18.7505 21.9565 18.7505 15.9375Z"
                  fill="#F38315"
                />
                <path
                  d="M58.2058 40.3836C57.2026 38.1395 54.9427 36.6854 52.443 36.6797H45.1182C42.4815 36.6797 40.1811 38.2336 39.2554 40.6414C39.1028 41.0363 38.9591 41.4346 38.8245 41.8359H23.4793C23.1657 41.8359 22.8552 41.8989 22.5664 42.021C22.2775 42.1432 22.0161 42.322 21.7976 42.547L17.7715 46.6941C16.8848 47.6074 16.8892 49.0616 17.7815 49.9695L21.8831 54.1427C22.1012 54.3647 22.3614 54.541 22.6483 54.6613C22.9353 54.7817 23.2434 54.8436 23.5546 54.8436H31.1718C32.4663 54.8436 33.5156 53.7943 33.5156 52.4999C33.5156 51.2054 32.4663 50.1561 31.1718 50.1561H24.5374L22.7294 48.3165L24.4704 46.5234H40.5827C41.1073 46.5234 41.6168 46.3474 42.0295 46.0235C42.4423 45.6996 42.7344 45.2466 42.8592 44.737C43.0488 43.9628 43.2867 43.2184 43.6307 42.3234C43.8576 41.7333 44.4274 41.3672 45.1238 41.3672H52.4375C53.1003 41.3687 53.6708 41.725 53.9263 42.2967C54.5555 43.7044 55.3068 45.8836 55.3124 48.2716C55.3181 50.6774 54.5676 52.9065 53.9368 54.353C53.6825 54.9363 53.1072 55.3125 52.4649 55.3125H45.0636C44.4152 55.311 43.8078 54.8938 43.5523 54.2745C43.2782 53.6099 43.0407 52.8511 42.8261 51.9545C42.5248 50.6957 41.2597 49.9194 40.0013 50.2206C38.7424 50.5219 37.9661 51.7867 38.2674 53.0455C38.5394 54.1821 38.8508 55.1687 39.2191 56.0617C40.2033 58.4481 42.4932 59.9939 45.0582 59.9999H52.4704C53.6941 60.0004 54.8914 59.6436 55.9152 58.9732C56.939 58.3029 57.7448 57.3482 58.2337 56.2263C59.0437 54.3688 60.0076 51.4789 59.9999 48.2605C59.9924 45.0509 59.0201 42.2054 58.2058 40.3836Z"
                  fill="#F38315"
                />
                <path
                  d="M50.5078 50.625C51.8022 50.625 52.8516 49.5757 52.8516 48.2812C52.8516 46.9868 51.8022 45.9375 50.5078 45.9375C49.2134 45.9375 48.1641 46.9868 48.1641 48.2812C48.1641 49.5757 49.2134 50.625 50.5078 50.625Z"
                  fill="#F38315"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_59">
                  <rect width="60" height="60" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <Components.SubHeading className="!text-2xl mt-5">
            Login To Your Student Dasboard
          </Components.SubHeading>

          <Components.Paragraph className="!text-sm mt-1">
            Welcome back! Please enter your details
          </Components.Paragraph>

          <div className="w-[80%] mx-auto mt-7 flex flex-col">
            <div className="text-[12px] ml-2 mr-auto">
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

            <div className="flex flow-row mt-3 items-center mx-2">
              <input type="checkbox" name="" id="" onClick={remember} />
              <div className="text-[12px] ml-2">Remember Me</div>
            </div>

            {secret === process.env.REACT_APP_AUTH_SECRET && (
              <div
                className="w-full text-center p-1 bg-[#F38315] text-white rounded-lg text-sm mt-3"
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Login
              </div>
            )}

            <div className="w-full flex flow-row mt-4">
              <div className="text-[10px]">
                Don't have an account?{" "}
                <span
                  className="text-[#C33B4C] hover:opacity-50 cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  signup
                </span>
              </div>

              <div
                className="text-[10px] ml-auto text-[#A7AFB2] hover:opacity-50 cursor-pointer"
                onClick={() => navigate("/forgot")}
              >
                Forgot Your Id Or Password?
              </div>
            </div>

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

            <div className="flex items-center justify-center w-full mt-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
