import React from "react";

// Mock icons for CheckCircle, Lock, and PlayCircle
const CheckCircle = ({ size, className }) => (
  <div
    className={`icon check-circle ${className}`}
    style={{ fontSize: size }}
  />
);
const Lock = ({ size, className }) => (
  <div className={`icon lock ${className}`} style={{ fontSize: size }} />
);
const PlayCircle = ({ size, className }) => (
  <div className={`icon play-circle ${className}`} style={{ fontSize: size }} />
);

const CourseSidebarItem = ({ id, label, isCompleted, courseId, isLocked }) => {
  const [pathname, setPathname] = React.useState(window.location.pathname);

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname.includes(id);

  const onClick = () => {
    window.location.href = `/dashboard/courses/${courseId}/chapters/${id}`;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20
        ${
          isActive
            ? "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700"
            : ""
        }
        ${isCompleted ? "text-emerald-700 hover:text-emerald-700" : ""}
        ${isCompleted && isActive ? "bg-emerald-200/20" : ""}`}
    >
      <div className="flex items-center gap-x-2 py-4">
        <span> {isLocked ? <span>🔒</span> : <span>✅</span>}</span>
        <Icon
          size={22}
          className={`text-slate-500 ${isActive ? "text-slate-700" : ""} ${
            isCompleted ? "text-emerald-700" : ""
          }`}
        />
        {label}
      </div>
      <div
        className={`ml-auto opacity-0 border-2 border-slate-700 h-full transition-all ${
          isActive ? "opacity-100" : ""
        } ${isCompleted ? "border-emerald-700" : ""}`}
      />
    </button>
  );
};

export default CourseSidebarItem;
