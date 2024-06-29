import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import EditFlyout from "./EditFlyout";
// import Header from "../components/Header";
import { meetingsRef } from "../../firebase";
// import { MeetingType } from "./types";
import * as Components from "../../components/all";
import Layout from "../../components/Dashboard/Layout";

export default function MyMeetings() {
  // const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  // const [editMeeting, setEditMeeting] = useState<MeetingType>();
  const [editMeeting, setEditMeeting] = useState();
  const getMyMeetings = useCallback(async () => {
    const firestoreQuery = query(
      meetingsRef,
      // where("createdBy", "==", userInfo?.uid)
    );
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      // const myMeetings: Array<MeetingType> = [];
      const myMeetings = [];
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          // ...(meeting.data() as MeetingType),
          ...(meeting.data()),
        });
      });
      setMeetings(myMeetings);
    }
  // }, [userInfo?.uid]);
  }, []);
  useEffect(() => {
  //   if (userInfo) getMyMeetings();
  // }, [userInfo, getMyMeetings]);
  }, [getMyMeetings]);

  // const openEditFlyout = (meeting: MeetingType) => {
  const openEditFlyout = (meeting) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };

  const meetingColumns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      // render: (meeting: MeetingType) => {
      render: (meeting) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
    },
    {
      field: "",
      name: "Edit",
      width: "5%",
      // render: (meeting: MeetingType) => {
      render: (meeting) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType="indexEdit"
            color="danger"
            display="base"
            isDisabled={
              moment(meeting.meetingDate).isBefore(moment().format("L")) ||
              !meeting.status
            }
            onClick={() => openEditFlyout(meeting)}
          />
        );
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      width: "5%",
      // render: (meetingId: string) => {
      render: (meetingId) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {/* {(copy: any) => ( */}
            {(copy) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

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
          <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
            <EuiFlexItem>
              <EuiPanel>
                <EuiBasicTable items={meetings} columns={meetingColumns} />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          {showEditFlyout && (
            // <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
            <EditFlyout closeFlyout={closeEditFlyout} meeting={"editMeeting!"} />
            )}
        </div>
        </div>
    </Layout>
  );
}
