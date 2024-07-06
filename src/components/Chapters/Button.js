import React, { forwardRef } from "react";
import PropTypes from "prop-types";

// Utility function to conditionally join class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonStyles = {
  base:
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    success: "bg-emerald-600 text-white hover:bg-emerald-600/80",
  },
  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

const Button = forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? "span" : "button"; // Change to "span" instead of "Slot"

    const buttonClassNames = cn(
      buttonStyles.base,
      buttonStyles.variants[variant],
      buttonStyles.sizes[size],
      className
    );

    return <Component className={buttonClassNames} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "success",
  ]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
  asChild: PropTypes.bool,
  // Other button attributes can be specified using ...props
};

export { Button };
