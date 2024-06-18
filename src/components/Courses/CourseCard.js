import React from "react";
import { CourseProgress } from "./CourseProgress";

// Utility function to format price
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// IconBadge component (simple implementation)
const IconBadge = ({ size, icon: Icon }) => (
  <div className={`icon-badge icon-badge-${size}`}>
    <Icon />
  </div>
);

// CourseCard component
const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}) => {
  return (
    <a
      href={`/dashboard/courses/${id}`}
      className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full"
    >
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <img
          className="object-cover w-full h-full"
          alt={title}
          src={imageUrl}
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </div>
        <p className="text-xs text-muted-foreground">{category}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge
              size="sm"
              icon={
                () => <span> 🔖</span>
                //   <BookOpen className="icon" />
              }
            />
            <span>
              {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>
        {progress !== null ? (
          <CourseProgress
            size="sm"
            value={progress}
            variant={progress === 100 ? "success" : "default"}
          />
        ) : (
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        )}
      </div>
    </a>
  );
};

export default CourseCard;
