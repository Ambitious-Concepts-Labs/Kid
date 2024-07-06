import React from "react";

const typographyStyles = {
  captionDark: {
    fontSize: "0.75rem",
    fontWeight: "400",
    color: "#000",
  },
  // Add other variant styles here
};

const Typography = ({
  display = "block",
  align = "left",
  variant = "body1",
  style,
  children,
}) => {
  const variantStyle = typographyStyles[variant] || typographyStyles.body1;

  return (
    <div
      style={{
        display,
        textAlign: align,
        ...variantStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Typography;
