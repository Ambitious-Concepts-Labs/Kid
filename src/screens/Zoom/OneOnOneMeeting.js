import { addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMeetingButtons from "../../components/Form/Zoom/CreateMeetingButtons";
import MeetingDateField from "../../components/Form/Zoom/MeetingDateField";
import MeetingNameField from "../../components/Form/Zoom/MeetingNameFIeld";
import MeetingUserField from "../../components/Form/Zoom/MeetingUserField";
import Layout from "../../components/Dashboard/Layout";
import { meetingsRef } from "../../lib/firebase";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { createCall } from "../../utils/zoomFunctions";

export default function OneOnOneMeeting(props) {
  const {
    pc,
    currentUser,
    callInputRef,
    hangupButtonRef,
    setCallId,
    callButtonRef,
    webcamButtonRef,
  } = props;
  const navigate = useNavigate();
  const users = useGetAllUsers();
  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState();
  const [showErrors, setShowErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions) => {
    setSelectedUser([selectedOptions]);
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
    if (!selectedUser.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    console.log(validateForm());
    if (!validateForm()) {
      try {
        await addDoc(meetingsRef, {
          createdBy: currentUser.uid,
          meetingId: callInputRef.current.value,
          meetingName,
          meetingType: "1-on-1",
          invitedUsers: [selectedUser[0]],
          meetingDate: startDate,
          maxUsers: 1,
          status: true,
        });
        navigate("/dashboard/zoom/mymeetings");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  return (
    <Layout
      crumbs={[
        { label: "Home", link: "/dashboard" },
        { label: "Zoom", link: "/dashboard/zoom" },
        { label: "Create Meeting", link: "/dashboard/zoom/create" },
        { label: "Create 1 on 1 Meeting" },
      ]}
    >
      <div className="p-4 flex-1 h-full overflow-auto text-start">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-full max-w-lg">
            <MeetingNameField
              label="Meeting name"
              isInvalid={showErrors.meetingName.show}
              error={showErrors.meetingName.message}
              placeholder="Meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />
            <MeetingUserField
              label="Invite User"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
              placeholder="Select a User"
            />
            <MeetingDateField
              selected={startDate}
              setStartDate={setStartDate}
            />
            <p>Answer the call from a different browser window or device</p>
            <input
              ref={callInputRef}
              className="border border-gray-300 p-2 rounded w-full mt-2"
            />
            <div className="my-4">
              <CreateMeetingButtons
                callButtonRef={callButtonRef}
                webcamButtonRef={webcamButtonRef}
                callInputRef={callInputRef}
                hangupButtonRef={hangupButtonRef}
                setCallId={setCallId}
                pc={pc}
                createCall={createCall}
                createMeeting={createMeeting}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
