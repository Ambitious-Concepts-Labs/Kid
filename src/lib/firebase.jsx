import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword,
createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, updateDoc, setDoc, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { generateUsername } from "../utils/helperfunctions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      phone: "555-5555",
      name,
      email,
      authProvider: "local",
      uid: user.uid,
      avatar:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      username: generateUsername(),
      isAdmin: false,
      isTeacher: false,
      isStudent: true,
      pendingCourses: [],
      cart: {},
      courses: [],
      transactions: [],
      pendingTransactions: [],
      announcements: {},
      tutoringSessions: [],
      completedCourses: [],
      forPaymentCourses: [],
      deniedCourses: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        phone: user.phoneNumber,
        avatar: user.photoURL,
        authProvider: res.providerId,
        email: user.email,
        username: generateUsername(),
        isAdmin: false,
        isTeacher: false,
        isStudent: true,
        announcements: {},
        pendingCourses: [],
        cart: {},
        courses: [],
        transactions: [],
        pendingTransactions: [],
        tutoringSessions: [],
        completedCourses: [],
        forPaymentCourses: [],
        deniedCourses: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const meetingsRef = collection(db, "meetings");

const updateFireStoreDoc = async (collection, id, data) => {
  try {
    const dataRef = id ? doc(db, collection, id) : doc(db, collection);
    await setDoc(dataRef, data, { merge: true });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const mutateFireStoreDoc = async (collection, id, data) => {
  try {
    const dataRef = id ? doc(db, collection, id) : doc(db, collection);
    await updateDoc(dataRef, data, { merge: true });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



export {
  app,
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  meetingsRef,
  storage,
  mutateFireStoreDoc,
  updateFireStoreDoc
};