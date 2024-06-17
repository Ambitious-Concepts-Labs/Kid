import React from "react";
import * as Components from "../../components/all";
// about
import worksBg from "../../assets/works-bg.png";
// about
import careBg from "../../assets/care-bg.png";
// preschool
import preschoolBg from "../../assets/preschool-bg.png";
// mode
import modeBg from "../../assets/mode-bg.png";
// schedule
import scheduleBg from "../../assets/schedule-bg.png";
import scheduleBg1 from "../../assets/schedule-bg1.png";
// commitment
import commitmentBg from "../../assets/commitment-bg.png";

export default function WorksScreen() {
	return (
		<div className="WorksScreen bg-[#E2E2E2]">
			{/* Navbar */}
			<Components.Navbar white={true} />

			{/* Nurture */}
			<div
				className="NURTURE relative 
                min-h-[100vh] w-full 
                flex flex-col-reverse md:flex-row 
                items-center justify-center md:justify-between 
                py-12 pt-40 md:pb-24
                "
			>
				{/* left */}
				<div
					className="relative 
                    w-full md:w-[45%] lg:w-[40%]   
                    px-12 md:pl-24 md:pr-0
                    pt-5
                    max-sm:mt-20 sm:my-20 md:my-0 
                    flex flex-col items-start 
                    text-left
                    "
				>
					<Components.Heading
						className="relative 
                            w-full md:w-fit 
                            flex
                            "
						style={{ lineHeight: 1.2 }}
					>
						Nurture. <br />
						Educate. Excel.
					</Components.Heading>

					<Components.BigParagraph
						className="text-left text-[#00000099] 
                        mt-5 md:mt-16 lg:mt-5 
                        xl:w-[380px]
                        "
					>
						Providing the top early education for your children in Southeast
						Houston for over 20 years.
					</Components.BigParagraph>

					<div className="flex mt-8">
						<Components.Button text="Learn More" className="px-4" />
						<Components.Button
							text="Schedule a Tour"
							className="ml-5 px-4 "
							outlined={true}
							arrowFill="black"
						/>
					</div>

					{/* vectors */}
					<svg
						width="292"
						height="430"
						viewBox="0 0 292 630"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute 
                        top-0 left-[-50px]
                        max-md:hidden
                        "
					>
						<path
							d="M291.723 1H92.0514L-291.813 629.273"
							stroke="#FFE303"
							strokeWidth="2"
						/>
					</svg>
					<svg
						width="90"
						height="240"
						viewBox="0 0 90 240"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute 
                        top-0 left-0
                        md:hidden
                        "
					>
						<path
							d="M89.3066 1H13.5811L-132 239.274"
							stroke="#FFE303"
							strokeWidth="2"
						/>
					</svg>
				</div>

				{/* right */}
				<div
					className="relative 
                    w-full md:w-[55%] lg:w-[45%]
                    max-w-[850px] min-w-[350px] 
                    z-0
                    px-12 md:pr-24 md:pl-0
                    "
				>
					<img
						src={worksBg}
						alt="dates_img"
						className="w-full object-contain"
					/>
				</div>
			</div>

			{/* Care */}
			<div
				className="CARE relative 
				min-h-[500px] w-full 
				flex flex-col items-center justify-center 
				p-12 md:p-24 
				z-0 overflow-hidden
				"
				style={{
					backgroundImage: `url(${careBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="absolute top-0 left-0 w-full h-full z-10 bg-[#C33B4CCC]" />

				<div className="z-20 text-white flex flex-col items-center">
					<Components.SubHeading
						style={{ lineHeight: 1.2 }}
						className="max-w-[500px] mb-5"
					>
						We’re Much More Than Child Care.
					</Components.SubHeading>

					<Components.BiggerParagraph className="max-w-[880px]">
						Unlike others, we're much more than a child-care facility. We’re a
						vital extension of your family. Our promise to parents is to offer
						every child a safe, nurturing experience in a healthy learning
						environment. We provide each child with a sense of recognition,
						success, and acceptance. At KidverCity, your child’s physical,
						emotional, cognitive, and social development are our top priorities.
						Every effort has been made to design outstanding curriculums, create
						nurturing classrooms, and enlist a qualified and enthusiastic
						teaching staff.
					</Components.BiggerParagraph>
				</div>
			</div>

			{/* Preschool */}
			<div
				className="PRESCHOOL bg-white 
				w-full min-h-[100vh]
				flex flex-col
				px-12 py-24 lg:px-24
				"
			>
				{/* inner container */}
				<div
					className="h-fit relative
				 	w-full md:max-w-[1100px] 
					flex flex-col md:flex-row 
					m-auto  
					"
				>
					{/* left */}
					<img
						src={preschoolBg}
						alt="preschool_bg_img"
						className="object-contain z-10
						w-full md:w-[45%]
						bottom-[-25px] lg:bottom-[-25px] left-[-25px]
						"
					/>

					{/* right */}
					<div
						className="z-0 md:absolute md:bg-[#FFDED1]
							w-full md:w-[75%] 
							md:min-h-[300px] lg:min-h-[380px] h-fit
							bottom-[26px] left-[25%]
							flex flex-col justify-center 
							md:p-[40px] md:pl-[25%]
							max-md:mt-10
							"
					>
						<Components.SubHeading className="text-start max-w-[400px] md:mb-10">
							We offer a professionally designed 15,000 sq. ft. preschool in
							KidverCity
						</Components.SubHeading>

						{/* button */}
						<Components.Button
							text={"Schedule a Tour"}
							className="mr-auto max-md:mt-5 
								max-xl:py-1 max-xl:px-4 
								max-xl:text-[14px]
								"
						/>
					</div>
				</div>
			</div>

			{/* Mode */}
			<div
				className="MODE 
				min-h-[100vh] w-full 
				bg-[#F5F5F5] 
				flex flex-col 
				items-start justify-center 
				p-12 lg:p-24
				"
			>
				<Components.SubHeading
					className="text-start 
                    max-w-[450px]
                    mb-12
                    "
				>
					The University Mode of Teaching
				</Components.SubHeading>

				<img
					src={modeBg}
					alt="range_bg_img"
					className="w-full object-contain max-w-[1400px]"
				/>

				<Components.BigParagraph
					className="text-left text-[#00000099] 
						mt-8 
                        max-w-[800px]
						"
				>
					At KidverCity, your child will receive not just child care, but a
					specially crafted curriculum developed using our over two decades of
					research and experience. Our students are nurtured with the
					age-targeted S.A.I.L. curriculum and 3Q Excel courses inspired by
					acclaimed psychologist and Nobel Prize recipient Dr. K. Lorenz.
					Different learning skills are emphasized during their respective
					critical periods.
				</Components.BigParagraph>

				<div className="flex mt-8">
					<Components.Button text="Programs and Curricula" className="px-4" />
					<Components.Button
						text="Tour"
						className="ml-5 px-4 "
						outlined={true}
						arrowFill="black"
					/>
				</div>
			</div>

			{/* Schedule */}
			<div
				className="SCHEDULE bg-white 
				w-full 
				flex flex-col"
			>
				{/* inner container */}
				<div
					className="h-fit
				 	w-full max-w-[1400px] 
					flex flex-col md:flex-row 
					items-center justify-center 
					m-auto  
					px-12 py-24 lg:px-24"
				>
					{/* left */}
					<div
						className="relative
						w-[90%] md:w-[45%] lg:w-[40%]
						z-10
						"
					>
						<img
							src={scheduleBg}
							alt="move_img"
							className="max-md:hidden w-full max-md:aspect-square md:object-contain"
						/>

						<img
							src={scheduleBg1}
							alt="move_img"
							className="md:hidden w-full max-md:aspect-square md:object-contain"
						/>

						{/* borders */}
						<div
							style={{
								height: "calc( 100% + 50px )",
								width: "calc( 50% + 25px)",
								borderRadius: "1000px 0 0 1000px",
							}}
							className="absolute 
							hidden md:block 
							top-[-25px] left-[-25px] 
							border-[2px] border-[#FFE300] 
							-z-10
							"
						/>
						<div
							style={{
								height: "70%",
								width: "calc( 100% + 40px )",
								borderRadius: "1000px 1000px 0 0",
							}}
							className="absolute 
							md:hidden 
							top-[-20px] left-[-20px] 
							border-[2px] border-[#FFE300] 
							-z-10
							"
						/>
					</div>

					{/* right */}
					<div
						className="Quote relative z-0 
						w-full md:w-[60%] lg:w-[50%] 
						md:ml-[-50px] 
						max-md:mt-[-50px]
						max-md:!aspect-auto
						"
						style={{ aspectRatio: 2 / 1.7 }}
					>
						{/* right items */}
						<div
							className="relative bg-[#FFDED1] z-10 
							h-full w-full
							flex flex-col justify-center
							py-[40px] px-[30px] 
							md:p-[30px] md:pl-[85px] lg:pl-[100px]
							lg:p-[40px]  
							max-md:pt-[80px]
							"
						>
							<Components.SubHeading
								className="text-start
								max-md:max-w-[300px]
								"
							>
								Schedule a customized, one-on-one tour today, or contact us with
								any further questions!
							</Components.SubHeading>

							<div className="flex mt-8">
								<Components.Button text="Email" className="max-lg:px-4" />
								<Components.Button
									text="Call"
									className="ml-5 max-lg:px-4"
									outlined={true}
									arrowFill="black"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Commitment */}
			<div
				className="COMMITMENT relative 
				min-h-[500px] w-full 
				flex flex-col items-center justify-center 
				p-12 md:p-24 
				z-0 overflow-hidden
				"
				style={{
					backgroundImage: `url(${commitmentBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="absolute top-0 left-0 w-full h-full z-10 bg-[#C33B4CCC]" />

				<div className="z-20 text-white flex flex-col items-center">
					<Components.SubHeading
						style={{ lineHeight: 1.2 }}
						className="max-w-[400px] mb-5"
					>
						Our commitment to you:
					</Components.SubHeading>

					<Components.BiggerParagraph className="max-w-[880px]">
						At Excelsior University For Children, your child’s physical,
						emotional, cognitive, and social development are our top priorities.
						Your child will experience how learning and fun go hand in hand.
					</Components.BiggerParagraph>
				</div>
			</div>

			{/* Footer */}
			<Components.Footer />
		</div>
	);
}
