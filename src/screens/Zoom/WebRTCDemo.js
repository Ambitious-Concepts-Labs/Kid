import React, { useState, useRef, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Layout from "../../components/Dashboard/Layout";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const WebRTCDemo = () => {
  const [pc] = useState(new RTCPeerConnection(servers));
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [callId, setCallId] = useState("");

  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callInputRef = useRef(null);
  const callButtonRef = useRef(null);
  const answerButtonRef = useRef(null);
  const hangupButtonRef = useRef(null);

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

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);

    console.log("Stream: ", stream);
    console.log("1: PC: ", pc, "Local Stream: ", localStream, "Remote Stream: ", remoteStream, "Call ID: ", callId, "Webcam Video Ref: ", webcamVideoRef, "Remote Video Ref: ", remoteVideoRef, "Call Input Ref: ", callInputRef, "Call Button Ref: ", callButtonRef, "Answer Button Ref: ", answerButtonRef, "Hangup Button Ref: ", hangupButtonRef, "Servers: ", servers, "stream: ", stream);
    // Push tracks from local stream to peer connection
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    console.log("2: PC: ", pc, "Local Stream: ", localStream, "Remote Stream: ", remoteStream, "Call ID: ", callId, "Webcam Video Ref: ", webcamVideoRef, "Remote Video Ref: ", remoteVideoRef, "Call Input Ref: ", callInputRef, "Call Button Ref: ", callButtonRef, "Answer Button Ref: ", answerButtonRef, "Hangup Button Ref: ", hangupButtonRef, "Servers: ", servers, "stream: ", stream);
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    
    console.log("3: PC: ", pc, "Local Stream: ", localStream, "Remote Stream: ", remoteStream, "Call ID: ", callId, "Webcam Video Ref: ", webcamVideoRef, "Remote Video Ref: ", remoteVideoRef, "Call Input Ref: ", callInputRef, "Call Button Ref: ", callButtonRef, "Answer Button Ref: ", answerButtonRef, "Hangup Button Ref: ", hangupButtonRef, "Servers: ", servers, "stream: ", stream);
    console.log("3: PC: ", pc, "Local Stream: ", localStream, "Remote Stream: ", remoteStream, "Call ID: ", callId, "Webcam Video Ref: ", webcamVideoRef, "Remote Video Ref: ", remoteVideoRef, "Call Input Ref: ", callInputRef, "Call Button Ref: ", callButtonRef, "Answer Button Ref: ", answerButtonRef, "Hangup Button Ref: ", hangupButtonRef, "Servers: ", servers, "stream: ", stream);
    webcamVideoRef.current.srcObject = localStream;
    remoteVideoRef.current.srcObject = remoteStream;
    callButtonRef.current.disabled = false;
    answerButtonRef.current.disabled = false;
  };

  const createCall = async () => {
    try {
      // const callDoc = db.collection("calls").doc();
      // const offerCandidates = callDoc.collection("offerCandidates");
      // const answerCandidates = callDoc.collection("answerCandidates");
      const callDoc = await getDocs(collection(db, "calls"));
      const callData = callDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const offerCandidates = callData.offerCandidates;
      const answerCandidates = callData.answerCandidates;

      setCallId(callDoc.id);
      callInputRef.current.value = callDoc.id;

      // Get candidates for caller, save to db
      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      // Listen for remote answer
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      // When answered, add candidate to peer connection
      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      hangupButtonRef.current.disabled = false;
    } catch (error) {
      alert("Error creating call: ", error.message);
      console.error(error);
    }
  };

  const answerCall = async () => {
    try {
      // const callDoc = db.collection("calls").doc(callInputRef.current.value);
      // const answerCandidates = callDoc.collection("answerCandidates");
      // const offerCandidates = callDoc.collection("offerCandidates");
      const callDoc = await getDocs(
        collection(db, "calls", callInputRef.current.value)
      );
      const callsData = callDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const answerCandidates = callsData.answerCandidates;
      const offerCandidates = callsData.offerCandidates;

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    } catch (error) {
      alert("Error answering call: ", error.message);
      console.log(error);
    }
  };

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
          onClick={createCall}
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
          onClick={answerCall}
          ref={answerButtonRef}
          className="bg-purple-500 text-white py-2 px-4 rounded mt-2"
        >
          Answer
        </button>
        <h2 className="text-xl font-semibold mt-4">4. Hangup</h2>
        <button
          ref={hangupButtonRef}
          className="bg-red-500 text-white py-2 px-4 rounded mt-2"
        >
          Hangup
        </button>
      </div>
    </Layout>
  );
};

export default WebRTCDemo;
