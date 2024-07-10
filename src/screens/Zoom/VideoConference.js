import React, { useState, lazy, Suspense } from "react";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Dashboard/Layout";
import * as Components from "../../components/all";
import { meetingsRef } from "../../lib/firebase";
import { generateMeetingID } from "./generateMeetingId";

const CreateMeetingButtons = lazy(() => import('../../components/Form/Zoom/CreateMeetingButtons'));
const MeetingDateField = lazy(() => import('../../components/Form/Zoom/MeetingDateField'));
const MeetingMaximumUsersField = lazy(() => import('../../components/Form/Zoom/MeetingMaximumUsersField'));
const MeetingNameField = lazy(() => import('../../components/Form/Zoom/MeetingNameFIeld'));
const MeetingUserField = lazy(() => import('../../components/Form/Zoom/MeetingUserField'));

export default function VideoConference() {
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState();
  const [size, setSize] = useState(1);
  const [showErrors, setShowErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);

  const onUserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length && !anyoneCanJoin) {
      showErrorsClone.meetingUsers.show = true;
      showErrorsClone.meetingUsers.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUsers.show = false;
      showErrorsClone.meetingUsers.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: "uid",
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
        invitedUsers: anyoneCanJoin ? [] : selectedUser.map((user) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="p-4 flex-1 h-full overflow-auto text-start">
        <Components.Paragraph className="font-bold mt-5">
          BreadCrumbs (6)
        </Components.Paragraph>

        <div className="flex flex-col h-full justify-center items-center">
          <form className="w-full max-w-lg">
            <div className="flex items-center mb-4">
              <label className="flex-grow text-gray-700">Anyone can Join</label>
              <input
                type="checkbox"
                checked={anyoneCanJoin}
                onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                className="ml-2"
              />
            </div>

            <Suspense fallback={<div>Loading...</div>}>
              <MeetingNameField
                label="Meeting name"
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
                placeholder="Meeting name"
                value={meetingName}
                setMeetingName={setMeetingName}
              />

              {anyoneCanJoin ? (
                <MeetingMaximumUsersField value={size} setSize={setSize} />
              ) : (
                <MeetingUserField
                  label="Invite Users"
                  isInvalid={showErrors.meetingUsers.show}
                  error={showErrors.meetingUsers.message}
                  options={[]}
                  onChange={onUserChange}
                  selectedOptions={selectedUser}
                  isClearable={false}
                  placeholder="Select Users"
                />
              )}

              <MeetingDateField
                selected={startDate}
                setStartDate={setStartDate}
              />
              <div className="my-4">
                <CreateMeetingButtons createMeeting={createMeeting} />
              </div>
            </Suspense>
          </form>
        </div>
      </div>
    </Layout>
  );
}
