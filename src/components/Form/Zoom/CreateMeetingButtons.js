import React from "react";
import { useNavigate } from "react-router-dom";

function CreateMeetingButtons({ createMeeting, isEdit = false, closeFlyout }) {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4">
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => (isEdit ? closeFlyout() : navigate("/dashboard/zoom/create"))}
        >
          Cancel
        </button>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
          onClick={createMeeting}
        >
          {isEdit ? "Edit Meeting" : "Create Meeting"}
        </button>
      </div>
    </div>
  );
}

export default CreateMeetingButtons;
