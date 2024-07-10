import React, { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import { db, mutateFireStoreDoc } from "../../lib/firebase";
import CreateMeetingButtons from "../../components/Form/Zoom/CreateMeetingButtons";
import MeetingDateField from "../../components/Form/Zoom/MeetingDateField";
import MeetingMaximumUsersField from "../../components/Form/Zoom/MeetingMaximumUsersField";
import MeetingNameField from "../../components/Form/Zoom/MeetingNameFIeld";
import MeetingUserField from "../../components/Form/Zoom/MeetingUserField";

export default function EditFlyout({ closeFlyout, meeting }) {
  const [meetingName, setMeetingName] = useState(meeting.meetingName);
  const [meetingType] = useState(meeting.meetingType);
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(new Date(meeting.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // Fetch users if needed
    // Example:
    // setSelectedUser(meeting.invitedUsers.map(userId => ({ uid: userId, name: 'Dummy User' })));
  }, []);

  const [showErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });

  const editMeeting = async () => {
    const editedMeeting = {
      ...meeting,
      meetingName,
      meetingType,
      invitedUsers: selectedUser.map((user) => user.uid),
      maxUsers: size,
      meetingDate: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      status: !status,
    };
    delete editedMeeting.docId;
    const docRef = doc(db, "meetings", meeting.docId);
    await mutateFireStoreDoc(docRef, editedMeeting);
    closeFlyout(true);
  };

  const handleUserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {meeting.meetingName}
                </h3>
                <div className="mb-4">
                  <MeetingNameField
                    label="Meeting name"
                    isInvalid={showErrors.meetingName.show}
                    error={showErrors.meetingName.message}
                    placeholder="Meeting name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                  />
                </div>
                {meetingType === "anyone-can-join" ? (
                  <div className="mb-4">
                    <MeetingMaximumUsersField value={size} setSize={setSize} />
                  </div>
                ) : (
                  <div className="mb-4">
                    <MeetingUserField
                      label="Invite Users"
                      isInvalid={showErrors.meetingUsers.show}
                      error={showErrors.meetingUsers.message}
                      options={[]}
                      onChange={handleUserChange}
                      selectedOptions={selectedUser}
                      singleSelection={
                        meetingType === "1-on-1" ? { asPlainText: true } : false
                      }
                      isClearable={false}
                      placeholder="Select a Users"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <MeetingDateField
                    selected={startDate}
                    setStartDate={setStartDate}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="cancelMeeting" className="flex items-center">
                    <span className="mr-2">Cancel Meeting</span>
                    <input
                      id="cancelMeeting"
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <CreateMeetingButtons
              createMeeting={editMeeting}
              isEdit
              closeFlyout={closeFlyout}
            />
            <button
              onClick={() => closeFlyout()}
              type="button"
              className="mr-2 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
