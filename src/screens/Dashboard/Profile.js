import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import * as Components from "../../components/all";
// chart
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	ArcElement,
	BarElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Layout from "../../components/Dashboard/Layout";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	BarElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const userImg = "https://d10grw5om5v513.cloudfront.net/assets/images/user.png";

export default function Profile(props) {
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");
	const [grades, setGrades] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [bio, setBio] = useState("");
	const [courseStats, setCourseStats] = useState("");
	const [isEditable, setIsEditable] = useState(false);
	const navigate = useNavigate();

	const fetchUserName = async () => {
		try {
		const q = query(collection(db, "users"), where("uid", "==", props.user?.uid));
		const doc = await getDocs(q);
		const data = doc.docs[0].data();
		console.log(data)
		setName(data.name);
		setAvatar(data.avatar)
		setEmail(data.email)
		setPhone(data.phone)
		setRole(data.role)
		setGrades(data.grades)
		setCity(data.city)
		setState(data.state)
		setBio(data.bio)
		setCourseStats(data.courseStats)
		} catch (err) {
		console.error(err);
		alert("An error occured while fetching user data");
		}
	};
	
	const registerWithEmailAndPassword = async (name, email, password) => {
		try {
			// const res = await createUserWithEmailAndPassword(auth, email, password);
			// const user = res.user;
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	};

	async function handleEditComplete() {
		// const profile = doc(db,'users', props.user?.uid)
		// await updateDoc(profile,{
		// 	name,
		// 	avatar,
		// 	email,
		// 	phone, 
		// 	role, 
		// 	grades, 
		// 	city, 
		// 	state, 
		// 	bio, 
		// } ).then(response => {
		// alert("updated")
		// }).catch(error =>{
		// console.log(error.message)
		// })      
        // setEditMode(false);
    }

	useEffect(() => {
		// if (loading) return;
		if (!props.user) return navigate("/login");
		fetchUserName();
	}, [props.user]);
	// doughnut chart
	const doughnutData = {
		// labels: ["Total Female Students 45,000", "Total Male Students 45,000"],
		labels: ["Math", "Science", "English"],
		datasets: [
			{
				data: [1, 1, 1],
				backgroundColor: ["#109CF1", "#FF8F6B", "rgb(19, 167, 221, 0.15)"],
				borderWidth: 0,
			},
		],
	};

	const doughnutOptions = {
		cutout: 90,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

	// bar
	const barData = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			// {
			// 	label: "Revenue",
			// 	data: [1200, 1000, 800, 700, 600, 500, 700, 800, 1200, 1000, 800, 700],
			// 	backgroundColor: "#C33B4C",
			// 	borderWidth: 0,
			// 	borderRadius: 10,
			// },
			{
				label: "Course Stats",
				data: [1100, 900, 700, 600, 500, 400, 600, 700, 1100, 900, 700, 600],
				backgroundColor: "#F38315",
				borderWidth: 0,
				borderRadius: 10,
			},
			// {
			// 	label: "New Signups",
			// 	data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// 	backgroundColor: "#3D5EE1",
			// 	borderWidth: 0,
			// 	borderRadius: 10,
			// },
		],
	};

	const barOptions = {
		maintainAspectRatio: false,
		responsive: true,
		barPercentage: 0.5,
		categoryPercentage: 0.5,
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
			},
			y: {
				display: true,
				grid: {},
				border: {
					display: false,
					dash: [2, 4],
				},
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

	if (isEditable) { return (
		<>
			<Layout>
					<div className="p-4 flex-1 h-full overflow-auto">
						{/* banner */}
						<div className="h-28 flex bg-white rounded-md shadow overflow-hidden">
							{/* image */}
							<div className="relative bg-[#F38315] bg-opacity-40 w-20 border-l-4 border-[#F38315] border-opacity-20">
								<img
									src={avatar || userImg}
									alt="user_Image"
									className="absolute top-1/2 -right-1/2 -translate-y-1/2 h-20"
								/>
							</div>

							{/* text */}
							<div className="flex flex-col items-start justify-center pl-16 py-4">
								<input
									type="text"
									className="text-xl font-medium flex-1 px-4 focus:outline"
									placeholder={name}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<input
									type="text"
									className="text-sm mt-2 text-[#6F7C80] flex-1 px-4 focus:outline"
									placeholder={email}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* edit */}
							<div className="ml-auto flex p-3">
								<svg
									width="13"
									height="14"
									viewBox="0 0 13 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.0659 6.99953C9.77295 6.99953 9.53616 7.2369 9.53616 7.52928V11.7676C9.53616 12.0595 9.29879 12.2974 9.00641 12.2974H1.58936C1.29688 12.2974 1.05961 12.0595 1.05961 11.7676V4.35056C1.05961 4.05867 1.29688 3.82081 1.58936 3.82081H5.82769C6.12065 3.82081 6.35744 3.58343 6.35744 3.29105C6.35744 2.99858 6.12065 2.7612 5.82769 2.7612H1.58936C0.713097 2.7612 0 3.4743 0 4.35056V11.7676C0 12.6439 0.713097 13.357 1.58936 13.357H9.00641C9.88267 13.357 10.5958 12.6439 10.5958 11.7676V7.52928C10.5958 7.23632 10.3589 6.99953 10.0659 6.99953Z"
										fill="#A7AFB2"
									/>
									<path
										d="M4.96789 6.51732C4.93083 6.55438 4.9059 6.60152 4.89532 6.65235L4.52078 8.52575C4.50332 8.61257 4.53087 8.70211 4.59334 8.76516C4.64369 8.81551 4.7115 8.84248 4.78095 8.84248C4.79783 8.84248 4.81539 8.84092 4.83285 8.83724L6.70567 8.46269C6.75757 8.45202 6.80471 8.42719 6.84128 8.39004L11.0329 4.19837L9.16013 2.32565L4.96789 6.51732Z"
										fill="#A7AFB2"
									/>
									<path
										d="M12.3286 1.03046C11.8122 0.513896 10.9719 0.513896 10.4558 1.03046L9.72266 1.76363L11.5955 3.63645L12.3286 2.90317C12.5787 2.65367 12.7165 2.32094 12.7165 1.96706C12.7165 1.61318 12.5787 1.28044 12.3286 1.03046Z"
										fill="#A7AFB2"
									/>
								</svg>
								<p className="text-sm text-[#A7AFB2]"
								onClick={(e) => setIsEditable(!isEditable)}
								>Edit Profile</p>
							</div>
						</div>

						{/* details row */}
						<div className="bg-white rounded-md shadow overflow-hidden mt-4 p-6 ">
							{/* heading */}
							<div className="flex items-center">
								<div className="bg-[#F38315] rounded-full h-6 w-1"></div>

								<Components.BigParagraph className="!font-medium ml-3">
									Personal Details
								</Components.BigParagraph>
							</div>

							{/* details */}
							<div className="flex flex-col mt-2">
								<div className="flex items-center mt-2">
									<p className="text-[#8C979A] text-sm text-start w-44">
										Full Name
									</p>
									<input
										type="text"
										className="text-sm text-start w-44 flex-1 px-4 focus:outline"
										placeholder={name}
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<p className="text-[#8C979A] text-sm text-start w-28">Email</p>
								</div>
									<input
										type="text"
										className="text-sm text-start w-44 flex-1 px-4 focus:outline"
										placeholder={email}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>

								<div className="flex items-center mt-3">
									<p className="text-[#8C979A] text-sm text-start w-44">
										Phone Number
									</p>
									<input
										type="text"
										className="text-sm text-start w-44 flex-1 px-4 focus:outline"
										placeholder={phone || "555-5555"}
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
									{
										role === "student" &&
										<>
											<p className="text-[#8C979A] text-sm text-start w-28">
												Quiz Grades
											</p>
											{grades.map((course, i) => {
												return <p 
												className="text-sm text-start w-44"
												key={i}
												value={i}
												>
													{course.grade}
												</p>
											})}
										</>
									}
								</div>

								<div className="flex items-center mt-2">
									{/* <p className="text-[#8C979A] text-sm text-start w-44 pr-3">
										Email Meeting User Name
										</p>
									<p className="text-sm text-start w-44">John Sweden</p> */}

									<p className="text-[#8C979A] text-sm text-start w-28">City</p>
									<input
										type="text"
										className="text-sm text-start w-44 flex-1 px-4 focus:outline"
										placeholder={city || "Houston"}
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
									<p className="text-sm text-start w-44">{city}</p>
								</div>

								<div className="flex items-center mt-2">
									<p className="text-[#8C979A] text-sm text-start w-44">State</p>
									<input
										type="text"
										className="text-sm text-start w-44 flex-1 px-4 focus:outline"
										placeholder={state || "Texas"}
										value={state}
										onChange={(e) => setState(e.target.value)}
									/>
									<p className="text-sm text-start w-44">{state}</p>
								</div>
							</div>

							{/* heading */}
							<div className="flex items-center mt-6">
								<div className="bg-[#F38315] rounded-full h-6 w-1"></div>

								<Components.BigParagraph className="!font-medium ml-3">
									Bio
								</Components.BigParagraph>
							</div>

							{/* bio */}
							<p className="text-[#8C9295] !text-xs max-w-[660px] text-left mt-2">
								{bio}
								<textarea
									type="text"
									className="text-sm text-start w-44 flex-1 px-4 focus:outline"
									placeholder={bio || "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies."}
									value={bio}
									onChange={(e) => setBio(e.target.value)}
								>

								</textarea>
							</p>
						</div>
						<button
						onClick={handleEditComplete}
						>Sumbit</button>
					</div>	
			</Layout>
		</>
		)
	}
	
	return (
		<Layout>
				<div className="p-4 flex-1 h-full overflow-auto">
					{/* banner */}
					<div className="h-28 flex bg-white rounded-md shadow overflow-hidden">
						{/* image */}
						<div className="relative bg-[#F38315] bg-opacity-40 w-20 border-l-4 border-[#F38315] border-opacity-20">
							<img
								src={avatar || userImg}
								alt="user_Image"
								className="absolute top-1/2 -right-1/2 -translate-y-1/2 h-20"
							/>
						</div>

						{/* text */}
						<div className="flex flex-col items-start justify-center pl-16 py-4">
							<h1 className="text-xl font-medium">{name}</h1>
							<p className="text-sm mt-2 text-[#6F7C80]">
								{email}
							</p>
						</div>

						{/* edit */}
						<div className="ml-auto flex p-3">
							<svg
								width="13"
								height="14"
								viewBox="0 0 13 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10.0659 6.99953C9.77295 6.99953 9.53616 7.2369 9.53616 7.52928V11.7676C9.53616 12.0595 9.29879 12.2974 9.00641 12.2974H1.58936C1.29688 12.2974 1.05961 12.0595 1.05961 11.7676V4.35056C1.05961 4.05867 1.29688 3.82081 1.58936 3.82081H5.82769C6.12065 3.82081 6.35744 3.58343 6.35744 3.29105C6.35744 2.99858 6.12065 2.7612 5.82769 2.7612H1.58936C0.713097 2.7612 0 3.4743 0 4.35056V11.7676C0 12.6439 0.713097 13.357 1.58936 13.357H9.00641C9.88267 13.357 10.5958 12.6439 10.5958 11.7676V7.52928C10.5958 7.23632 10.3589 6.99953 10.0659 6.99953Z"
									fill="#A7AFB2"
								/>
								<path
									d="M4.96789 6.51732C4.93083 6.55438 4.9059 6.60152 4.89532 6.65235L4.52078 8.52575C4.50332 8.61257 4.53087 8.70211 4.59334 8.76516C4.64369 8.81551 4.7115 8.84248 4.78095 8.84248C4.79783 8.84248 4.81539 8.84092 4.83285 8.83724L6.70567 8.46269C6.75757 8.45202 6.80471 8.42719 6.84128 8.39004L11.0329 4.19837L9.16013 2.32565L4.96789 6.51732Z"
									fill="#A7AFB2"
								/>
								<path
									d="M12.3286 1.03046C11.8122 0.513896 10.9719 0.513896 10.4558 1.03046L9.72266 1.76363L11.5955 3.63645L12.3286 2.90317C12.5787 2.65367 12.7165 2.32094 12.7165 1.96706C12.7165 1.61318 12.5787 1.28044 12.3286 1.03046Z"
									fill="#A7AFB2"
								/>
							</svg>
							<p className="text-sm text-[#A7AFB2]"
							onClick={(e) => setIsEditable(!isEditable)}
							>Edit Profile</p>
						</div>
					</div>

					{/* details row */}
					<div className="bg-white rounded-md shadow overflow-hidden mt-4 p-6 ">
						{/* heading */}
						<div className="flex items-center">
							<div className="bg-[#F38315] rounded-full h-6 w-1"></div>

							<Components.BigParagraph className="!font-medium ml-3">
								Personal Details
							</Components.BigParagraph>
						</div>

						{/* details */}
						<div className="flex flex-col mt-2">
							<div className="flex items-center mt-2">
								<p className="text-[#8C979A] text-sm text-start w-44">
									Full Name
								</p>
								<p className="text-sm text-start w-44">{name}</p>
								<p className="text-[#8C979A] text-sm text-start w-28">Email</p>
								<p className="text-sm text-start w-44">{email}</p>
							</div>

							<div className="flex items-center mt-3">
								<p className="text-[#8C979A] text-sm text-start w-44">
									Phone Number
								</p>
								<p className="text-sm text-start w-44">{phone}</p>
								{
									role === "student" &&
									<>
										<p className="text-[#8C979A] text-sm text-start w-28">
											Quiz Grades
										</p>
										{grades.map((course, i) => {
											return <p 
												className="text-sm text-start w-44"
												key={i}
												value={i}
											>
												{course.grade}
											</p>
										})}
									</>
								}
							</div>

							<div className="flex items-center mt-2">
								{/* <p className="text-[#8C979A] text-sm text-start w-44 pr-3">
									Email Meeting User Name
								</p>
								<p className="text-sm text-start w-44">John Sweden</p> */}

								<p className="text-[#8C979A] text-sm text-start w-28">City</p>
								<p className="text-sm text-start w-44">{city}</p>
							</div>

							<div className="flex items-center mt-2">
								<p className="text-[#8C979A] text-sm text-start w-44">State</p>
								<p className="text-sm text-start w-44">{state}</p>
							</div>
						</div>

						{/* heading */}
						<div className="flex items-center mt-6">
							<div className="bg-[#F38315] rounded-full h-6 w-1"></div>

							<Components.BigParagraph className="!font-medium ml-3">
								Bio
							</Components.BigParagraph>
						</div>

						{/* bio */}
						<p className="text-[#8C9295] !text-xs max-w-[660px] text-left mt-2">
							{bio}
						</p>
					</div>

					{/* bottom row */}
					<div className="mt-4 flex justify-between flex-wrap">
						{/* left card */}
						<div className="h-96 w-full xl:w-[60%] mt-4 bg-white flex flex-col p-4 rounded-md shadow">
							{/* heading and select */}
							<div className="flex justify-between mb-2">
								<Components.Paragraph className="!text-lg !font-bold">
									Statistics
								</Components.Paragraph>

								<select
									name=""
									id=""
									className="focus:outline-none border border-[#A7AFB2] p-2 rounded text-sm text-[#A7AFB2]"
								>
									<option value="">Filter</option>
								</select>
							</div>

							{/* graph */}
							<div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden">
								{/* bottom */}
								<div className="flex-1 w-full overflow-hidden">
									<Bar
										options={barOptions}
										data={barData}
										style={{ width: "100%", height: "100%" }}
									/>
								</div>
							</div>
						</div>

						{/* right card */}
						<div className="h-96 w-full xl:w-auto flex-1 mt-3 xl:mt-4 xl:ml-4 bg-white flex flex-col p-4 rounded-md shadow">
							{/* heading and select */}
							<div className="flex justify-between">
								<Components.Paragraph className="!text-lg !font-bold">
									Students
								</Components.Paragraph>
							</div>

							{/* graph */}
							<div className="flex flex-col items-center justify-center flex-1 w-full overflow-hidden">
								{/* bottom */}
								<div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
									<Doughnut options={doughnutOptions} data={doughnutData} />
									{
										role === "teacher" &&
										<>
											<div className="absolute text-center font-medium text-xl mb-10">
												Total <br /> Students
											</div>
										</>
									}
									{
										role === "student" &&
										<>
											<div className="absolute text-center font-medium text-xl mb-10">
												Total <br /> Students
											</div>
										</>
									}
									<div className="absolute text-center font-medium text-xl mb-10">
										Total <br /> Classes
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</Layout>
	);
}
