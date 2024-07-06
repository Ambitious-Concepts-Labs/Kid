import React, { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db, meetingsRef } from "../../lib/firebase";
import Layout from "../../components/Dashboard/Layout";
import { answerCall } from "../../utils/zoomFunctions";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinMeeting(props) {
  const {
    pc,
    callInputRef,
    webcamButtonRef,
    webcamVideoRef,
    remoteVideoRef,
    hangupButtonRef,
    setCallId,
    callButtonRef,
    answerButtonRef,
    remoteStream,
    localStream,
    setLocalStream,
    setPc,
  } = props;

  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          const meetingDate = new Date(meeting.meetingDate);
          const today = new Date();
          const formattedToday = today.toISOString().split("T")[0];

          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              // if (meetingDate.toISOString().split("T")[0] === formattedToday) {
              //   setIsAllowed(true);
              // } else if (meetingDate < today) {
              //   navigate(user ? "/" : "/login");
              // } else if (meetingDate > today) {
              //   navigate(user ? "/" : "/login");
              // }
            } else {
              // navigate(user ? "/" : "/login");
            }
          } else if (meeting.meetingType === "video-conference") {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              // if (meetingDate.toISOString().split("T")[0] === formattedToday) {
              //   setIsAllowed(true);
              // } else if (meetingDate < today) {
              //   navigate(user ? "/" : "/login");
              // } else if (meetingDate > today) {
              //   navigate(user ? "/" : "/login");
              // }
            } else {
              // navigate(user ? "/" : "/login");
            }
          } else {
            // setIsAllowed(true);
          }
        }
      }
    };
    getMeetingData();
  }, [params.id, user, userLoaded, navigate]);

  const myMeeting = async (element) => {
    // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    //   parseInt("569065887"),
    //   "db25ef18ce61848ce8e17e7b7be800d3",
    //   params.id,
    //   user?.uid ? user.uid : generateMeetingID(),
    //   user?.displayName ? user.displayName : generateMeetingID()
    // );
    // const zp = ZegoUIKitPrebuilt.create(kitToken);
    // zp?.joinRoom({
    //   container: element,
    //   maxUsers: 50,
    //   sharedLinks: [
    //     {
    //       name: "Personal link",
    //       url: window.location.origin,
    //     },
    //   ],
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.VideoConference,
    //   },
    // });
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

    // callButtonRef.current.disabled = false;
    // answerButtonRef.current.disabled = false;
    // webcamButtonRef.current.disabled = true;
  };

  const hangup = async () => {
    // Close the peer connection
    pc.close();
    // Stop all local video and audio tracks
    if (webcamVideoRef.current.srcObject) {
      webcamVideoRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // Stop all remote video and audio tracks
    if (remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
    // Reset UI elements
    // webcamButtonRef.current.disabled = false;
    // callButtonRef.current.disabled = true;
    // answerButtonRef.current.disabled = true;
    // hangupButtonRef.current.disabled = true;
    // callInputRef.current.value = "";

    // Create a new RTCPeerConnection instance
    const newPc = new RTCPeerConnection(servers);
    setPc(newPc);

    newPc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
  };
  
  const createCall = async () => {
    try {
      const callDoc = doc(collection(db, "calls"));
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      setCallId(params.id);

      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          await addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (data?.answer && !pc.currentRemoteDescription) {
          try {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
          } catch (error) {
            console.log(error);
          }
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      hangupButtonRef.current.disabled = false;
      return callDoc.id;
    } catch (error) {
      console.log(error);
    }
  };

  const stageCall = async () => {
    await createCall();
    await answerCall(pc, params.id);
  };

  return (
    <Layout
      crumbs={[
        { label: "Home", link: "/dashboard" },
        { label: "Zoom", link: "/dashboard/zoom" },
        { label: "Join Meeting" },
      ]}
    >
      <div className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <h3 className="text-lg">User Stream</h3>
            <video
              ref={webcamVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
            ></video>
          </div>
          <div className="flex-1">
            <h3 className="text-lg">Guest Stream</h3>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
            ></video>
          </div>
        </div>
        <div>
          <button
            onClick={startWebcam}
            ref={webcamButtonRef}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Start webcam
          </button>
          <button
            ref={hangupButtonRef}
            onClick={hangup}
            className="bg-red-500 text-white py-2 px-4 rounded mt-2"
          >
            Hangup
          </button>
        </div>
        <button
          onClick={() => stageCall()}
          ref={answerButtonRef}
          className="bg-purple-500 text-white py-2 px-4 rounded mt-2"
          disabled={!callButtonRef}
        >
          Answer
        </button>
      </div>
    </Layout>
  );
}
