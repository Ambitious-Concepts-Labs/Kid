import React from "react";
import { cn } from "../utils/helperfunctions";

// Default styles
const defaultStyles = {
  background: "rounded-full flex items-center justify-center",
  backgroundVariants: {
    default: "bg-sky-100",
    success: "bg-emerald-100",
  },
  backgroundSizes: {
    default: "p-2",
    sm: "p-1",
  },
  iconVariants: {
    default: "text-sky-700",
    success: "text-emerald-700",
  },
  iconSizes: {
    default: "h-8 w-8",
    sm: "h-4 w-4",
  },
};

// IconBadge component
const IconBadge = ({ icon: Icon, variant = "default", size = "default" }) => {
  const backgroundClass = cn(
    defaultStyles.background,
    defaultStyles.backgroundVariants[variant],
    defaultStyles.backgroundSizes[size]
  );

  const iconClass = cn(
    defaultStyles.iconVariants[variant],
    defaultStyles.iconSizes[size]
  );

  return (
    <div className={backgroundClass}>
      <Icon className={iconClass} />
    </div>
  );
};

export default IconBadge;
