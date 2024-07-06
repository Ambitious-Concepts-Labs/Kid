import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
// Custom Input component
const Input = ({ className, placeholder, value, onChange }) => (
  <input
    type="text"
    className={`border rounded-md px-4 py-2 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);


// Main SearchInput component
const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      <svg
        className="h-4 w-4 absolute top-3 left-3 text-slate-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
