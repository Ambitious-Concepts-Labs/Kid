import React from "react";

function MeetingNameField({
  label,
  isInvalid,
  error,
  placeholder,
  value,
  setMeetingName,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
          isInvalid ? "border-red-500" : "border-gray-300"
        }`}
      />
      {isInvalid && error && error.length > 0 && (
        <p className="text-red-500 text-sm mt-1">{error.join(", ")}</p>
      )}
    </div>
  );
}

export default MeetingNameField;
