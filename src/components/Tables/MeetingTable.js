import React from "react";

export default function MeetingTable({ meetingColumns, meetings }) {
  return (
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
                    {col.render ? col.render(meeting) : meeting[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
