import React, { useState } from "react";
import { cn } from "../../utils/helperfunctions"

const CategoryItem = ({ label, icon: Icon, value }) => {
  // Mocking router and pathname for pure React
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    if (isSelected) {
      searchParams.delete("categoryId");
    } else {
      searchParams.set("categoryId", value);
    }

    const newUrl = `${currentPath}?${searchParams.toString()}`;
    setCurrentPath(newUrl);
    window.history.pushState({}, "", newUrl); // Update URL without reloading
  };

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
