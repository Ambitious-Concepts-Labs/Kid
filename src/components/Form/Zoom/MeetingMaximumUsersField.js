import React from "react";

function MeetingMaximumUsersField({ value, setSize }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.length || parseInt(inputValue) === 0) {
      setSize(1);
    } else if (parseInt(inputValue) > 50) {
      setSize(50);
    } else {
      setSize(parseInt(inputValue));
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Maximum People
      </label>
      <input
        type="number"
        min="1"
        max="50"
        placeholder="Maximum People"
        value={value}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
}

export default MeetingMaximumUsersField;
