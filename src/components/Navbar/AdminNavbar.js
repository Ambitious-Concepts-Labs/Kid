import React, { useEffect, useState } from "react";
import * as Components from "../all";
import { useNavigate } from "react-router-dom";
import { logout } from "../../lib/firebase";
import Select from "react-select";
import useUserData from "../../hooks/useUserData";

const image = "https://d10grw5om5v513.cloudfront.net/assets/images/adminImage.png";

export default function AdminNavbar({ page }) {
  const navigate = useNavigate();
  const { currentUser, user, loading } = useUserData();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [selectedOption, setSelectedOption] = useState(name || "");
  const adminOptions = [
    { value: name, label: name },
    { value: "Admin Mode", label: "Admin Mode" },
    { value: "Teacher Mode", label: "Teacher Mode" },
    { value: "Profile", label: "Profile" },
    { value: "Logout", label: "Logout" },
  ];
  const studentOptions = [
    { value: name, label: name },
    { value: "Profile", label: "Profile" },
    { value: "Logout", label: "Logout" },
  ];

  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar);
      setName(currentUser.name);
      setIsAdmin(currentUser.isAdmin);
      setIsTeacher(currentUser.isTeacher);
    }
  }, [currentUser]);

  useEffect(() => {
    
  }, [page]);

  useEffect(() => {
    // if (!currentUser) return navigate("/");
    if (selectedOption.value === "Admin Mode")
      return navigate("/dashboard/courses/browse");
    if (selectedOption.value === "Teacher Mode")
      return navigate("/dashboard/teacher/courses");
    if (selectedOption.value === "Profile") return navigate("/dashboard/profile");
    if (selectedOption.value === "Logout") {
      logout();
      navigate("/login");
    }
  }, [currentUser, selectedOption]);

  return (
    <div
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.06)" }}
      className="flex items-center h-[50px] bg-white px-4"
    >
      <Components.BigParagraph className="font-[riffic] !text-base">
        {page}
      </Components.BigParagraph>

      {/* search */}
      <div
        style={{ border: "1px solid #C9CCDE" }}
        className="flex items-center rounded-md overflow-hidden ml-16 px-2"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2766 16.117L11.8073 11.6477C12.8813 10.3583 13.4169 8.70451 13.3026 7.03032C13.1883 5.35613 12.433 3.79046 11.1937 2.65899C9.95445 1.52753 8.32669 0.917392 6.64904 0.955511C4.97139 0.993631 3.37302 1.67707 2.18644 2.86365C0.999854 4.05024 0.316415 5.64861 0.278296 7.32626C0.240176 9.00391 0.850311 10.6317 1.98178 11.8709C3.11324 13.1102 4.67892 13.8655 6.3531 13.9798C8.02729 14.0941 9.68109 13.5585 10.9705 12.4845L15.4398 16.9538L16.2766 16.117ZM1.48139 7.48489C1.48139 6.43145 1.79377 5.40167 2.37903 4.52576C2.96429 3.64986 3.79614 2.96718 4.76939 2.56405C5.74264 2.16091 6.81358 2.05543 7.84678 2.26095C8.87997 2.46647 9.82903 2.97375 10.5739 3.71864C11.3188 4.46353 11.8261 5.41258 12.0316 6.44578C12.2371 7.47898 12.1316 8.54991 11.7285 9.52316C11.3254 10.4964 10.6427 11.3283 9.76679 11.9135C8.89089 12.4988 7.86111 12.8112 6.80767 12.8112C5.39553 12.8096 4.04168 12.2479 3.04315 11.2494C2.04462 10.2509 1.48296 8.89702 1.48139 7.48489Z"
            fill="#C9CCDE"
          />
        </svg>

        <input
          type="text"
          className="px-2 text-sm py-0.5"
          placeholder="Search..."
        />
      </div>

      {/* icons */}
      <svg
        className="ml-auto"
        width="18"
        height="16"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5714 9.52205C4.78445 9.34767 5.10516 9.37107 5.28804 9.57424C5.47074 9.7776 5.44622 10.0839 5.23318 10.2585L0.466582 14.1675C0.824239 14.8413 1.37059 15.4071 2.04462 15.8026C2.71865 16.1982 3.49427 16.4078 4.28558 16.4084H15.7144C16.5087 16.4082 17.2873 16.1973 17.9634 15.7992C18.6395 15.4011 19.1863 14.8315 19.543 14.1539L13.9191 9.55388L13.3048 9.90391C12.4076 10.4213 11.3793 10.6947 10.3311 10.6947C9.28284 10.6947 8.25435 10.4213 7.3571 9.90391L0 5.69025V12.3175C0.000188525 12.6078 0.0320512 12.8973 0.0952133 13.1811L4.5714 9.52205Z"
          fill="#A7AFB2"
        />
        <path
          d="M15.7144 0.953857H4.28563C3.2849 0.955297 2.31597 1.29039 1.54657 1.90116C0.776978 2.51215 0.255277 3.36031 0.0712891 4.29937L8.01916 8.85386C8.71789 9.25536 9.51804 9.46752 10.3334 9.46752C11.149 9.46752 11.9492 9.25534 12.6479 8.85386L13.0099 8.64474L13.8148 8.18566L19.9768 4.65388H19.9766C19.8748 3.64194 19.382 2.70238 18.5941 2.01832C17.8062 1.33445 16.7798 0.954921 15.7147 0.953862L15.7144 0.953857Z"
          fill="#A7AFB2"
        />
        <path
          d="M19.9097 13.1676C19.9689 12.8878 19.9992 12.6031 20 12.3175V6.06757L14.838 9.02203L19.9097 13.1676Z"
          fill="#A7AFB2"
        />
      </svg>

      <svg
        className="ml-3"
        width="14"
        height="18"
        viewBox="0 0 18 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5829 16.2222L15.1867 14.2472C14.9825 13.9407 14.8803 13.6003 14.8803 13.2597V8.28842C14.8803 4.78134 12.2244 1.921 8.7853 1.75081C7.01476 1.64858 5.34617 2.29568 4.08626 3.52136C2.79234 4.74733 2.11123 6.38162 2.11123 8.15217V13.2939C2.11123 13.6686 2.00899 14.009 1.80481 14.2814L0.408652 16.2564C0.136215 16.6311 0 17.0737 0 17.5163C0 18.708 0.987478 19.6955 2.17923 19.6955H14.8459C16.0376 19.6955 17.0251 18.7081 17.0251 17.5163C16.9914 17.0394 16.8552 16.5968 16.5828 16.2221L16.5829 16.2222Z"
          fill="#A7AFB2"
        />
        <path
          d="M10.6248 20.4788H6.33433C5.85771 20.4788 5.48303 20.8534 5.48303 21.3301C5.48303 21.8067 5.8577 22.1814 6.33433 22.1814H10.5908C11.0674 22.1814 11.4421 21.8067 11.4421 21.3301C11.4421 20.8532 11.0674 20.4788 10.6248 20.4788Z"
          fill="#A7AFB2"
        />
        <circle cx="14.1512" cy="4.09862" r="3.14477" fill="#EC3C46" />
      </svg>

      <img
        src={avatar || image}
        alt=""
        className="rounded-full h-5 aspect-square ml-4"
      />
      {
          isAdmin || isTeacher ?
        <Select
          className="font-[Manrope] text-sm ml-1"
          defaultValue={adminOptions[0].value}
          onChange={setSelectedOption}
          options={adminOptions}
          placeholder={name}
        />
          :
        <Select
        	className="font-[Manrope] text-sm ml-1"
        	defaultValue={studentOptions[0].value}
        	onChange={setSelectedOption}
        	options={studentOptions}
        	placeholder={name}
        />
      }
    </div>
  );
}
