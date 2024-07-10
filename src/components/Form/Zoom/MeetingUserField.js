import React from "react";

function MeetingUserField({
  label,
  isInvalid,
  error,
  options,
  onChange,
  selectedOptions,
  singleSelection = false,
  isClearable,
  placeholder,
}) {
  const handleChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const regex = /\b(Student|Admin|Teacher)\b/gi;
    const updatedValue = value[0].replace(regex, "").trim();
    onChange(singleSelection ? updatedValue : value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        // multiple={!singleSelection}
        value={selectedOptions}
        onChange={handleChange}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
          isInvalid ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      >
        {isClearable && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.email}>
            {option.isAdmin ? "Admin" : option.isTeacher ? "Teacher" : "Student"}
            &nbsp;
            {option.username ? option.username ? option.email : option.email : "Invalid User"}
          </option>
        ))}
      </select>
      {isInvalid && error && error.length > 0 && (
        <p className="text-red-500 text-sm mt-1">{error.join(", ")}</p>
      )}
    </div>
  );
}

export default MeetingUserField;
