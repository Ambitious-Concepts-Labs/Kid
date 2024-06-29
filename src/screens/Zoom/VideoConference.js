import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "./FormComponents/MeetingNameFIeld";
import MeetingUserField from "./FormComponents/MeetingUserField";
import * as Components from "../../components/all";

// import Header from "../components/Header";
// import useFetchUsers from "../hooks/useFetchUsers";
// import useToast from "../hooks/useToast";
import { meetingsRef } from "../../firebase";
import { generateMeetingID } from "./generateMeetingId";
import Layout from "../../components/Dashboard/Layout";
// import { FieldErrorType, UserType } from "./types";

export default function VideoConference() {
  // const [users] = useFetchUsers();
  // const [createToast] = useToast();
  // const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(moment());
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
        // createdBy: uid,
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
        invitedUsers: anyoneCanJoin
          ? []
          // : selectedUser.map((user: UserType) => user.uid),
          : selectedUser.map((user) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
      // createToast({
      //   title: anyoneCanJoin
      //     ? "Anyone can join meeting created successfully"
      //     : "Video Conference created successfully.",
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
            <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
              <EuiSwitch
                showLabel={false}
                label="Anyone Can Join"
                checked={anyoneCanJoin}
                onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                compressed
                />
            </EuiFormRow>

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
                // options={users}
                options={{}}
                onChange={onUserChange}
                selectedOptions={selectedUser}
                isClearable={false}
                placeholder="Select a Users"
                />
                )}
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
