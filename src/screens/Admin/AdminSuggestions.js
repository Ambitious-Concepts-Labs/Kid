import React from "react";
import * as Components from "../../components/all";
import userImg from "../../assets/person.png";
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

export default function AdminSuggestions() {
	// doughnut chart
	const doughnutData = {
		labels: ["Progress", "Done"],
		datasets: [
			{
				data: [1, 1, 1, 1, 1],
				backgroundColor: [
					"#EEAE6F",
					"#109CF1",
					"#FF8F6B",
					"#A5E79F",
					"#F1BE42",
				],
				borderWidth: 0,
			},
		],
	};

	const doughnutOptions = {
		cutout: 80,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					usePointStyle: true,
				},
			},
		},
	};

	return (
		<Layout>
				<div className="p-4 flex-1 h-full overflow-auto">
					{/* details row */}
					<div className="bg-white rounded-md shadow overflow-hidden mt-4 p-6 ">
						{/* heading */}
						<Components.BigParagraph className="font-semibold text-start !text-base">
							Teachers Suggestions
						</Components.BigParagraph>

						{/* cards */}
						{[1, 2, 3, 4, 5].map(() => (
							<div className="rounded shadow-sm flex items-center bg-[#F8EFEF] bg-opacity-60 py-2 px-3 mt-3">
								<img
									src={userImg}
									alt=""
									className="aspect-square rounded h-10"
								/>
								<div className="ml-4 mr-auto py-1 text-start">
									<p className="text-sm">
										Lorem ipsum dolor sit amet consectetur. Accumsan praesent
										potenti felis id felis praesent leo ipsum
									</p>
									<p className="text-[#8C9295] text-xs">Sent 24 may 2023</p>
								</div>
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5.9585 17.5833C5.75016 17.375 5.646 17.1283 5.646 16.8433C5.646 16.5583 5.75016 16.3119 5.9585 16.1042L12.0627 10L5.93766 3.875C5.74322 3.68056 5.646 3.4375 5.646 3.14583C5.646 2.85417 5.75016 2.60417 5.9585 2.39583C6.16683 2.1875 6.4135 2.08333 6.6985 2.08333C6.9835 2.08333 7.22988 2.1875 7.43766 2.39583L14.4377 9.41667C14.521 9.5 14.5802 9.59028 14.6152 9.6875C14.6502 9.78472 14.6674 9.88889 14.6668 10C14.6668 10.1111 14.6493 10.2153 14.6143 10.3125C14.5793 10.4097 14.5204 10.5 14.4377 10.5833L7.41683 17.6042C7.22238 17.7986 6.98266 17.8958 6.69766 17.8958C6.41266 17.8958 6.16627 17.7917 5.9585 17.5833Z"
										fill="#A7AFB2"
									/>
								</svg>
							</div>
						))}
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

								<Components.Paragraph className=" !font-bold text-[#8C9295]">
									View All
								</Components.Paragraph>
							</div>

							{/* cards */}
							<div className="flex-1 w-full overflow-hidden">
								<div className="rounded flex items-center bg-opacity-60 py-2 px-3 mt-3">
									<img
										src={userImg}
										alt=""
										className="aspect-square rounded-full h-10"
									/>

									<div className="ml-2 mr-auto py-1 text-start">
										<p className="text-sm">Amilia Colar</p>
										<p className="text-[#8C9295] text-xs">
											Student English Subject
										</p>
									</div>

									<div class="mx-4 flex-1 bg-[#F3EDED] rounded-full h-3.5">
										<div
											class="bg-[#EFA8B1] h-3.5 rounded-full"
											style={{ width: "45%" }}
										/>
									</div>

									<p className="font-medium text-[#333333]">45%</p>
								</div>

								<div className="rounded flex items-center bg-opacity-60 py-2 px-3 mt-3">
									<img
										src={userImg}
										alt=""
										className="aspect-square rounded-full h-10"
									/>

									<div className="ml-2 mr-auto py-1 text-start">
										<p className="text-sm">Amilia Colar</p>
										<p className="text-[#8C9295] text-xs">
											Student English Subject
										</p>
									</div>

									<div class="mx-4 flex-1 bg-[#F3EDED] rounded-full h-3.5">
										<div
											class="bg-[#EEAE6F] bg-opacity-60 h-3.5 rounded-full"
											style={{ width: "85%" }}
										/>
									</div>

									<p className="font-medium text-[#333333]">85%</p>
								</div>

								<div className="rounded flex items-center bg-opacity-60 py-2 px-3 mt-3">
									<img
										src={userImg}
										alt=""
										className="aspect-square rounded-full h-10"
									/>

									<div className="ml-2 mr-auto py-1 text-start">
										<p className="text-sm">Amilia Colar</p>
										<p className="text-[#8C9295] text-xs">
											Student English Subject
										</p>
									</div>

									<div class="mx-4 flex-1 bg-[#F3EDED] rounded-full h-3.5">
										<div
											class="bg-[#A4B9F1] h-3.5 rounded-full"
											style={{ width: "45%" }}
										/>
									</div>

									<p className="font-medium text-[#333333]">45%</p>
								</div>

								<div className="rounded flex items-center bg-opacity-60 py-2 px-3 mt-3">
									<img
										src={userImg}
										alt=""
										className="aspect-square rounded-full h-10"
									/>

									<div className="ml-2 mr-auto py-1 text-start">
										<p className="text-sm">Amilia Colar</p>
										<p className="text-[#8C9295] text-xs">
											Student English Subject
										</p>
									</div>

									<div class="mx-4 flex-1 bg-[#F3EDED] rounded-full h-3.5">
										<div
											class="bg-[#A5E79F] h-3.5 rounded-full"
											style={{ width: "45%" }}
										/>
									</div>

									<p className="font-medium text-[#333333]">45%</p>
								</div>
							</div>
						</div>

						{/* right card */}
						<div className="h-96 w-full xl:w-auto flex-1 mt-3 xl:mt-4 xl:ml-4 bg-white flex flex-col p-4 rounded-md shadow">
							{/* heading and select */}
							<div className="flex justify-between">
								<Components.Paragraph className="!text-lg !font-bold">
									Working Hour
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
								<div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
									<Doughnut options={doughnutOptions} data={doughnutData} />
								</div>
							</div>
						</div>
					</div>
				</div>
		</Layout>
	);
}
