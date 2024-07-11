import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { getDocs, query } from "firebase/firestore";
import * as Components from "../../components/all";
import { meetingsRef } from "../../lib/firebase";
import Layout from "../../components/Dashboard/Layout";

const AllMeetingTable = lazy(() => import("../../components/Tables/AllMeetingTable"));

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings = fetchedMeetings.docs.map((meeting) => ({
          ...meeting.data(),
          docId: meeting.id,
        }));
        setMeetings(myMeetings);
      }
    };

    getMyMeetings();
  }, []);

  const renderStatusBadge = (meeting) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD

    if (meeting.status) {
      if (meeting.meetingDate === currentDate) {
        return (
          <span className="inline-block px-2 py-1 font-semibold leading-tight text-green-900 bg-green-200 rounded-full">
            <Link to={`/join/${meeting.meetingId}`} className="text-black">
              Join Now
            </Link>
          </span>
        );
      } else if (meeting.meetingDate < currentDate) {
        return (
          <span className="inline-block px-2 py-1 font-semibold leading-tight text-gray-900 bg-gray-200 rounded-full">
            Ended
          </span>
        );
      } else {
        return (
          <span className="inline-block px-2 py-1 font-semibold leading-tight text-blue-900 bg-blue-200 rounded-full">
            Upcoming
          </span>
        );
      }
    } else {
      return (
        <span className="inline-block px-2 py-1 font-semibold leading-tight text-red-900 bg-red-200 rounded-full">
          Cancelled
        </span>
      );
    }
  };

  const renderCopyLinkButton = (meetingId) => {
    const copyLink = () => {
      const link = `${process.env.REACT_APP_HOST}/join/${meetingId}`;
      navigator.clipboard.writeText(link);
    };

    return (
      <button
        onClick={copyLink}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Copy Link"
      >
        Copy
      </button>
    );
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
      field: "status",
      name: "Status",
      render: (meeting) => renderStatusBadge(meeting),
    },
    {
      field: "meetingId",
      name: "Copy Link",
      render: (meetingId) => renderCopyLinkButton(meetingId),
    },
  ];

  return (
    <Layout>
      <div className="p-4 flex-1 h-full overflow-auto text-start">
        {/* Breadcrumbs */}
        <Components.Paragraph className="font-bold mt-5">
          BreadCrumbs (6)
        </Components.Paragraph>
        <Suspense fallback={<div>Loading...</div>}>
          <AllMeetingTable meetingColumns={meetingColumns} meetings={meetings} />
        </Suspense>
      </div>
    </Layout>
  );
}
