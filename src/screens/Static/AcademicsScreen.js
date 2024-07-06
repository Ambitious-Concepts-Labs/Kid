import React from "react";
import * as Components from "../../components/all";
// academics
import academicsBg from "../../assets/academics-bg.png";
// colleges
import collegesBg from "../../assets/colleges-bg.png";
// info
import ugMajor from "../../assets/major.png";
import graduate from "../../assets/graduate.png";
import certificates from "../../assets/certification.png";
// fast forward
import forwardBg from "../../assets/forward-bg.png";
import forwardBg1 from "../../assets/forward-bg1.png";
// academic news
import newsLeft from "../../assets/news-left.png";
import format from "../../assets/format.png";
import success from "../../assets/success.png";
import global from "../../assets/global.png";
import { Slide } from "pure-react-carousel";
import StaticLayout from "../../components/StaticLayout";

export default function AcademicsScreen() {
  return (
    <StaticLayout>
      <div
        className="ACADEMICS relative 
				w-full 
				flex flex-col items-center 
				"
      >
        <div
          className="relative bg-[#F5F5F5]
					min-h-[750px w-full
					flex flex-col items-center
					py-12 pt-44
					"
        >
          <div
            className="w-full relative 
					flex 
					md:mt-10
					"
          >
            <svg
              height="194"
              viewBox="0 0 400 194"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute 
						md:bottom-[-30%] md:left-[-20px]
						lg:bottom-[49%] lg:left-[-80px]
						md:w-[250px] lg:w-[400px]
						max-md:hidden
						"
            >
              <path
                d="M535.688 193H152.928L-64.8125 1"
                stroke="#FFE303"
                strokeWidth="2"
              />
            </svg>

            <svg
              width="73"
              height="37"
              viewBox="0 0 73 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute 
						bottom-[47%] left-[0px]
						md:hidden
						"
            >
              <path
                d="M73 36H13.0842L-21 0.999999"
                stroke="#FFE303"
                strokeWidth={1.5}
              />
            </svg>

            <Components.Heading className="mx-auto">
              Academics
            </Components.Heading>

            <svg
              width="133"
              viewBox="0 0 133 177"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute
						bottom-[100%] right-[5%]
						md:bottom-[-20px] md:right-[10%]
					    h-[60px] md:h-[100px]
						"
            >
              <path
                d="M131.847 30.6711C116.3 17.5257 87.4624 19.8815 81.3095 45.8559C76.0799 67.9331 85.8201 115.381 52.6976 132.882C27.6966 146.091 20.6505 125.675 10.2809 128.473C9.19154 128.763 28.7873 137.71 32.538 138.529C39.1091 139.976 46.0095 139.662 52.3311 137.55C92.2123 124.237 81.8613 64.8795 86.5005 45.7175C91.856 23.6072 115.942 19.3398 128.693 29.9653C129.277 30.4708 132.389 31.1197 131.847 30.6711Z"
                fill="#FFE303"
              />
              <path
                d="M28.7609 120.731C25.1055 121.13 7.44118 125.896 8.07664 126.907C11.6819 136.75 12.3189 151.654 12.3846 151.801C12.6765 152.438 15.4648 153.49 16.0346 152.97C20.1142 149.221 17.4213 138.276 15.8358 133.401C15.2247 131.518 13.9063 130.005 15.6591 128.268C16.3331 127.602 28.6734 124.218 31.2314 121.768C31.4652 121.557 29.0638 120.701 28.7609 120.731Z"
                fill="#FFE303"
              />
            </svg>
          </div>

          <Components.BigParagraph
            className=" 
						px-12 md:px-24 
						max-w-[910px]
						text-[#00000099]
						mt-6 mb-[90px] sm:mb-[130px] md:mb-[240px]
						"
          >
            Whatever your dream is, KidverCity is proud to offer a values-based
            educational foundation to let that passion grow. Our
            nationally-recognized programs incorporate career-specific training
            and hands-on learning to provide you with the critical thinking and
            leadership skills for success. Whether you’re learning online or in
            the classroom, together we can reach new heights.
          </Components.BigParagraph>

          <img
            src={academicsBg}
            alt="academic_bg_img"
            className="absolute 
						w-[100%] md:w-[80%] max-w-[1000px]
						left-[50%] bottom-0 
						translate-y-[50%] translate-x-[-50%]
						object-contain
						max-md:px-12
						"
          />
        </div>

        <div
          className="relative
					w-full
					flex items-center justify-between flex-wrap
					p-12 md:px-24 md:pb-24
					pt-[27%] sm:pt-[170px] md:pt-[240px] lg:pt-[290px]
					"
        >
          <Components.SubHeading
            className="text-left
						max-w-[350px] md:max-w-[400px] xl:max-w-[600px] 
						my-4 md:mr-5
						"
          >
            Realize your potential with our top-ranked programs and faculty.
          </Components.SubHeading>

          <Components.Button text="Meet Our Faculty" className="my-4" />
        </div>
      </div>

      {/* Colleges And Schools */}
      <div
        className="MEET bg-[#F5F5F5] 
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
            className="w-full relative
						md:w-[55%] lg:w-[45%] xl:w-[40%] z-0"
          >
            <img
              src={collegesBg}
              alt="move_img"
              className="w-full max-md:aspect-square md:object-contain"
            />

            {/* borders */}
            <div
              style={{
                height: "calc( 100% + 50px )",
                width: "calc( 50% + 25px)",
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
                height: "30%",
                width: "calc( 100% + 40px )",
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
            className="Quote relative z-10 
						md:aspect-square
						w-[90%] md:w-[64%] lg:w-[50%] xl:w-[45%] 
						mb-10 md:mb-0 md:ml-[-50px] 
						max-md:mt-[-50px]
						"
          >
            {/* right items */}
            <div
              className="relative bg-[#FFDED1] z-10 
							h-full w-full
							flex flex-col justify-between 
							py-[40px] px-[30px] md:p-[30px] lg:p-[40px] 
							"
            >
              <Components.SubHeading className="text-start">
                Colleges and Schools
              </Components.SubHeading>

              {/* text */}
              <Components.Paragraph
                className="text-left 
								mb-auto mt-2 xl:mt-5
								lg:text-[90%] xl:text-[100%]
								text-[#00000099]
							"
              >
                KidverCity University is home to three unique colleges dedicated
                to supporting student goals and education through Jesuit values.
                Offering the benefits of industry-specific knowledge and the
                ability to explore outside a singular chosen field, students in
                the Anderson College of Business and Computing, KidverCity
                College and the Rueckert-Hartman College for Health Professions
                graduate with an understanding of how to make a positive impact
                on the world around them.
              </Components.Paragraph>

              {/* button */}
              <Components.Button
                text={"Explore Our University"}
                className="mr-auto max-md:mt-5 
								max-xl:py-1 max-xl:px-4 
								max-xl:text-[14px]
								"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div
        className="INFO relative
			 	min-h-[100vh] 
			 	w-full 
			 	flex flex-col
				py-24
			 	"
      >
        {/* cards */}
        <div className="w-full flex justify-center px-12 md:px-24 mb-16 overflow-hidden">
          <Components.Carousel slidesTotal={5}>
            <Slide index={1} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
								bg-[#F5F5F5] 
								"
              >
                <img src={ugMajor} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    Undergraduate Majors and Programs{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    Spread across three colleges, our undergraduate students can
                    take advantage of over 70 degree programs to reach career
                    goals, discern the truth around us and l...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] !text-[#F38315] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                    arrowFill={"#F38315"}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={2} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
							bg-[#C33B4C] 
						"
              >
                <img src={graduate} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-white font-bold font-[riffic] capitalize">
                    Graduate and Doctoral Education
                  </Components.BigParagraph>
                  <p className="text-[14px] text-white">
                    Through cohorts and blended course formats tailored to fit
                    busy lives, KidverCity graduate programs combine innovative
                    curricula with real-world scenarios for critical think...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={3} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
								bg-[#F5F5F5] 
								"
              >
                <img src={certificates} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    Certificates and Continuing Education{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    KidverCity offers learning opportunites for working
                    professionals and the constant skill refiners among us.
                    Certificates, endorsements and licensures offer an
                    affordable way to s...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] !text-[#F38315] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                    arrowFill={"#F38315"}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={4} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
							bg-[#C33B4C] 
						"
              >
                <img src={graduate} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-white font-bold font-[riffic] capitalize">
                    Graduate and Doctoral Education
                  </Components.BigParagraph>
                  <p className="text-[14px] text-white">
                    Through cohorts and blended course formats tailored to fit
                    busy lives, KidverCity graduate programs combine innovative
                    curricula with real-world scenarios for critical think...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={5} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
								bg-[#F5F5F5] 
								"
              >
                <img src={certificates} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    Certificates and Continuing Education{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    KidverCity offers learning opportunites for working
                    professionals and the constant skill refiners among us.
                    Certificates, endorsements and licensures offer an
                    affordable way to s...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] !text-[#F38315] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                    arrowFill={"#F38315"}
                  />
                </div>
              </div>
            </Slide>
          </Components.Carousel>
        </div>

        {/* button */}
        <Components.Button text="View All" className={"w-fit mx-auto "} />

        {/* vector */}
        <svg
          height="487"
          viewBox="0 0 253 487"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute 
					right-[-2px] bottom-[40px]
					h-[253px]
					max-md:hidden
					"
        >
          <path
            d="M0.1875 486H154.325L450.652 1.00001"
            stroke="#FFE303"
            strokeWidth="2"
          />
        </svg>

        <svg
          width="95"
          height="177"
          viewBox="0 0 95 177"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute 
					right-[0px] bottom-[0px]
					h-[253px]
					md:hidden
					"
        >
          <path d="M0 176H55.7745L163 1" stroke="#FFE303" />
        </svg>
      </div>

      {/* Fast Forward Degree */}
      <div
        className="FORWARD bg-[#F5F5F5]   
				w-full
                px-8 py-24 lg:px-24
                flex items-stretch justify-center 
                flex-col-reverse md:flex-row
            "
      >
        {/*-- left --*/}
        <div
          className="Left relative z-10 
                    md:aspect-square
                    w-full md:w-[52%] lg:w-[50%] max-w-[600px]
                    max-md:mb-10 max-md:mx-auto
                    "
        >
          {/* left items */}
          <div
            className="relative h-full w-full 
                        bg-[#FFDED1] z-10  
                        flex flex-col justify-center 
                        py-[40px] px-[30px] md:p-[30px] lg:p-[40px] 
                        max-md:pt-16
                    "
          >
            <Components.SubHeading className="text-start">
              Fast Forward Degree Combinations
            </Components.SubHeading>

            {/* text */}
            <Components.Paragraph
              className="text-left opacity-60
                            md:max-w-[350px]
                            my-8 md:my-3
                            "
            >
              Instead of completing your undergraduate program before starting
              on your master's degree, our FastForward bachelor's-to-master's
              degree combinations allow you to get a head start on completing a
              graduate program and getting into the workforce.
            </Components.Paragraph>

            {/* button */}
            <Components.Button
              text={"View Program"}
              className="mr-auto max-xl:text-[14px]"
            />
          </div>

          {/* borders */}
          <div
            style={{
              height: "calc( 100% + 50px )",
              width: "50%",
            }}
            className="absolute hidden md:block top-[-25px] left-[-25px] border-[2px] border-[#FFE300] -z-10"
          />
          <div
            style={{
              height: "40%",
              width: "calc( 100% + 40px )",
            }}
            className="absolute md:hidden bottom-[-20px] left-[-20px] border-[2px] border-[#FFE300] -z-10"
          />
        </div>

        {/*-- right --*/}
        <div
          className="Right overflow-hidden md:aspect-square
                    w-[90%] md:w-[45%] max-w-[560px]
                    flex items-center
                    max-md:mx-auto max-md:mb-[-35px] md:ml-[-35px] 
                "
        >
          <img
            src={forwardBg1}
            alt="move_img"
            className="md:hidden w-full object-contain"
          />

          <img
            src={forwardBg}
            alt="move_img"
            className="max-md:hidden w-full object-contain"
          />
        </div>
      </div>

      {/* Academic News */}
      <div
        className="ACADEMIC-NEWS relative
			 	min-h-[100vh] 
			 	w-full 
			 	flex flex-col
				py-24
			 	"
      >
        {/* heading & btns*/}
        <div className="relative flex justify-between px-12 md:px-24">
          {/* vector */}
          <img
            src={newsLeft}
            alt="left1_img"
            className="absolute h-[120px] w-[100px] md:h-[250px] md:w-[240px] bottom-0 left-[-20px] md:left-[-60px] m-0 "
          />

          {/* text */}
          <h1 className="text-[25px] md:text-[50px] lg:text-[50px] font-bold font-[riffic]">
            Academic News
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
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
								bg-[#F5F5F5] 
								"
              >
                <img src={format} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    Learning Formats{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    The Regis education is built for those who are driven to ask
                    'why'. It's not surprising that students seek a premier
                    education that fits their needs: both traditional campus
                    experiences and flexible, online learning formats. Our blend
                    of course form...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] !text-[#F38315] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                    arrowFill={"#F38315"}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={2} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
							bg-[#C33B4C] 
						"
              >
                <img src={success} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-white font-bold font-[riffic] capitalize">
                    Student Success{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] text-white">
                    Learning styles are not one-size-fits-all and neither are
                    our students. At Regis, we have many tools to make academic
                    success as attainable as possible, so you can focus on
                    learning and doing more. From workshops and career
                    development, to tuto...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={3} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
								bg-[#F5F5F5] 
								"
              >
                <img src={global} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    Global Learning Opportunities{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    We ask more of students so that as graduates, you become
                    leaders for a more just and humane world. Through
                    traditional study abroad opportunities, local and regio...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] !text-[#F38315] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                    arrowFill={"#F38315"}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={4} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
							bg-[#C33B4C] 
						"
              >
                <img src={success} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-white font-bold font-[riffic] capitalize">
                    Student Success{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] text-white">
                    Learning styles are not one-size-fits-all and neither are
                    our students. At Regis, we have many tools to make academic
                    success as attainable as possible, so you can focus on
                    learning and doing more. From workshops and career
                    development, to tuto...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={5} className="h-full flex">
              <div
                className="max-md:max-w-[300px] flex flex-col
								shadow-sm mx-auto p-1 cursor-pointer
								bg-[#F5F5F5] 
								"
              >
                <img src={global} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    Global Learning Opportunities{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    We ask more of students so that as graduates, you become
                    leaders for a more just and humane world. Through
                    traditional study abroad opportunities, local and regio...
                  </p>
                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px] !text-[#F38315] mt-2"
                    arrowHeight={8}
                    arrowWidth={14}
                    arrowFill={"#F38315"}
                  />
                </div>
              </div>
            </Slide>
          </Components.Carousel>
        </div>

        {/* button */}
        <Components.Button text="View All" className={"w-fit mx-auto"} />
      </div>
    </StaticLayout>
  );
}
