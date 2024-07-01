import { addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMeetingButtons from "../../components/Form/Zoom/CreateMeetingButtons";
import MeetingDateField from "../../components/Form/Zoom/MeetingDateField";
import MeetingNameField from "../../components/Form/Zoom/MeetingNameFIeld";
import MeetingUserField from "../../components/Form/Zoom/MeetingUserField";
import * as Components from "../../components/all";
import Layout from "../../components/Dashboard/Layout";
import { meetingsRef } from "../../lib/firebase";
import { generateMeetingID } from "./generateMeetingId";

export default function OneOnOneMeeting() {
  const navigate = useNavigate();

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
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: "uid",
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUser[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="p-4 flex-1 h-full overflow-auto text-start">
        {/* heading */}
        <Components.Paragraph className="font-bold mt-5">
          BreadCrumbs (6)
        </Components.Paragraph>

        <div className="flex flex-col h-full justify-center items-center">
          <form className="w-full max-w-lg">
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
              options={[]}
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
            <div className="my-4">
              <CreateMeetingButtons createMeeting={createMeeting} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
