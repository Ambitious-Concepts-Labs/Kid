import React, { useEffect } from "react";
import Layout from "../../components/Dashboard/Layout";
import { createCall, answerCall } from "../../utils/zoomFunctions";

const WebRTCDemo = (props) => {
  const {
    pc,
    answerButtonRef,
    callButtonRef,
    callInputRef,
    hangupButtonRef,
    localStream,
    remoteStream,
    remoteVideoRef,
    setCallId,
    setLocalStream,
    webcamVideoRef,
  } = props;

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    callButtonRef.current.disabled = false;
    answerButtonRef.current.disabled = false;
  };

  useEffect(() => {
    if (webcamVideoRef.current) {
      webcamVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  
  return (
    <Layout>
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">1. Start your Webcam</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <h3 className="text-lg">Local Stream</h3>
            <video
              ref={webcamVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
            ></video>
          </div>
          <div className="flex-1">
            <h3 className="text-lg">Remote Stream</h3>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
            ></video>
          </div>
        </div>
        <button
          onClick={startWebcam}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Start webcam
        </button>
        <h2 className="text-xl font-semibold mt-4">2. Create a new Call</h2>
        <button
          onClick={() =>
            createCall(pc, callInputRef, hangupButtonRef, setCallId)
          }
          ref={callButtonRef}
          className="bg-green-500 text-white py-2 px-4 rounded mt-2"
        >
          Create Call (offer)
        </button>
        <h2 className="text-xl font-semibold mt-4">3. Join a Call</h2>
        <p>Answer the call from a different browser window or device</p>
        <input
          ref={callInputRef}
          className="border border-gray-300 p-2 rounded w-full mt-2"
        />
        <button
          onClick={() => answerCall(pc, callInputRef.current.value)}
          ref={answerButtonRef}
          className="bg-purple-500 text-white py-2 px-4 rounded mt-2"
          disabled={!callButtonRef}
        >
          Answer
        </button>
        <h2 className="text-xl font-semibold mt-4">4. Hangup</h2>
        <button
          ref={hangupButtonRef}
          className="bg-red-500 text-white py-2 px-4 rounded mt-2"
          disabled
        >
          Hangup
        </button>
      </div>
    </Layout>
  );
};

export default WebRTCDemo;
