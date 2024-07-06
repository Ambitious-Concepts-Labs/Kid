import React from "react";
import { cn } from "../utils/helperfunctions";

// Custom banner variants
const bannerVariants = (variant) => {
  const baseClass = "border text-center p-4 text-sm flex items-center w-full";
  const variants = {
    warning: "bg-yellow-200/80 border-yellow-300 text-primary",
    success: "bg-emerald-700 border-emerald-800 text-secondary",
  };
  return cn(baseClass, variants[variant]);
};

// Custom SVG icons to replace lucide-react icons
const AlertTriangle = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0zM12 9v4m0 4h.01"
    ></path>
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m1-7a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ label, variant = "warning" }) => {
  const Icon = iconMap[variant];

  return (
    <div className={bannerVariants(variant)}>
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </div>
  );
};

export default Banner;
