import React from 'react'

export default function AllMeetingTable({ meetingColumns, meetings }) {
  return (
    <div className="flex flex-col h-full">
      <div className="py-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {meetingColumns.map((column) => (
                <th
                  key={column.field}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meetings.map((meeting) => (
              <tr key={meeting.docId}>
                {meetingColumns.map((column) => (
                  <td
                    key={column.field}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(meeting[column.field])
                      : meeting[column.field]}
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
