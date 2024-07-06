import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./App.css";
import * as Screens from "./screens/all";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useUserData from "./hooks/useUserData";
import PrivateRoute from "./utils/PrivateRouter";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { currentUser, user, loading } = useUserData();
  const [pc, setPc] = useState(new RTCPeerConnection(servers));
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [cart, setCart] = useState({
    items: [],
    total_price: 0,
    total_quantity: 0,
  });
  const [callId, setCallId] = useState(null)
  const [mobile, setMobile] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callInputRef = useRef(null);
  const callButtonRef = useRef(null);
  const answerButtonRef = useRef(null);
  const webcamButtonRef = useRef(null);
  const hangupButtonRef = useRef(null);

  const states = {
    isLoggedin,
    setIsLoggedin,
    currentUser,
    windowDimensions,
    mobile,
    setMobile,
    loading,
    cart,
    setCart,
    pc,
    webcamButtonRef,
    webcamVideoRef,
    remoteVideoRef, 
    callButtonRef,
    callInputRef,
    answerButtonRef, 
    hangupButtonRef,
    callId,
    setCallId,
    localStream,
    remoteStream,
    setLocalStream,
    setPc
  };

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  useEffect(() => {
    if (!mobile) {
      if (parseInt(windowDimensions[0]) <= 1400) {
        setMobile(true);
      }
    } else if (mobile) {
      if (parseInt(windowDimensions[0]) > 1400) {
        setMobile(false);
      }
    }
  }, [windowDimensions, mobile]);

  useEffect(() => {
    setWindowDimensions([width, height]);
  }, [width, height]);

  return (
    <div className="App relative overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route exact path="/forgot" element={<Screens.ForgotPasswordScreen />} />
          <Route exact path="/login" element={<Screens.LoginScreen />} />
          <Route exact path="/reset" element={<Screens.ResetPasswordScreen />} />
          <Route exact path="/signup" element={<Screens.SignUpScreen />} />
          {/* Auth Routes */}

          {/* Root Routes */}
          <Route exact path="/" element={<Screens.HomeScreen />} />
          <Route exact path="/academics" element={<Screens.AcademicsScreen />} />
          <Route exact path="/admission-and-aid" element={<Screens.AdmissionScreen />} />
          <Route exact path="/about-us" element={<Screens.AboutScreen />} />
          <Route exact path="/facilities" element={<Screens.FacilitiesScreen />} />
          <Route exact path="/our-works" element={<Screens.WorksScreen />} />
          <Route exact path="/student-life" element={<Screens.StudentScreen />} />
          <Route exact path="/terms" element={<Screens.Terms />} />
          <Route exact path="/privacy" element={<Screens.Privacy />} />
          {/* Root Routes */}

          {/* Dashboard General Routes */}
          {/* <Route path="/dashboard" element={<PrivateRoute type="login" element={<Screens.AdminDashboard {...states} user={user} />} user={user} currentUser={currentUser} />} /> */}
          <Route exact path="/dashboard" element={<Screens.AdminDashboard {...states} user={user} />} />
          <Route exact path="/dashboard/assesment" element={<Screens.AdminAssesment />} />
          <Route exact path="/dashboard/products" element={<Screens.Products {...states} user={user} />}/>
          <Route exact path="/dashboard/profile" element={<Screens.AdminProfile user={user} />} />
          <Route exact path="/dashboard/purchase" element={<Screens.AdminPurchase />} />
          <Route exact path="/dashboard/rewards" element={<Screens.AdminRewards />} />
          <Route exact path="/dashboard/suggestions" element={<Screens.AdminSuggestions />} />
          <Route exact path="/dashboard/thankyou" element={<Screens.AdminThankyou />} />
          {/* Dashboard General Routes */}

          {/* Dashboard Teacher Routes */}
          <Route exact path="/dashboard/teacher/course/:id/students" element={<Screens.ViewStudents {...states} user={user} />} />
          <Route exact path="/dashboard/courses/teacher/:username/all" element={<Screens.TeachersCourses {...states} user={user} />} />
          {/* DashboardTeacher Routes */}

          {/* Dashboard Student Routes */}
          <Route exact path="/dashboard/cart" element={<Screens.Cart {...states} user={user} />} />
          <Route exact path="/dashboard/courses/student/:username/all" element={<Screens.ViewDashboardCourses {...states} user={user} />} />
          <Route exact path="/dashboard/courses/browse" element={<Screens.Search {...states} user={user} />} />
          <Route exact path="/dashboard/courses/:id" element={<Screens.ViewCourse {...states} user={user} />} />
          <Route exact path="/dashboard/courses/:id/chapters/:id" element={<Screens.ViewChapter {...states} user={user} />} />
          <Route exact path="/dashboard/course/:id/students/:studentusername" element={<Screens.ViewStudent {...states} user={user} />} />
          {/* Dashbaord Student Routes */}

          {/* Invoice Routes */}
          <Route exact path="/dashboard/admin/invoice/new" element={<Screens.NewInvoice {...states} user={user} />} />
          <Route exact path="/dashboard/admin/invoices/all" element={<Screens.UnifiedInvoiceTable {...states} user={user} />} />
          <Route exact path="/dashboard/transaction/:id" element={<Screens.Transaction {...states} user={user} />} />
          <Route exact path="/dashboard/transactions" element={<Screens.Transactions {...states} user={user} />} />
          <Route exact path="/dashboard/transaction/:id/invoice" element={<Screens.Invoice {...states} user={user} />} />
          <Route exact path="/dashboard/transaction/:id/invoice2" element={<Screens.Invoice2 {...states} user={user} />} />
          {/* Invoice Routes */}

          {/* Dashboard Admin Routes */}
          {/* <PrivateRoute type={"admin"} user={user} currentUser={currentUser} exact path="/dashboard/admin/course/assign" element={<Screens.AssignCourse {...states} user={user} />} /> */}
          <Route exact path="/dashboard/admin/analytics" element={<Screens.Analytics {...states} user={user} />} />
          <Route exact path="/dashboard/admin/course/assign" element={<Screens.AssignCourse {...states} user={user} />} />
          <Route exact path="/dashboard/admin/student/course/assign" element={<Screens.AssignStudentCourse {...states} user={user} />} />
          <Route exact path="/dashboard/admin/course/:id" element={<Screens.UpdateCourse {...states} user={user} />} />
          {/* issue rendering */}
          <Route exact path="/dashboard/admin/course/:id/chapters/:id" element={<Screens.UpdateChapter {...states} user={user} />} />
          {/* issue rendering */}
          <Route exact path="/dashboard/admin/course/new" element={<Screens.NewCourse {...states} user={user} />} />
          <Route exact path="/dashboard/admin/courses/delete" element={<Screens.DeleteCourse {...states} user={user} />} />
          <Route exact path="/dashboard/admin/courses/pending" element={<Screens.PendingCourses {...states} user={user} />} />
          <Route exact path="/dashboard/admin/invoice/new2" element={<Screens.NewInvoice2 {...states} user={user} />} />
          <Route exact path="/admin/user/:userid/pendingcourse/:courseid" element={<Screens.PendingCourse {...states} user={user} />} />
          {/* Dashboard Admin Routes */}

          {/* 404 Route */}
          <Route path="*" element={<Screens.NotFound />} />
          {/* 404 Route */}

          {/* Dashboard Zoom Routes */}
          <Route path="/dashboard/zoom/create" element={<Screens.CreateMeeting  {...states} user={user}/>} />
					<Route path="/dashboard/zoom/create/1on1" element={<Screens.OneOnOneMeeting  {...states} user={user} />} />
					<Route path="/dashboard/zoom/create/video-conference" element={<Screens.VideoConference  {...states} user={user} />} />
          <Route path="/dashboard/zoom/meet" element={<Screens.AdminZoom {...states} user={user} />} />
          <Route path="/dashboard/zoom/webrtc" element={<Screens.WebRTCDemo {...states} user={user}/>} />
          <Route path="/dashboard/zoom/join/:id" element={<Screens.JoinMeeting {...states} user={user}/>} />
          {/* Duplicates */}
					<Route path="/dashboard/zoom/meetings" element={<Screens.Meeting  {...states} user={user} />} />
					<Route path="/dashboard/zoom/mymeetings" element={<Screens.MyMeetings  {...states} user={user} />} />
          {/* Duplicates */}
			    <Route path="/dashboard/zoom" element={<Screens.Dashboard  {...states} user={user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
