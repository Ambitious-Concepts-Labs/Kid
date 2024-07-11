import React from "react";
import * as Components from "../../components/all";
import { Slide } from "pure-react-carousel";
import StaticLayout from "../../components/StaticLayout";

const bg = "https://d10grw5om5v513.cloudfront.net/assets/images/home-bg.png";
const bar = "https://d10grw5om5v513.cloudfront.net/assets/images/home-bar.png";
const left = "https://d10grw5om5v513.cloudfront.net/assets/images/home-left.png";
const scroll = "https://d10grw5om5v513.cloudfront.net/assets/images/home-scroll.png";
const moveLeft = "https://d10grw5om5v513.cloudfront.net/assets/images/move-left.png";
const moveRight = "https://d10grw5om5v513.cloudfront.net/assets/images/move-right.png";
const moveBg = "https://d10grw5om5v513.cloudfront.net/assets/images/home-move.png";
const quotation = "https://d10grw5om5v513.cloudfront.net/assets/images/quotation.png";
const arrRight = "https://d10grw5om5v513.cloudfront.net/assets/images/right-arrow-simple.png";
const circle = "https://d10grw5om5v513.cloudfront.net/assets/images/white-circle.png";
const newsLeft = "https://d10grw5om5v513.cloudfront.net/assets/images/news-left.png";
const book = "https://d10grw5om5v513.cloudfront.net/assets/images/book.png";
const swim = "https://d10grw5om5v513.cloudfront.net/assets/images/swim.png";
const golf = "https://d10grw5om5v513.cloudfront.net/assets/images/golf.png";
const newsRight = "https://d10grw5om5v513.cloudfront.net/assets/images/news-btn-right.png";
const enrollLeft = "https://d10grw5om5v513.cloudfront.net/assets/images/enroll-left.png";
const enrollRight = "https://d10grw5om5v513.cloudfront.net/assets/images/enroll-right.png";
const interested = "https://d10grw5om5v513.cloudfront.net/assets/images/interested.png";
const consulting = "https://d10grw5om5v513.cloudfront.net/assets/images/consulting.png";
const register = "https://d10grw5om5v513.cloudfront.net/assets/images/register.png";
const enrollBg = "https://d10grw5om5v513.cloudfront.net/assets/images/enroll-bg.png";
const spotRight = "https://d10grw5om5v513.cloudfront.net/assets/images/spot-right.png";
const spotBg = "https://d10grw5om5v513.cloudfront.net/assets/images/spot-bg.png";
const spotBg1 = "https://d10grw5om5v513.cloudfront.net/assets/images/spot-bg1.png";
const summer = "https://d10grw5om5v513.cloudfront.net/assets/images/summer-class.png";
const math = "https://d10grw5om5v513.cloudfront.net/assets/images/math-book.png";
const golf1 = "https://d10grw5om5v513.cloudfront.net/assets/images/golf1.png";
const eventRight = "https://d10grw5om5v513.cloudfront.net/assets/images/event-btn-right.png";
const datesBg = "https://d10grw5om5v513.cloudfront.net/assets/images/dates-bg.png";
const datesRight = "https://d10grw5om5v513.cloudfront.net/assets/images/dates-right.png";

export default function HomeScreen(props) {
	console.log(props)
	return (
		<StaticLayout page="home">
			<div
				style={{
					backgroundImage: `url(${bg})`,
					backgroundSize: "cover",
					backgroundPosition: "bottom",
					backgroundRepeat: "no-repeat",
				}}
				className="Banner min-h-[100vh] w-full flex items-end md:items-center py-20"
			>
				{/* left bar */}
				<div className="hidden md:flex flex-col items-center mx-20 text-white font-[Grandstander] font-medium">
					<p>01</p>
					<img loading="lazy" src={bar} alt="bar_img" className="w-[5px] h-[360px]" />
					<p>04</p>
				</div>

				{/* middle text */}
				<div className="flex flex-col text-white ml-10 mb-40 md:m-0">
					<h1 className="text-[35px] md:text-[70px] lg:text-[120px] text-left font-bold font-[riffic]">
						KidverCity
					</h1>
					<p className="md:w-[450px] text-[17px] lg:w-[550px] md:text-[18px] lg:text-[22px] font-[Grandstander] text-left">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
						nec tempus
					</p>
					<div className="flex items-center mt-4">
						<img
							src={left}
							alt="left_img"
							className="h-8 hover:opacity-80 cursor-pointer"
						/>
						<Components.ArrowRight className="h-10 ml-2" />
					</div>
				</div>

				{/* right scroll */}
				<div
					className="flex flex-col items-center justify-end mr-5 md:mr-20 ml-auto mt-auto h-fit hover:opacity-80 cursor-pointer"
					onClick={() => {
						let pageHeight = window.innerHeight;
						window.scrollBy(0, pageHeight);
					}}
				>
					<p className="md:text-[18px] font-[Grandstander] md:font-medium uppercase -rotate-90 text-white pt-1 lg:pt-2">
						Scroll
					</p>
					<img
						src={scroll}
						alt="scroll_img"
						className=" w-[12px] h-[37px] md:w-[15px] md:h-[50px] mt-6 md:mt-8"
					/>
				</div>
			</div>

			{/* How We Move */}
			<div className="Move min-h-[100vh] w-full bg-white flex flex-col">
				{/* heading & vectors*/}
				<div className="relative flex justify-between mt-32">
					<img
						src={moveLeft}
						alt="left1_img"
						className="absolute left-[20px] bottom-[60%] md:left-[90px] md:bottom-[50%] h-[50px] md:h-[60px] lg:h-[100px] aspect-square"
					/>

					<h1 className="w-full text-center text-[25px] md:text-[50px] lg:text-[90px] font-bold font-[riffic]">
						How We Move
					</h1>

					<img
						src={moveRight}
						alt="left1_img"
						className="absolute h-[80px] md:h-[100px] lg:h-[160px] aspect-square right-0 top-[50%]"
					/>
				</div>

				{/* image & quote */}
				<div className="h-fit w-full max-w-[1400px] m-auto flex flex-col md:flex-row items-center justify-center mt-5 pt-5 pb-10 px-8 md:px-16">
					{/* image */}
					<div className="Image relative w-full md:w-[55%] lg:w-[45%]">
						{/* img */}
						<img
							src={moveBg}
							alt="move_img"
							className="w-full object-contain"
						/>

						{/* overlay */}
						<div
							style={{
								background:
									"linear-gradient(180deg, rgba(195, 59, 76, 0) 0%, rgba(195, 59, 76, 0.3) 69.26%, rgba(195, 59, 76, 0.78) 86.42%, #C33B4C 100%)",
							}}
							className="Overlay absolute h-full w-full top-0 left-0"
						/>

						<p className="absolute bottom-0 left-0 text-[12px] pl-5 pr-14 pb-5 text-left text-white opacity-70">
							<strong>Photo:</strong> 4th year Patton U student, Bailey speaks
							at the campaign rally for Beto O’Rouke during the 2018
							Presidential Primaries.
						</p>
					</div>

					{/* quote */}
					<div className="Quote relative w-[90%] md:w-[50%] lg:w-[42%] md:aspect-square mb-10 md:mb-0 md:ml-[-50px] z-10">
						{/* internal items */}
						<div className="relative h-full w-full flex flex-col bg-[#FFDED1] p-[40px] md:px-[30px] lg:p-[50px] z-10">
							{/* quotation marks */}
							<img
								src={quotation}
								alt="quotation_marks_img"
								className="absolute h-[50px] ml-[-10px]"
							/>

							{/* qoute text */}
							<p className="text-left mt-3 lg:mt-9 text-[14px] lg:text-[16px] xl:text-[24px] opacity-60">
								We cannot predict with certainty the types of jobs that will
								exist in the future, but we consistently provide students with
								exposure to 21st century skills with the most authentic, unique,
								and innovative learning experiences possible."
							</p>

							{/* by & btns */}
							<div className=" mt-3 flex items-center justify-between">
								{/* quote by */}
								<div className="flex flex-col">
									<h1 className="font-bold text-left">Ashley B. Patton</h1>

									<h2 className="text-left text-xs opacity-60">
										M.S. - Co-Founder
									</h2>
								</div>

								{/* buttons */}
								<div className="hidden md:flex items-center">
									<Components.ArrowLeft className="h-[28px]" />

									<Components.ArrowRight className="h-[32px] ml-2" />
								</div>
							</div>

							{/* learn more */}
							<p className="mt-3 md:mt-auto text-left text-[16px] lg:text-[18px] text-[#C33B4C] font-bold flex items-center w-fit hover:opacity-80 cursor-pointer">
								Learn more about Ashley &nbsp;&nbsp;
								<span className="relative h-9 w-9 md:h-7 md:w-7 flex items-center">
									<img
										src={arrRight}
										alt="right_arrow"
										className="h-[16px] z-10"
									/>
									<img
										src={circle}
										alt="right_arrow"
										className="h-full object-contain absolute top-0 right-[-6px] md:right-[-10px] -z-10"
									/>
								</span>
							</p>

							{/* buttons */}
							<div className="mt-3 flex md:hidden items-center">
								<Components.ArrowLeft className="h-[28px]" />

								<Components.ArrowRight className="h-[32px] ml-2" />
							</div>
						</div>

						{/* borders */}
						<div
							style={{
								height: "calc( 100% + 50px )",
								width: "30%",
							}}
							className="absolute hidden md:block top-[-25px] right-[-25px] border-[2px] border-[#FFE300] -z-10"
						/>
						<div
							style={{
								height: "30%",
								width: "calc( 100% + 40px )",
							}}
							className="absolute md:hidden bottom-[-20px] left-[-20px] border-[2px] border-[#FFE300] -z-10"
						/>
					</div>
				</div>
			</div>

			{/* Latest News */}
			<div className="News min-h-[100vh] w-full bg-[#F5F5F5] flex flex-col">
				{/* heading & btns*/}
				<div className="relative flex justify-between px-12 md:px-24 pt-16">
					{/* vector */}
					<img
						src={newsLeft}
						alt="left1_img"
						className="absolute h-[120px] w-[100px] md:h-[250px] md:w-[240px] bottom-0 left-[-20px] md:left-[-60px] m-0 "
					/>

					{/* text */}
					<h1 className="text-[25px] md:text-[50px] lg:text-[50px] font-bold font-[riffic]">
						Latest News
					</h1>

					{/* buttons */}
					<div className="hidden md:flex items-center">
						<Components.ArrowLeft className="h-[28px]" />

						<Components.ArrowRight className="h-[32px] ml-2" />
					</div>
				</div>

				{/* cards */}
				<div className="w-full flex justify-center px-12 md:px-24 my-16 overflow-hidden">
					<Components.Carousel slidesTotal={5}>
						<Slide index={1} className="h-full flex">
							<div
								className="h-full card flex flex-col 
								shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
								bg-white 
								"
							>
								<img loading="lazy" src={book} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-[#C33B4C] font-bold ">
										Virtual Book Club
									</h1>
									<p className="text-[14px] opacity-60">
										This course is geared towards students in grades 3-8 who
										want to build reading fluency, vocabulary, and reading
										comprehension. This is...
									</p>
								</div>
							</div>
						</Slide>

						<Slide index={2} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							bg-[#C33B4C]"
							>
								<img loading="lazy" src={swim} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-white font-bold ">
										Patton Report
									</h1>
									<p className="text-[14px] text-white">
										Keep up with Patton U news with our monthly Patton Report.
										Learn about our Spotlight Student and other upcoming events.
									</p>
								</div>
							</div>
						</Slide>

						<Slide index={3} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							 bg-white"
							>
								<img loading="lazy" src={golf} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-[#C33B4C] font-bold ">
										Golf Lessons for Girls{" "}
									</h1>
									<p className="text-[14px] opacity-60">
										Golf Lessons for Girls ages 6-12 in Houston! Visit our
										Course Catalog to learn more and register!
									</p>
								</div>
							</div>
						</Slide>

						<Slide index={4} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							bg-[#C33B4C]"
							>
								<img loading="lazy" src={swim} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-white font-bold ">
										Patton Report
									</h1>
									<p className="text-[14px] text-white">
										Keep up with Patton U news with our monthly Patton Report.
										Learn about our Spotlight Student and other upcoming events.
									</p>
								</div>
							</div>
						</Slide>

						<Slide index={5} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							 bg-white"
							>
								<img loading="lazy" src={golf} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-[#C33B4C] font-bold ">
										Golf Lessons for Girls{" "}
									</h1>
									<p className="text-[14px] opacity-60">
										Golf Lessons for Girls ages 6-12 in Houston! Visit our
										Course Catalog to learn more and register!
									</p>
								</div>
							</div>
						</Slide>
					</Components.Carousel>
				</div>
				{/* button */}
				<Components.Button text="View All" className={"w-fit mx-auto mb-20"} />
			</div>

			{/* Enrollment */}
			<div className="Enrollment h-fit lg:h-[95vh] w-full bg-white">
				{/* heading & vectors*/}
				<div className="relative px-12 md:px-24 pt-16">
					{/* vector */}
					<img
						src={enrollLeft}
						alt="left1_img"
						className="absolute 
                        h-[500px] w-[200px] 
                        md:h-[600px] md:w-[400px] 
                        lg:h-[950px] lg:w-[550px] 
                        bottom-0 
                        left-[-20px] 
                        md:left-[-90px] 
                        lg:left-[-100px] m-0"
					/>

					<img
						src={enrollRight}
						alt="left1_img"
						className="absolute 
                        h-[30px]  
                        right-[11%] 
                        bottom-[-20%] 
                        md:h-[50px]
                        md:right-[10%] 
                        lg:bottom-[20%] 
                        lg:right-[13%]"
					/>

					{/* text */}
					<h1 className="text-[30px] md:text-[60px] lg:text-[70px] font-bold font-[riffic]">
						Enrollment
					</h1>
					<p className="opacity-60 md:text-[20px] md:w-[650px] mx-auto pb-5">
						We Invite You To Join Our Learning Community Where We Work
						Collaboratively With Each Other To Prepare For A Space In The Future
						For Our Youth To Thrive.
					</p>
				</div>

				{/* tabs & image */}
				<div className="flex flex-col-reverse lg:flex-row justify-between px-12 md:px-24 mt-28 lg:mt-10 text-left">
					{/* tabs */}
					<div className="w-[100%] lg:w-[45%] flex flex-col py-10 mt-10 lg:mt-0">
						{/* interested */}
						<div className="tab flex bg-[#F5F5F5] py-4 px-6 cursor-pointer hover:opacity-80">
							<div className="bg-[#C33B4C] h-[50px] aspect-square flex items-center justify-center">
								<img
									src={interested}
									alt="interested_img"
									className="h-[70%]"
								/>
							</div>

							<div className="ml-4">
								<h1 className="text-[18px] font-bold my-3">Interested</h1>
								<h1 className="opacity-60">
									Browse Our Site Or Read Our Patton Report For The Latest
									Updated On What We Are Doing.
								</h1>
							</div>
						</div>

						{/* consulting */}
						<div className="tab flex items-center py-4 px-6 cursor-pointer hover:opacity-80">
							<div className="bg-[#C33B4C33] h-[50px] aspect-square flex items-center justify-center">
								<img
									src={consulting}
									alt="interested_img"
									className="h-[70%]"
								/>
							</div>

							<h1 className="text-[18px] font-bold ml-3">Consulting</h1>
						</div>

						{/* register */}
						<div className="tab flex items-center py-4 px-6 cursor-pointer hover:opacity-80">
							<div className="bg-[#C33B4C33] h-[50px] aspect-square flex items-center justify-center">
								<img loading="lazy" src={register} alt="interested_img" className="h-[70%]" />
							</div>

							<h1 className="text-[18px] font-bold ml-3">Register</h1>
						</div>
					</div>

					{/* image */}
					<div className="w-[100%] lg:w-[35%] lg:mx-auto lg:min-w-[400px] max-w-[1100px]">
						<div className="relative h-fit w-full z-0">
							<img loading="lazy" src={enrollBg} alt="enroll_img" className="w-full" />
							{/* border */}
							<div
								style={{
									height: "calc( 100% + 50px )",
									width: "calc( 50% + 25px )",
									borderRadius: "0px 507.5px 0px 0px",
								}}
								className="absolute block top-[-25px] right-[-25px] border-[2px] border-[#FFE300] -z-10"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Spotlight */}
			<div className="Spotlight min-h-[100vh] w-full lg:mt-44 overflow-x-hidden">
				{/* heading & vectors*/}
				<div className="relative px-12 md:px-24 pt-16">
					{/* vector */}
					<img
						src={spotRight}
						alt="left1_img"
						className="absolute 
                        h-[500px] w-[200px] 
                        md:h-[600px] md:w-[400px] 
                        lg:h-[800px] lg:w-[800px] 
                        bottom-0 
                        right-[-20px] 
                        md:right-[-90px] 
                        lg:right-[-80px] m-0"
					/>

					{/* text */}
					<h1 className="text-[30px] md:text-[60px] lg:text-[70px] font-bold font-[riffic]">
						Spotlight
					</h1>
				</div>

				{/* image & quote */}
				<div className="h-fit w-full flex flex-col items-center md:flex-row md:items-stretch justify-center mt-16 pt-5 pb-10 px-8 lg:px-16">
					{/* image2 */}
					<div className="Image md:hidden relative w-full md:w-[50%] lg:w-[40%] z-0">
						{/* img */}
						<img
							src={spotBg1}
							alt="move_img"
							className="w-full object-contain"
						/>

						{/* border */}
						<div
							style={{
								height: "calc( 70%  )",
								width: "calc( 100% + 50px )",
								borderRadius: "1000px 1000px 0px 0px",
							}}
							className="absolute block top-[-25px] right-[-25px] border-[2px] border-[#FFE300] -z-10"
						/>
					</div>

					{/* quote */}
					<div className="Quote w-full md:w-[50%] lg:w-[40%] mb-10 md:mb-0 flex flex-col justify-center bg-[#FFDED1] p-[60px] md:p-[30px] xl:p-[50px]">
						{/* qoute text */}
						<p className="text-[18px] xl:text-[22px] opacity-60">
							Christian is a rising 10th grader who loves theater. Christian is
							getting ahead of the school year by learning a few geometry skills
							that will be introduced in the Fall. Christian is an honor roll
							student and has plans to keep it that way!
						</p>

						{/* quote by */}
						<div className="flex flex-col mx-auto mt-8">
							<h1 className="font-bold">Christian D.</h1>

							<h2 className="text-xs opacity-60">10th Grader </h2>
						</div>
					</div>

					{/* image1 */}
					<div className="Image hidden md:block relative w-full md:w-[50%] lg:w-[40%] z-0">
						{/* img */}
						<img
							src={spotBg}
							alt="move_img"
							className="w-full object-contain"
						/>

						{/* border */}
						<div
							style={{
								height: "calc( 100% + 50px )",
								width: "calc( 50% + 25px )",
								borderRadius: "0px 10000px 10000px 0px",
							}}
							className="absolute block top-[-25px] right-[-25px] border-[2px] border-[#FFE300] -z-10"
						/>
					</div>
				</div>
			</div>

			{/* Online Events */}
			<div className="News min-h-[100vh] w-full flex flex-col">
				{/* heading & btns*/}
				<div className="relative flex justify-between px-12 md:px-24 pt-16">
					{/* text */}
					<h1 className="text-[25px] md:text-[50px] lg:text-[50px] font-bold font-[riffic]">
						Online Events
					</h1>

					{/* buttons */}
					<div className="hidden md:flex items-center">
						<Components.ArrowLeft className="h-[28px]" />

						<Components.ArrowRight className="h-[32px] ml-2" />
					</div>
				</div>

				{/* cards */}
				<div className="w-full flex justify-center px-12 md:px-24 my-16 overflow-hidden">
					<Components.Carousel slidesTotal={5}>
						<Slide index={1} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							bg-white 
							"
							>
								<img loading="lazy" src={summer} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-[#C33B4C] font-bold ">
										Summer Phonics Class for Kids{" "}
									</h1>
									<p className="text-[14px] opacity-60">
										This class is 10 sessions long from June 28 - July 28,
										meeting twice a week on Mondays and Wednesdays. Students
										will need the Kids Who Read Well P...
									</p>

									<button className="text-[#FF641A] mt-2 flex items-center">
										Read More&nbsp;
										<img
											src={eventRight}
											alt="event-right-img"
											className="mb-1"
										/>
									</button>
								</div>
							</div>
						</Slide>

						<Slide index={2} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							bg-[#C33B4C]"
							>
								<img loading="lazy" src={math} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-white font-bold ">
										Middle School Math Summer Workshop{" "}
									</h1>
									<p className="text-[14px] text-white">
										This course is intended for rising 6, 7, 8, and 9th graders.
										The class is specifically written for students who struggle
										in mathematics courses during the school year. We w...
									</p>

									<button className="text-white mt-2 flex items-center">
										Read More&nbsp;
										<img
											src={newsRight}
											alt="event-right-img"
											className="h-[12px] mb-1"
										/>
									</button>
								</div>
							</div>
						</Slide>

						<Slide index={3} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							 bg-white"
							>
								<img loading="lazy" src={golf1} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-[#C33B4C] font-bold ">
										Golf for Girls{" "}
									</h1>
									<p className="text-[14px] opacity-60">
										Golf for Girls provides customized golf lessons to girls
										ages 6-12. An experienced golf enthusiast will instruct the
										young ladies on golf vocabulary, proper form, efficient
										swing, and overall golf etiquette.
									</p>

									<button className="text-[#FF641A] mt-2 flex items-center">
										Read More&nbsp;
										<img
											src={eventRight}
											alt="event-right-img"
											className="mb-1"
										/>
									</button>
								</div>
							</div>
						</Slide>

						<Slide index={4} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							bg-[#C33B4C]"
							>
								<img loading="lazy" src={math} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-white font-bold ">
										Middle School Math Summer Workshop{" "}
									</h1>
									<p className="text-[14px] text-white">
										This course is intended for rising 6, 7, 8, and 9th graders.
										The class is specifically written for students who struggle
										in mathematics courses during the school year. We w...
									</p>

									<button className="text-white mt-2 flex items-center">
										Read More&nbsp;
										<img
											src={newsRight}
											alt="event-right-img"
											className="h-[12px] mb-1"
										/>
									</button>
								</div>
							</div>
						</Slide>

						<Slide index={5} className="h-full flex">
							<div
								className="h-full card flex flex-col 
							shadow-sm mx-auto p-1 cursor-pointer max-md:max-w-[300px]
							 bg-white"
							>
								<img loading="lazy" src={golf1} alt="book_img" className="w-full" />
								<div className="details text-left py-5 px-4">
									<h1 className="text-left text-[20px] text-[#C33B4C] font-bold ">
										Golf for Girls{" "}
									</h1>
									<p className="text-[14px] opacity-60">
										Golf for Girls provides customized golf lessons to girls
										ages 6-12. An experienced golf enthusiast will instruct the
										young ladies on golf vocabulary, proper form, efficient
										swing, and overall golf etiquette.
									</p>

									<button className="text-[#FF641A] mt-2 flex items-center">
										Read More&nbsp;
										<img
											src={eventRight}
											alt="event-right-img"
											className="mb-1"
										/>
									</button>
								</div>
							</div>
						</Slide>
					</Components.Carousel>
				</div>

				{/* button */}
				<Components.Button text="View All" className={"w-fit mx-auto mb-20"} />
			</div>

			{/* Important Dates */}
			<div className="Dates min-h-[100vh] w-full bg-white flex flex-col md:flex-row items-center justify-center p-12 md:p-24">
				{/* Image */}
				<div className="Image relative w-full md:w-[60%] lg:w-[40%] max-w-[750px] p-0 md:pr-8 z-0">
					<img
						src={datesBg}
						alt="dates_img"
						className="w-full object-contain"
					/>

					{/* border1 */}
					<div
						style={{
							height: "calc( 100% + 50px  )",
							width: "calc( 50% + 25px )",
							borderRadius: "1000px 0px 0px 1000px",
						}}
						className="absolute block top-[-25px] left-[-25px] border-[2px] border-[#FFE300] -z-10"
					/>
				</div>

				{/* Info */}
				<div className="Info relative w-full md:w-[40%] max-w-[750px] mt-20 md:mt-0 p-0 md:pl-8 flex flex-col items-start text-left">
					<h1 className="text-[25px] md:text-[50px] lg:text-[50px] font-bold font-[riffic]">
						Important Dates
					</h1>

					<div className="mt-5 w-[200px]">
						<p className="text-[14px] text-[#F38315]">10:00 AM</p>

						<h1
							style={{
								lineHeight: 1,
							}}
							className="text-[18px] md:text-[20px] lg:text-[22px] flex items-center font-medium"
						>
							Summer Phonics
						</h1>

						<h1
							style={{
								lineHeight: 1,
							}}
							className="text-[18px] md:text-[20px] lg:text-[22px] flex items-center  font-medium"
						>
							Class&nbsp;
							<svg
								width="10"
								height="10"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.4119 0.227329C15.409 0.335547 15.4036 0.443783 15.4029 0.552424C15.3773 4.81883 15.3522 9.08479 15.327 13.3508C15.325 13.6802 15.3246 13.6806 14.9982 13.683C14.3946 13.6866 13.7901 13.6814 13.1868 13.6985C12.9716 13.7046 12.912 13.6388 12.9137 13.4246C12.9375 10.5135 12.952 7.60211 12.9714 4.69109C12.972 4.59296 13.0032 4.49378 13.0286 4.34644C12.8407 4.42202 12.7828 4.50691 12.7141 4.57565C8.34053 8.94744 6.85053 10.4383 2.47787 14.811C2.18527 15.1036 2.18527 15.1036 1.89088 14.8092C1.47717 14.3955 1.06742 13.9778 0.647968 13.5707C0.511634 13.4387 0.509566 13.3441 0.647912 13.2093C1.09423 12.7743 1.53097 12.3297 1.97119 11.8895C5.93624 7.92443 7.01907 6.8416 10.9841 2.87655C11.0551 2.8056 11.1256 2.7351 11.2102 2.65049C11.1006 2.57798 10.9984 2.60619 10.9047 2.60674C8.00112 2.62212 5.098 2.63969 2.19445 2.65683C1.87904 2.65869 1.8786 2.65825 1.88047 2.34108C1.88404 1.73742 1.89724 1.13282 1.88635 0.529678C1.88243 0.30191 1.9568 0.244087 2.17803 0.24322C6.46675 0.222293 10.7564 0.195226 15.0456 0.169477C15.1463 0.168882 15.2462 0.163911 15.3466 0.16113C15.3683 0.18378 15.3901 0.205554 15.4119 0.227329Z"
									fill="#F38315"
								/>
							</svg>
						</h1>

						<p className="text-[12px] text-black opacity-60">Jun. - July 28</p>
					</div>

					<div className="mt-5 w-[200px]">
						<p className="text-[14px] text-[#F38315]">10:00 AM</p>

						<h1
							style={{
								lineHeight: 1,
							}}
							className="text-[18px] md:text-[20px] lg:text-[22px] flex items-center font-medium"
						>
							Summer Phonics
						</h1>

						<h1
							style={{
								lineHeight: 1,
							}}
							className="text-[18px] md:text-[20px] lg:text-[22px] flex items-center  font-medium"
						>
							Class&nbsp;
							<svg
								width="10"
								height="10"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.4119 0.227329C15.409 0.335547 15.4036 0.443783 15.4029 0.552424C15.3773 4.81883 15.3522 9.08479 15.327 13.3508C15.325 13.6802 15.3246 13.6806 14.9982 13.683C14.3946 13.6866 13.7901 13.6814 13.1868 13.6985C12.9716 13.7046 12.912 13.6388 12.9137 13.4246C12.9375 10.5135 12.952 7.60211 12.9714 4.69109C12.972 4.59296 13.0032 4.49378 13.0286 4.34644C12.8407 4.42202 12.7828 4.50691 12.7141 4.57565C8.34053 8.94744 6.85053 10.4383 2.47787 14.811C2.18527 15.1036 2.18527 15.1036 1.89088 14.8092C1.47717 14.3955 1.06742 13.9778 0.647968 13.5707C0.511634 13.4387 0.509566 13.3441 0.647912 13.2093C1.09423 12.7743 1.53097 12.3297 1.97119 11.8895C5.93624 7.92443 7.01907 6.8416 10.9841 2.87655C11.0551 2.8056 11.1256 2.7351 11.2102 2.65049C11.1006 2.57798 10.9984 2.60619 10.9047 2.60674C8.00112 2.62212 5.098 2.63969 2.19445 2.65683C1.87904 2.65869 1.8786 2.65825 1.88047 2.34108C1.88404 1.73742 1.89724 1.13282 1.88635 0.529678C1.88243 0.30191 1.9568 0.244087 2.17803 0.24322C6.46675 0.222293 10.7564 0.195226 15.0456 0.169477C15.1463 0.168882 15.2462 0.163911 15.3466 0.16113C15.3683 0.18378 15.3901 0.205554 15.4119 0.227329Z"
									fill="#F38315"
								/>
							</svg>
						</h1>

						<p className="text-[12px] text-black opacity-60">Jun. - July 28</p>
					</div>

					<img
						src={datesRight}
						alt="dates_right_img"
						className="h-[50px] md:h-[80px] absolute right-0 bottom-[-20px] md:bottom-[-100px]"
					/>
				</div>
			</div>
		</StaticLayout>
	);
}
