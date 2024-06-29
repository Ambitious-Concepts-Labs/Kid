import React from "react";

// Utility function to concatenate class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Custom Checkbox Component
const Checkbox = React.forwardRef(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary text-primary-foreground" : "",
          className
        )}
        tabIndex={0}
        role="checkbox"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        {...props}
      >
        {checked && (
          <div className="flex items-center justify-center text-current">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
