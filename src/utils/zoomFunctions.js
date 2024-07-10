import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db, updateFireStoreDoc } from "../lib/firebase";

const createCall = async (pc, callInputRef, hangupButtonRef, setCallId) => {
  try {
    const callDoc = doc(collection(db, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    setCallId(callDoc.id);
    callInputRef.current.value = callDoc.id;

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

    await updateFireStoreDoc("calls", null, { offer });

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
    return callDoc.id
  } catch (error) {
    console.log(error);
  }
};

const answerCall = async (pc, id) => {
  try {
    const callDoc = doc(collection(db, "calls"), id);
    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");

    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData?.offer;
    if (!offerDescription) {
      console.error("No offer found in call document.");
      return;
    }

    try {
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );
    } catch (error) {
      console.log("Error setting remote description: ", error);
      return;
    }

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateFireStoreDoc("calls", null, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export { createCall, answerCall };
