import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import EditFlyout from "./EditFlyout";
import { meetingsRef } from "../../lib/firebase";
import * as Components from "../../components/all";
import Layout from "../../components/Dashboard/Layout";

export default function MyMeetings() {
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
      setMeetings(myMeetings);
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
        <Link to={`/join/${meeting.meetingId}`}>
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
    <Layout>
      <div className="p-4 flex-1 h-full overflow-auto text-start">
        <Components.Paragraph className="font-bold mt-5">
          BreadCrumbs (6)
        </Components.Paragraph>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-full max-w-4xl">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {meetingColumns.map((col) => (
                      <th key={col.field} className="py-3 px-6 text-left">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {meetings.map((meeting) => (
                    <tr
                      key={meeting.docId}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      {meetingColumns.map((col) => (
                        <td
                          key={`${meeting.docId}-${col.field}`}
                          className="py-3 px-6 text-left whitespace-nowrap"
                        >
                          {col.render
                            ? col.render(meeting)
                            : meeting[col.field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {showEditFlyout && (
            <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting} />
          )}
        </div>
      </div>
    </Layout>
  );
}
