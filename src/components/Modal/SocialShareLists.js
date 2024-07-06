import React from "react";
import {
  FaEnvelope,
  FaSms,
  FaFacebook,
  FaInstagram,
  FaEllipsisH,
  FaLinkedin,
} from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";import ShareIconStack from "./ShareIconStack";

const SocialShareLists = ({
  isEventShareModal = false,
  url,
  progressStep = 0,
  setProgressStep,
  setInstaLastStep,
  toggleInstaWindow,
}) => {
  const eventLink = url || "";
  const linkAndText = `Check out this application, ${url} on Hoseacodes! Show your support by making a cash donation, and sharing this event to help get the word out. Any support is appreciated; thanks!`;

  let emailBody;
  let smsBody;

  if (progressStep) {
    emailBody = `Hey there! I just contributed to this awesome application and thought you might be interested in supporting it too! Join me in creating a positive change by making a cash donation. Check out the application here: ${url} Thanks for taking a look!`;
    smsBody = `I just contributed to this awesome application, ${url} and thought you may be interested in supporting it too! Join me in creating a positive change by making a cash donation. Thanks for taking a look!`;
  } else {
    emailBody = `Check out this application, ${url}?utm_source=email&utm_campaign=share on Hoseacodes! Show your support by making a cash donation, and sharing this event to help get the word out. Even a small contribution can make a huge difference. Thanks!`;

    smsBody = `Hey! Thought you’d be interested in supporting this application, ${url} on Hoseacodes! Show your support by making a cash donation, and sharing this event to help get the word out. Any support is appreciated; thanks!`;
  }

  const handleEmail = () => {
    window.open(
      `mailto:?subject=${
        progressStep
          ? "You have to check out this great application I just supported!"
          : "Thought you’d be interested in this application!"
      }&body=${emailBody}`
    );
  };

  const handleFaceBook = () => {
    const getFacebookShareButton = document.getElementById("shareFacebookBtn");
    getFacebookShareButton?.click();
  };

  const handleLinkedin = () => {
    const getLinkedinShareButton = document.getElementById(
      "shareLinkedInBtn"
    );
    getLinkedinShareButton?.click();
  };

  const handleInsta = () => {
    if (setProgressStep && setInstaLastStep) {
      setInstaLastStep(progressStep);
      setProgressStep(6);
      return;
    }
    toggleInstaWindow(true);
  };

  const handleMore = async () => {
    if (navigator.share) {
      return await navigator.share({
        text: progressStep ? smsBody : linkAndText,
      });
    }
    alert("Your browser does not support it");
  };

  const handleSms = () => {
    window.open(`sms:?&body=${smsBody}`);
  };

  const commonStyle = {
    height: "1.75rem",
    width: "1.75rem",
    color: "common.white",
    fill: "darkred"
  };

  const socialShareData = [
    {
      id: "emailBtn",
      iconName: "Email",
      onClick: handleEmail,
      Icon: <FaEnvelope style={commonStyle} />,
    },
    {
      id: "smsBtn",
      iconName: "SMS",
      display: isEventShareModal ? { display: "flex" } : { display: "none" },
      onClick: handleSms,
      Icon: <FaSms style={commonStyle} />,
    },
    {
      id: "fbBtn",
      iconName: "Facebook",
      onClick: handleFaceBook,
      Icon: <FaFacebook style={commonStyle} />,
    },
    {
      id: "LinkedInBtn",
      iconName: "LinkedIn",
      onClick: handleLinkedin,
      Icon: <FaLinkedin style={commonStyle} />,
    },
    // {
    //   id: "instaBtn",
    //   iconName: "Instagram",
    //   display: isEventShareModal ? { display: "flex" } : { display: "none" },
    //   onClick: handleInsta,
    //   Icon: <FaInstagram style={commonStyle} />,
    // },
    // {
    //   id: "moreBtn",
    //   iconName: "More",
    //   display: isEventShareModal ? { display: "flex" } : { display: "none" },
    //   onClick: handleMore,
    //   Icon: <FaEllipsisH style={commonStyle} />,
    // },
  ];

  return (
    <>
      <FacebookShareButton
        style={{ display: "none" }}
        url={`${eventLink}?utm_source=facebook&utm_campaign=share`}
        windowWidth={10000}
        windowHeight={10000}
        id="shareFacebookBtn"
      >
        share
      </FacebookShareButton>
      <LinkedinShareButton
        style={{ display: "none" }}
        url={`${eventLink}?utm_source=linkedin&utm_campaign=share`}
        windowWidth={10000}
        windowHeight={10000}
        id="shareLinkedInBtn"
      >
        share
      </LinkedinShareButton>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10% 0 0" }}>
        {socialShareData.map((socialShare, key) => {
          const { id, iconName, display, Icon, onClick } = socialShare;
          return (
            <ShareIconStack
              key={key}
              id={id}
              iconName={iconName}
              display={display}
              onClick={onClick}
            >
              {Icon}
            </ShareIconStack>
          );
        })}
        {/* <FacebookShareButton
          url={url}
          quote={"Check out this amazing content at https://example.com"}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          summary={`Building to achieve faster and secure deployment. 
		  Check out this amazing content!`}
          title={"Share This Content"}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton> */}
      </div>
    </>
  );
};

export default SocialShareLists;
