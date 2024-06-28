import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import * as Screens from "./screens/all";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute2"
import { AuthContext } from "./lib/index";
import useUserData from "./hooks/useUserData";

function App() {
  const authValue = useContext(AuthContext);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { currentUser, user, loading } = useUserData();
  const [cart, setCart] = useState({
    items: [],
    total_price: 0,
    total_quantity: 0,
  });
  const [mobile, setMobile] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

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
          <Route
            exact
            path="/forgot"
            element={<Screens.ForgotPasswordScreen />}
          />
          <Route exact path="/login" element={<Screens.LoginScreen />} />
          <Route
            exact
            path="/reset"
            element={<Screens.ResetPasswordScreen />}
          />
          <Route exact path="/signup" element={<Screens.SignUpScreen />} />
          {/* Auth Routes */}

          {/* Root Routes */}
          <Route
            exact
            path="/"
            element={<Screens.HomeScreen authValue={authValue} />}
          />
          <Route
            exact
            path="/academics"
            element={<Screens.AcademicsScreen />}
          />
          <Route
            exact
            path="/admission-and-aid"
            element={<Screens.AdmissionScreen />}
          />
          <Route exact path="/about-us" element={<Screens.AboutScreen />} />
          <Route
            exact
            path="/facilities"
            element={<Screens.FacilitiesScreen />}
          />
          <Route exact path="/our-works" element={<Screens.WorksScreen />} />
          <Route
            exact
            path="/student-life"
            element={<Screens.StudentScreen />}
          />
          {/* Root Routes */}

          {/* General Routes */}
          <Route
            exact
            path="/dashboard"
            element={
              <Screens.AdminDashboard
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/assesment"
            element={<Screens.AdminAssesment />}
          />
          <Route
            exact
            path="/dashboard/products"
            element={
              <Screens.Products {...states} user={user} authValue={authValue} />
            }
          />
          <Route
            exact
            path="/dashboard/profile"
            element={<Screens.AdminProfile user={user} />}
          />
          <Route
            exact
            path="/dashboard/purchase"
            element={<Screens.AdminPurchase />}
          />
          <Route
            exact
            path="/dashboard/rewards"
            element={<Screens.AdminRewards />}
          />
          <Route
            exact
            path="/dashboard/suggestions"
            element={<Screens.AdminSuggestions />}
          />
          <Route
            exact
            path="/dashboard/thankyou"
            element={<Screens.AdminThankyou />}
          />
          {/* General Routes */}

          {/* Teacher Routes */}
          <Route
            exact
            path="/dashboard/teacher/course/:id/students"
            element={
              <Screens.ViewStudents
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/courses/teacher/:username/all"
            element={
              <Screens.TeachersCourses
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          {/* Teacher Routes */}

          {/* Student Routes */}
          <Route
            exact
            path="/dashboard/cart"
            element={
              <Screens.Cart {...states} user={user} authValue={authValue} />
            }
          />
          <Route
            exact
            path="/dashboard/courses/student/:username/all"
            element={
              <Screens.ViewDashboardCourses
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/courses/browse"
            element={
              <Screens.Search {...states} user={user} authValue={authValue} />
            }
          />
          <Route
            exact
            path="/dashboard/courses/:id"
            element={
              <Screens.ViewCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/courses/:id/chapters/:id"
            element={
              <Screens.ViewChapter
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/course/:id/students/:studentusername"
            element={
              <Screens.ViewStudent
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/transactions"
            element={
              <Screens.Transactions
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/transaction/:id"
            element={
              <Screens.Transaction
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/transaction/:id/invoice"
            element={
              <Screens.Invoice {...states} user={user} authValue={authValue} />
            }
          />
          {/* Student Routes */}

          {/* Admin Routes */}
          <Route
            exact
            path="/dashboard/admin/analytics"
            element={
              <Screens.Analytics
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/course/assign"
            element={
              <Screens.AssignCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/student/course/assign"
            element={
              <Screens.AssignStudentCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/course/:id"
            element={
              <Screens.UpdateCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          {/* issue rendering */}
          <Route
            exact
            path="/dashboard/admin/course/:id/chapters/:id"
            element={
              <Screens.UpdateChapter
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          {/* issue rendering */}
          <Route
            exact
            path="/dashboard/admin/course/new"
            element={
              <Screens.NewCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/courses/delete"
            element={
              <Screens.DeleteCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/courses/pending"
            element={
              <Screens.PendingCourses
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/invoice/new"
            element={
              <Screens.NewInvoice
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          <Route
            exact
            path="/dashboard/admin/invoices/all"
            element={
              <Screens.UnifiedInvoiceTable
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />

          <Route
            exact
            path="/admin/user/:userid/pendingcourse/:courseid"
            element={
              <Screens.PendingCourse
                {...states}
                user={user}
                authValue={authValue}
              />
            }
          />
          {/* Admin Routes */}

          {/* 404 Route */}
          <Route path="*" element={<Screens.NotFound />} />
          {/* 404 Route */}
          <Route path="*" exact={true} component={<>Test</>} />

          {/* <Route path="/zoom" element={<Screens.AdminZoom />} /> */}

          {/* <Route path="/create" element={<Screens.CreateMeeting />} />
					<Route path="/create1on1" element={<Screens.OneOnOneMeeting />} />
					<Route path="/videoconference" element={<Screens.VideoConference />} />
					<Route path="/mymeetings" element={<Screens.MyMeetings />} />
					<Route path="/join/:id" element={<Screens.JoinMeeting />} />
					<Route path="/meetings" element={<Screens.Meeting />} />
			<Route path="/zoom" element={<Screens.Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
