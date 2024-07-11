import React from 'react'

export default function PendingCoure({
    pendingCourse,
    currentUser,
    approve,
    deny,
    navigate,
    ...props
}) {
  return (
    <div
      id="pending-course"
      className="flex justify-center items-center min-h-screen"
    >
      <div className="card text-center w-full max-w-lg mx-4 sm:mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="card-body">
          <h5 className="card-title text-2xl font-bold mb-4">
            User: {currentUser.username}
          </h5>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="col-span-1 font-medium">Course Class Number:</div>
            <div className="col-span-1">{pendingCourse.classNum}</div>
            <div className="col-span-1 font-medium">Course Name:</div>
            <div className="col-span-1">{pendingCourse.courseName}</div>
          </div>
          <div className="mt-6">
            <button
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              onClick={() => {
                approve({ ...props, pendingCourse, navigate });
              }}
            >
              Approve
            </button>
            <button
              className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
              onClick={() => {
                deny({ ...props, pendingCourse, navigate });
              }}
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
