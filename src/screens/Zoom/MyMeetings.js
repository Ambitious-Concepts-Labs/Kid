import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { getDocs, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { meetingsRef } from "../../lib/firebase";
import Layout from "../../components/Dashboard/Layout";

const EditFlyout = lazy(() => import("./EditFlyout"));
const MeetingTable = lazy(() => import("../../components/Tables/MeetingTable"));

export default function MyMeetings({ currentUser }) {
  const [meetings, setMeetings] = useState([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);

  const getMyMeetings = useCallback(async () => {
    const firestoreQuery = query(meetingsRef);
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      const myMeetings = fetchedMeetings.docs.map((meeting) => ({
        docId: meeting.id,
        ...meeting.data(),
      }));
      console.log(currentUser)
      myMeetings.forEach((meeting) => {
        console.log(meeting.invitedUsers)
      })  
      const userMeetings = myMeetings.filter(
        (meeting) => meeting.invitedUsers.includes(currentUser.email) || meeting.invitedUsers.includes(currentUser.username)
      );

      setMeetings(userMeetings);
    }
  }, []);

  useEffect(() => {
    getMyMeetings();
  }, [getMyMeetings]);

  const openEditFlyout = (meeting) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(null);
    if (dataChanged) {
      getMyMeetings();
    }
  };

  const renderStatusBadge = (meeting) => {
    const currentDate = new Date();
    const meetingDate = new Date(meeting.meetingDate);

    if (!meeting.status) {
      return (
        <span className="px-2 py-1 bg-red-500 text-white rounded">
          Cancelled
        </span>
      );
    } else if (isSameDay(meetingDate, currentDate)) {
      return (
        <Link to={`/dashboard/zoom/join/${meeting.meetingId}`}>
          <span className="px-2 py-1 bg-green-500 text-white rounded">
            Join Now
          </span>
        </Link>
      );
    } else if (isBeforeDay(meetingDate, currentDate)) {
      return (
        <span className="px-2 py-1 bg-gray-500 text-white rounded">Ended</span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-blue-500 text-white rounded">
          Upcoming
        </span>
      );
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isBeforeDay = (date1, date2) => {
    return date1 < date2;
  };

  const copyMeetingLink = (meetingId) => {
    const meetingLink = `${process.env.REACT_APP_HOST}/join/${meetingId}`;
    navigator.clipboard.writeText(meetingLink);
    // Optionally provide user feedback here
  };

  const meetingColumns = [
    { field: "meetingName", name: "Meeting Name" },
    { field: "meetingType", name: "Meeting Type" },
    { field: "meetingDate", name: "Meeting Date" },
    {
      field: "status",
      name: "Status",
      render: (meeting) => renderStatusBadge(meeting),
    },
    {
      field: "edit",
      name: "Edit",
      render: (meeting) => (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => openEditFlyout(meeting)}
          disabled={
            isBeforeDay(new Date(meeting.meetingDate), new Date()) ||
            !meeting.status
          }
        >
          Edit
        </button>
      ),
    },
    {
      field: "copyLink",
      name: "Copy Link",
      render: (meetingId) => (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => copyMeetingLink(meetingId)}
        >
          Copy
        </button>
      ),
    },
  ];

  return (
    <Layout
      crumbs={[
        { label: "Home", link: "/dashboard" },
        { label: "Zoom", link: "/dashboard/zoom" },
        { label: "My Meetings" },
      ]}
    >
      <div className="p-4 flex-1 h-full overflow-auto text-start">
        <div className="flex flex-col h-full justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <MeetingTable meetingColumns={meetingColumns} meetings={meetings} />
            {showEditFlyout && (
              <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting} />
            )}
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
