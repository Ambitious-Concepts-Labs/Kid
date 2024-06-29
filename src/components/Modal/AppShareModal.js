import React, { useState, useEffect } from "react";
import Typography from "./Typography";
import SocialShareLists from "./SocialShareLists";
import { IoMdClose } from "react-icons/io";
import * as Components from "../all";

const AppShareModal = ({
  showShareModal,
  eventId,
  handleClose,
  url,
  title,
  description,
  message,
}) => {
  const [originalUrl, setOriginalUrl] = useState(url);
  const [isCopied, setIsCopied] = useState("");

  const origin =
    typeof window !== "undefined" &&
    window.location.origin.replace(new RegExp("https://|http://"), "");
  const linkAndText = `Check out this fundraiser, ${url} on Aimly! Show your support by making a cash donation, and sharing this event to help get the word out. Any support is appreciated; thanks!`;

  useEffect(() => {
    const link = origin;
    setOriginalUrl(
      link.includes("localhost")
        ? link.replace("localhost", "http://127.0.0.1")
        : link
    );
  }, [eventId, origin]);

  const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(text);
    setTimeout(() => setIsCopied(""), 800);
  };

  if (!showShareModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="w-[80%] absolute bg-white rounded-lg shadow-lg p-6 max-w-md">
        <button style={{position: "absolute", top: "2%", left: "2%"}} onClick={handleClose}>
          <IoMdClose className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex flex-col justify-between items-center pt-5 pb-4">
          <Typography variant="h2" style={{ fontSize: "2rem", fontWeight: "800" }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{ margin: "10px 0", paddingBottom: "2%", color: "grey" }}
          >
            {description}
          </Typography>
        </div>
        <div>
          <Typography style={{ fontWeight: "800" }} variant="overline">
            Copy Message & Application Link
          </Typography>
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ddd",
            }}
          >
            <Typography variant="body2">{message}</Typography>
          </div>
          <Components.Button
            withOutArrow={true}
            onClick={() => copyTextToClipboard(linkAndText)}
            className="mt-8 w-fit !px-5 !text-[14px]"
            text={isCopied === linkAndText ? "Copied" : "Copy"}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="overline">Share via:</Typography>
          <SocialShareLists
            isEventShareModal
            eventId={eventId}
            url={originalUrl}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Typography style={{ fontWeight: "800" }} variant="overline">
            Copy Application Link
          </Typography>
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ddd",
            }}
          >
            <Typography variant="body2">{originalUrl}</Typography>
          </div>
          <Components.Button
            withOutArrow={true}
            onClick={() => copyTextToClipboard(originalUrl)}
            className="mt-8 w-fit !px-5 !text-[14px]"
            text={isCopied === originalUrl ? "Copied" : "Copy"}
          />
        </div>
      </div>
    </div>
  );
};

export default AppShareModal;
