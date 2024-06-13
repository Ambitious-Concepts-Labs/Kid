import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import "./App.css";
import * as Screens from "./screens/all";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute2"
import { AuthContext }from './firebaseAuthContext';
import useUserData from './hooks/useUserData';

function App() {
	const authValue = useContext(AuthContext)
    const [isLoggedin, setIsLoggedin] = useState(false);
	const { currentUser, user, loading } = useUserData();
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
	loading
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
					{/* Login/Signup */}

					<Route path="/login" element={<Screens.LoginScreen />} />

					<Route path="/signup" element={<Screens.SignUpScreen />} />

					<Route path="/forgot" element={<Screens.ForgotPasswordScreen />} />

					<Route path="/reset" element={<Screens.ResetPasswordScreen />} />

					{/* Home/About */}

					<Route path="/" element={<Screens.HomeScreen  authValue={authValue}/>} />

					<Route path="/about-us" element={<Screens.AboutScreen />} />

					<Route path="/academics" element={<Screens.AcademicsScreen />} />

					<Route path="/facilities" element={<Screens.FacilitiesScreen />} />

					<Route path="/our-works" element={<Screens.WorksScreen />} />

					<Route path="/student-life" element={<Screens.StudentScreen />} />

					<Route
						path="/admission-and-aid"
						element={<Screens.AdmissionScreen />}
						/>

					{/* Dashboard */}

					{/* <ProtectedRoute redirectTo="/login" path="/dashboard"  
					element={<Screens.AdminDashboard />} />
				*/}

				{/* <ProtectedRoute redirectTo="/login" path="/dashboard">
					
					<Screens.AdminDashboard user={user} authValue={authValue} />
					
				</ProtectedRoute> */}
				
					<Route path="/dashboard" element={<Screens.AdminDashboard {...states} user={user} authValue={authValue} />} /> 	
					<Route path="/dash" element={<Screens.Dash user={user} authValue={authValue} />} /> 	
					<Route path="/course/student/:username/all" element={<Screens.StudentCourses {...states} user={user} authValue={authValue} />} /> 	
					<Route path="/course/teacher/:username/all" element={<Screens.TeacherCourses {...states} user={user} authValue={authValue} />} /> 	
					<Route path="/course/:id" element={<Screens.Course {...states} user={user} authValue={authValue} />} /> 	
					<Route path="/course/:id/students" element={<Screens.ViewStudents {...states} user={user} authValue={authValue} />} /> 	
					<Route path="/course/:id/students/:studentusername" element={<Screens.ViewStudent {...states} user={user} authValue={authValue} />} /> 	
					<Route exact path="/transactions" element={<Screens.Transactions {...states} user={user} authValue={authValue} />} />
					<Route exact path="/transaction/:id" element={<Screens.Transaction {...states} user={user} authValue={authValue} />} />
					<Route exact path="/transaction/:id/invoice" element={<Screens.Invoice {...states} user={user} authValue={authValue} />} />
					<Route exact path="/products" element={<Screens.Products {...states} user={user} authValue={authValue} />} />
					<Route exact path="/cart" element={<Screens.Cart {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/newinvoice" element={<Screens.NewInvoice {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/course/new" element={<Screens.NewCourse {...states} user={user} authValue={authValue} />} /> 	
					<Route exact path="/admin/courses/all" element={<Screens.Courses {...states} user={user} authValue={authValue} />} /> 	
					<Route exact path="/admin/assigncourse" element={<Screens.AssignCourse {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/user/:userid/pendingcourse/:courseid" element={<Screens.PendingCourse {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/pendingcourses" element={<Screens.PendingCourses {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/pendingitems" element={<Screens.PendingItems {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/forpayment" element={<Screens.ForPayment {...states} user={user} authValue={authValue} />} />
					<Route exact path="/admin/completeditems" element={<Screens.CompletedItems {...states} user={user} authValue={authValue} />} />
					<Route path="/teacher/courses" element={<Screens.AdminTeacher user={user} authValue={authValue} />} />

					{/* <Route exact path="/cart" element={<Screens.Cart {...states} user={user} authValue={authValue} />} />
					<Route exact path="/cart" element={<Screens.Cart {...states} user={user} authValue={authValue} />} />
					<Route exact path="/cart" element={<Screens.Cart {...states} user={user} authValue={authValue} />} /> */}
						
					<Route path='*' exact={true} component={<>Test</>} />
					{/* <Route path="/dashboard" element={<Screens.AdminDashboard user={user} authValue={authValue} />} /> */}

					<Route path="/profile" element={<Screens.AdminProfile user={user} />} />

					<Route path="/assesment" element={<Screens.AdminAssesment />} />

					<Route path="/suggestions" element={<Screens.AdminSuggestions />} />

					{/* <Route path="/zoom" element={<Screens.AdminZoom />} /> */}

					<Route path="/rewards" element={<Screens.AdminRewards />} />

					<Route path="/purchase" element={<Screens.AdminPurchase />} />

					<Route path="/thankyou" element={<Screens.AdminThankyou />} />

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

//RESPONSIVE
// Home
// Footer
