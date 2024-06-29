import React from "react";
import Typography from "./Typography";

const IconButton = ({ id, onClick, style, children }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        padding: 0,
        background: "none",
      }}
    >
      {children}
    </button>
  );
};

const ShareIconStack = ({
  id,
  children,
  iconName,
  onClick,
  display,
  color,
}) => {
  const commonStyle = {
    height: "3rem",
    width: "3rem",
    borderRadius: "2.188rem",
    backgroundColor: color || (iconName === "Facebook" ? "" : "secondary.main"),
  };

  return (
    <div
      style={{
        width: "min-content",
        height: "4.68rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <IconButton
        id={id}
        style={commonStyle}
      >
        {children}
      </IconButton>
      <Typography variant="captionDark">{iconName}</Typography>
    </div>
  );
};

export default ShareIconStack;
