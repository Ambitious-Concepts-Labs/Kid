import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingNameField from "./FormComponents/MeetingNameFIeld";
import MeetingUserField from "./FormComponents/MeetingUserField";

// import Header from "../components/Header";
// import useFetchUsers from "../hooks/useFetchUsers";
// import useToast from "../hooks/useToast";
import { meetingsRef } from "../../firebase";
import { generateMeetingID } from "./generateMeetingId";
// import { FieldErrorType, UserType } from "./types";
import * as Components from "../../components/all";
import Layout from "../../components/Dashboard/Layout";

export default function OneOnOneMeeting() {
  // const [users] = useFetchUsers();
  // const [createToast] = useToast();
  // const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(moment());
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

  // const onUserChange = (selectedOptions: Array<UserType>) => {
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
        // createdBy: uid,
        createdBy: "uid",
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUser[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      // createToast({
      //   title: "One on One Meeting Created Successfully",
      //   type: "success",
      // });
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

        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
          }}
          >
          {/* <Header /> */}
          <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiForm>
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
                // options={users}
                options={{}}
                onChange={onUserChange}
                selectedOptions={selectedUser}
                singleSelection={{ asPlainText: true }}
                isClearable={false}
                placeholder="Select a User"
                />
              <MeetingDateField selected={startDate} setStartDate={setStartDate} />
              <EuiSpacer />
              <CreateMeetingButtons createMeeting={createMeeting} />
            </EuiForm>
          </EuiFlexGroup>
        </div>
        </div>
    </Layout>
  );
}
