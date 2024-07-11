import React, { useEffect, useState } from "react";
import * as Components from "../../../components/all";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../lib/firebase";

const logo = "https://d10grw5om5v513.cloudfront.net/assets/images/logo1.png";

function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
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
          className="flex flex-col bg-[#FFF] min-h-[500px] w-[40%] p-8 justify-center"
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
              <g clip-path="url(#clip0_1_241)">
                <path
                  d="M30 12.8909L31.3501 14.7076L30 16.4064C25.9998 16.4064 22.7462 19.6653 22.7462 23.6719V26.4551C22.7462 27.4266 21.96 28.2129 20.9912 28.2129C20.0224 28.2129 19.2362 27.4266 19.2362 26.4551V23.6719C19.2362 17.7271 24.0647 12.8909 30 12.8909Z"
                  fill="#C33B4C"
                />
                <path
                  d="M40.7638 23.672V26.4552C40.7638 27.4267 39.9776 28.213 39.0088 28.213C38.04 28.213 37.2538 27.4267 37.2538 26.4552V23.672C37.2538 19.6653 34.0001 16.4065 30 16.4065V12.8909C35.9353 12.8909 40.7638 17.7271 40.7638 23.672Z"
                  fill="#F38315"
                />
                <path
                  d="M30 24.6974L36.289 37.0113L30 45.4686H21.3305C18.6712 45.4686 16.5067 43.3007 16.5067 40.6358V29.5301C16.5067 26.8652 18.6712 24.6973 21.3305 24.6973H30V24.6974Z"
                  fill="#FF884D"
                />
                <path
                  d="M43.4933 29.5301V40.6358C43.4933 43.3007 41.3289 45.4686 38.6695 45.4686H30V24.6974H38.6695C41.3289 24.6974 43.4933 26.8652 43.4933 29.5301Z"
                  fill="#FF5533"
                />
                <path
                  d="M27.3751 4.51395C27.3708 3.91852 27.0373 3.34547 26.5286 3.03996L21.9164 0.253008C21.0864 -0.248554 20.0078 0.0187503 19.5071 0.850078C19.0065 1.68141 19.2734 2.76176 20.1033 3.2632L21.1288 3.88289C16.4626 5.47582 12.2629 8.3168 9.02461 12.1256C4.79203 17.1042 2.46094 23.4521 2.46094 30C2.46094 36.5479 4.79203 42.8958 9.02473 47.8744C13.2091 52.7961 18.9984 56.1036 25.3262 57.1875C25.4264 57.2046 25.5259 57.2129 25.6242 57.2129C26.4635 57.2129 27.2057 56.6078 27.3519 55.7511C27.5153 54.7942 26.8733 53.8859 25.918 53.7221C20.3996 52.7768 15.3492 49.8906 11.6971 45.595C8.00438 41.2519 5.97082 35.7135 5.97082 30C5.97082 24.2865 8.00438 18.7481 11.697 14.4049C14.4802 11.1313 18.0758 8.6775 22.0714 7.27617L21.4491 8.38277C20.9733 9.22863 21.2721 10.3005 22.1166 10.777C22.3788 10.9256 22.675 11.0036 22.9764 11.0037C23.5894 11.0037 24.1846 10.6814 24.507 10.1084L27.1447 5.41887C27.2982 5.14395 27.3846 4.82965 27.3751 4.51395Z"
                  fill="#F38315"
                />
                <path
                  d="M50.9753 12.1256C46.7908 7.20387 41.0016 3.89637 34.6738 2.8125C33.7181 2.64903 32.8114 3.29192 32.6481 4.24875C32.4847 5.20571 33.1267 6.11403 34.082 6.27774C39.6003 7.22309 44.6508 10.1093 48.3029 14.4049C51.9955 18.7481 54.0291 24.2866 54.0291 30C54.0291 35.7134 51.9955 41.2519 48.3029 45.5951C45.5197 48.8687 41.9241 51.3225 37.9284 52.7238L38.5508 51.6172C39.0266 50.7714 38.7278 49.6995 37.8833 49.223C37.0389 48.7467 35.9687 49.0458 35.4929 49.8916L32.8551 54.5811C32.3805 55.3794 32.6686 56.4939 33.4714 56.96L38.0836 59.747C38.3564 59.9125 38.6694 60 38.9885 60C39.2913 60.0003 39.589 59.9221 39.8527 59.7731C40.1163 59.6242 40.3368 59.4095 40.4928 59.1499C40.9935 58.3186 40.7266 57.2382 39.8967 56.7368L38.8712 56.1171C43.5374 54.5242 47.7371 51.6832 50.9754 47.8744C55.208 42.8958 57.5391 36.548 57.5391 30C57.5391 23.452 55.208 17.1042 50.9753 12.1256Z"
                  fill="#C33B4C"
                />
                <path
                  d="M30 32.1094L31.147 34.888L30 38.0565C29.0312 38.0565 28.245 37.2702 28.245 36.2987V33.8672C28.245 32.8969 29.0312 32.1094 30 32.1094Z"
                  fill="#E6F7FF"
                />
                <path
                  d="M31.755 33.8672V36.2988C31.755 37.2703 30.9688 38.0566 30 38.0566V32.1094C30.9688 32.1094 31.755 32.8969 31.755 33.8672Z"
                  fill="#CCEEFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_241">
                  <rect width="60" height="60" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/*  */}
          <Components.SubHeading className="!text-2xl mt-5">
            Password Reset{" "}
          </Components.SubHeading>

          {/*  */}
          <Components.Paragraph className="!text-sm mt-1 mx-5">
            If you have lost your passowrd or wosh to reset it,use the link
            below to get started
          </Components.Paragraph>

          {/*inputs*/}
          <div className="w-[80%] mx-auto mt-7 flex flex-col">
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

            {/* button */}
            {secret === process.env.REACT_APP_AUTH_SECRET ? (
              <div
                className="w-full text-center p-1 bg-[#F38315] text-white rounded-lg text-sm mt-5"
                onClick={() => sendPasswordReset(email)}
              >
                Reset Your Password
              </div>
            ) : (
              <div className="pt-4">Secret Required To Reset Password</div>
            )}
          </div>

          {/*  */}
          <Components.Paragraph className="!text-[12px] text-[#7B8589] mt-3 text-justify">
            If you did not request a password reset, you can safely ignore this
            email. Only a person with access to your email can reset your
            account password.
          </Components.Paragraph>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;

