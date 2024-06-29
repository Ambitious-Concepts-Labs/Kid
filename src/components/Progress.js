import React, { forwardRef } from "react";
import { cn } from "../utils/helperfunctions";

// Variants utility function
const progressVariants = (variant = "default") => {
  const baseClass = "h-full w-full flex-1 transition-all";
  const variantClass = {
    default: "bg-sky-600",
    success: "bg-emerald-700",
  };

  return `${baseClass} ${variantClass[variant]}`;
};

// Progress component
const Progress = forwardRef(
  ({ className, value, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className={cn(progressVariants(variant))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
