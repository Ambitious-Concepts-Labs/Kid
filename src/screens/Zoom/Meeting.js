import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";

import { getDocs, query } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
// import Header from "../components/Header";
import * as Components from "../../components/all";

import { meetingsRef } from "../../firebase";
import Layout from "../../components/Dashboard/Layout";
// import { MeetingType } from "./types";

export default function Meeting() {
  // const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        // const myMeetings: Array<MeetingType> = [];
        const myMeetings = [];
        fetchedMeetings.forEach((meeting) => {
          // const data = meeting.data() as MeetingType;
          const data = meeting.data();
          // if (data.createdBy === userInfo?.uid)
          //   myMeetings.push(meeting.data() as MeetingType);
          // else if (data.meetingType === "anyone-can-join")
          //   myMeetings.push(meeting.data() as MeetingType);
          // else {
          //   const index = data.invitedUsers.findIndex(
          //     (user: string) => user === userInfo?.uid
          //   );
            // if (index !== -1) {
            //   myMeetings.push(meeting.data() as MeetingType);
            // }
          // }
        });

        setMeetings(myMeetings);
      }
    };
    // if (userInfo) getMyMeetings();
  // }, [userInfo]);
  }, []);

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
      field: "meetingId",
      name: "Copy Link",
      width: "10%",
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
            </div>
          </div>
    </Layout>
  );
}
