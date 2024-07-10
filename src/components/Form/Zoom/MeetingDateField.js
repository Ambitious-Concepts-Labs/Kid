import React from "react";

function MeetingDateField({ selected, setStartDate }) {
  const handleDateChange = (event) => {
    setStartDate(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Set Meeting Date
      </label>
      <input
        type="date"
        value={selected}
        onChange={handleDateChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
}

export default MeetingDateField;
