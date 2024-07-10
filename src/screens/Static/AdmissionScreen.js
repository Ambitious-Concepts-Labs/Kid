import React from "react";
import * as Components from "../../components/all";
// admission
import admissionBg from "../../assets/admission-bg.png";
// affordable
import affordableBg from "../../assets/affordable-bg.png";
import affordableBg1 from "../../assets/affordable-bg1.png";
// facts
import factsBg from "../../assets/facts-bg.png";
// may also like
import apply from "../../assets/apply.png";
import estimate from "../../assets/estimate.png";
import types from "../../assets/types.png";
// undergraduate
import ugBg from "../../assets/undergraduate-bg.png";
import ugBg1 from "../../assets/undergraduate-bg1.png";
// graduate
import gBg from "../../assets/graduate-bg.png";
import gBg1 from "../../assets/graduate-bg1.png";
// international
import internationalBg from "../../assets/international-bg.png";
import { Slide } from "pure-react-carousel";
import StaticLayout from "../../components/StaticLayout";

export default function AdmissionScreen() {
  return (
    <StaticLayout>
      <div
        className="ADMISSION relative 
				min-h-[100vh] w-full 
				flex flex-col md:flex-row 
				items-center justify-center 
				p-12 pt-40 md:pb-24 lg:px-24
				"
      >
        {/* left */}
        <div
          className="relative 
					w-full md:w-[50%] lg:w-[40%] 
					max-w-[750px] min-w-[350px] 
					p-0 md:pr-8
					lg:mr-8 
					z-0
					"
        >
          <img
            src={admissionBg}
            alt="admission_img"
            className="w-full object-contain"
          />
        </div>

        {/* right */}
        <div
          className="relative 
					w-full md:w-[50%] lg:w-[40%] max-w-[750px] 
					mt-20 md:mt-0 lg:mx-auto 
					flex flex-col items-start 
					text-left
					"
        >
          <div className="flex flex-col items-start lg:min-w-[360px]">
            <Components.Heading
              className="relative 
							w-full md:w-fit 
							flex
							"
              style={{ lineHeight: 1.2 }}
            >
              Admissions
              <svg
                width="134"
                height="129"
                viewBox="0 0 134 129"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute 
								right-[-30%] md:right-[-40%] xl:right-[-60%] 
								bottom-[40%] md:bottom-[70%] 
								h-[50px] md:h-[60px] lg:h-[70px] 
								aspect-square
								"
              >
                <path
                  d="M43.3531 1.93914C29.6516 9.5998 23.538 31.0534 40.6196 42.533C55.1383 52.2901 92.0267 58.1165 95.6841 86.7673C98.444 108.393 81.7977 107.947 81.0077 116.19C80.9217 117.055 92.6898 105.334 94.2974 102.849C97.1219 98.4978 98.7651 93.4319 98.9537 88.2965C100.151 55.902 54.5007 47.2895 41.9263 38.7485C27.4178 28.8916 30.864 10.3497 41.9889 4.02495C42.5122 3.73992 43.8237 1.66982 43.3531 1.93914Z"
                  fill="#FFE303"
                />
                <path
                  d="M80.4266 100.753C79.7238 103.5 78.378 117.542 79.2794 117.357C87.3612 117.422 98.2924 121.001 98.4159 120.993C98.9547 120.955 100.47 119.227 100.249 118.675C98.648 114.714 90.0184 113.693 86.0696 113.516C84.5448 113.447 83.0956 113.989 82.3168 112.253C82.0186 111.586 82.9197 101.761 81.8442 99.2507C81.7555 99.025 80.4867 100.526 80.4266 100.753Z"
                  fill="#FFE303"
                />
              </svg>
            </Components.Heading>

            <Components.Heading
              className=" 
							flex items-center 
							pl-1
							"
            >
              <svg
                width="75"
                height="5"
                viewBox="0 0 269 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M0.416016 2.60938L268.731 2.6094"
                  stroke="#FFE303"
                  strokeWidth="5"
                />
              </svg>
              And Aid
            </Components.Heading>
          </div>

          <Components.BigParagraph
            className="text-left text-[#00000099] 
						mt-5 md:mt-16 lg:mt-8
						lg:min-w-[360px] 
						xl:w-[380px]
						"
          >
            KidverCity welcomes talented, high-achieving students who contribute
            a wide diversity of views, experiences and perspectives. We invite
            you to learn more about how to join this vibrant academic community.
          </Components.BigParagraph>
        </div>

        {/* vector */}
        <svg
          width="359"
          height="450"
          viewBox="0 0 359 631"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-md:hidden absolute 
					md:bottom-[50%] lg:bottom-[50%] xl:bottom-[49%] 
					md:right-[-80px] lg:right-[-80px] xl:right-[-50px]
					"
        >
          <path
            d="M0 629.273H199.671L583.536 0.999968"
            stroke="#FFE303"
            strokeWidth="2"
          />
        </svg>

        <svg
          width="173"
          height="260"
          viewBox="0 0 173 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:hidden absolute 
					bottom-[22%] sm:bottom-[14%] 
					right-[-10px]
					"
        >
          <path d="M0 259.273H82.0818L239.883 1" stroke="#FFE303" />
        </svg>
      </div>

      {/* Affordable */}
      <div
        className="AFFORDABLE bg-white 
				w-full 
				flex flex-col"
      >
        {/* inner container */}
        <div
          className="h-fit relative
				 	w-full max-w-[1400px] 
					flex flex-col-reverse md:flex-row 
					items-center justify-center 
					m-auto  
					px-12 py-24 lg:px-24"
        >
          {/* left */}
          <div
            className="Quote relative z-0 
						w-full md:w-[60%] lg:w-[50%] 
						max-md:mt-[-50px]
						max-md:!aspect-auto
						"
            style={{ aspectRatio: 2 / 1.7 }}
          >
            {/* left items */}
            <div
              className="relative bg-[#FFDED1] z-10 
							h-full w-full
							flex flex-col justify-center
							py-[40px] px-[30px] 
							md:p-[30px] md:!pr-[60px]
							lg:p-[40px]  
							max-md:pt-[80px]
							"
            >
              <Components.SubHeading
                className="text-start
								max-md:max-w-[300px]
								"
              >
                Affordable for All
              </Components.SubHeading>

              <Components.Paragraph
                className="text-left my-8 lg:my-5 xl:my-8
							text-[#00000099]
							"
              >
                We are committed to making a KidverCity education affordable to
                all. Our generous financial aid program allows undergraduates to
                graduate from Princeton debt free. Graduate students also
                benefit from significant University support and other funding
                resources.
              </Components.Paragraph>

              <Components.Button text="Our Campus" className="px-4 w-fit" />
            </div>
          </div>

          {/* right */}
          <div
            className="relative
						w-[90%] md:w-[45%] lg:w-[40%]
						md:ml-[-50px] 
						z-10
						"
          >
            <img
              src={affordableBg}
              alt="move_img"
              className="max-md:hidden w-full max-md:aspect-square md:object-contain"
            />

            <img
              src={affordableBg1}
              alt="move_img"
              className="md:hidden w-full max-md:aspect-square md:object-contain"
            />

            {/* borders */}
            <div
              style={{
                height: "calc( 100% + 50px )",
                width: "70%",
                borderRadius: "0 1000px 1000px 0",
              }}
              className="absolute 
							hidden md:block 
							top-[-25px] right-[-25px] 
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

          {/* vectors */}

          <svg
            width="202"
            height="430"
            viewBox="0 0 292 630"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-md:hidden absolute 
						max-lg:h-[250px] max-lg:w-[250px]
						top-[50px] 
						left-[-70px] lg:left-0"
          >
            <path
              d="M291.536 1H91.8649L-292 629.273"
              stroke="#FFE303"
              strokeWidth="2"
            />
          </svg>

          <svg
            width="94"
            height="235"
            viewBox="0 0 94 235"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:hidden absolute bottom-[70px] left-0"
          >
            <path d="M93.4639 234.059H19.3954L-123 0.999354" stroke="#FFE303" />
          </svg>
        </div>
      </div>

      {/* Facts & Figures */}
      <div
        className="FACTS relative 
				min-h-[100vh] w-full 
				flex flex-row flex-wrap items-center justify-between 
				py-24
				"
      >
        {/* heading */}
        <Components.Heading
          style={{
            lineHeight: 1,
          }}
          className="w-full 
					px-12 max-md:py-2 md:px-24 
					text-center
					"
        >
          Facts & Figures
        </Components.Heading>

        {/* image */}
        <img
          src={factsBg}
          alt="glance_img"
          className="w-full 
					object-contain 
					p-12 md:px-24 md:my-16 
					mx-auto max-w-[1400px]"
        />

        {/* stats */}
        <div className="w-full flex flex-col md:flex-row flex-wrap items-center justify-between px-12 md:px-40">
          {/* 1 */}
          <div className="flex flex-col-reverse md:flex-col md:text-left py-2 ">
            <Components.BigParagraph className="text-[#00000099]">
              undergraduates
            </Components.BigParagraph>
            <h1 className="text-[45px] text-[#F38315] font-bold font-[riffic]">
              7,125{" "}
            </h1>
          </div>

          {/* 2 */}
          <div className="flex flex-col-reverse md:flex-col md:text-left p-2">
            <Components.BigParagraph className="text-[#00000099]">
              graduate students{" "}
            </Components.BigParagraph>
            <h1 className="text-[45px] text-[#F38315] font-bold font-[riffic]">
              2,689{" "}
            </h1>
          </div>

          {/* 3 */}
          <div className="flex flex-col-reverse md:flex-col md:text-left py-2">
            <Components.BigParagraph className="text-[#00000099]">
              medical students{" "}
            </Components.BigParagraph>
            <h1 className="text-[45px] text-[#F38315] font-bold font-[riffic]">
              611{" "}
            </h1>
          </div>
        </div>
      </div>

      {/* Financial Aid */}
      <div
        className="ALSO-LIKE relative bg-white
			 	min-h-[100vh] 
			 	w-full 
			 	flex flex-col
				py-24
			 	"
      >
        {/* heading & btns*/}
        <div className="relative flex justify-between px-12 md:px-24">
          <h1 className="text-[25px] md:text-[50px] lg:text-[50px] font-bold font-[riffic]">
            Financial Aid
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
                <img loading="lazy" src={apply} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    aPPLY FOR AID{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    Get information about important financial aid applications
                    and deadlines.
                  </p>
                  <Components.Button
                    text={"Apply for Aid"}
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
                <img loading="lazy" src={estimate} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-white font-bold font-[riffic] capitalize">
                    ESTIMATE YOUR COSTS{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] text-white">
                    Calculate your estimated costs for tuition, fees, housing,
                    supplies and related expenses.
                  </p>
                  <Components.Button
                    text={"Cost Calculator"}
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
                <img loading="lazy" src={types} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    TYPES OF AID{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    A variety of financial assistance is available, including
                    grants, scholarships and work study.
                  </p>
                  <Components.Button
                    text={"Apply for Aid"}
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
                <img loading="lazy" src={estimate} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-white font-bold font-[riffic] capitalize">
                    ESTIMATE YOUR COSTS{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] text-white">
                    Calculate your estimated costs for tuition, fees, housing,
                    supplies and related expenses.
                  </p>
                  <Components.Button
                    text={"Cost Calculator"}
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
                <img loading="lazy" src={types} alt="book_img" className="w-full" />
                <div className="details text-left py-5 px-4">
                  <Components.BigParagraph className="text-left text-[#C33B4C] font-bold font-[riffic] capitalize">
                    TYPES OF AID{" "}
                  </Components.BigParagraph>
                  <p className="text-[14px] opacity-60">
                    A variety of financial assistance is available, including
                    grants, scholarships and work study.
                  </p>
                  <Components.Button
                    text={"Apply for Aid"}
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

      {/* Undergraduate Admission */}
      <div
        className="UNDERGRADUATE 
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
          <img
            src={ugBg}
            alt="move_img"
            className="max-md:hidden w-full md:w-[55%] lg:w-[50%] object-contain"
          />
          <img
            src={ugBg1}
            alt="move_img"
            className="md:hidden w-full md:w-[55%] lg:w-[50%] object-contain"
          />

          {/* right */}
          <div
            className="Quote relative z-10 
						md:aspect-square 
						w-[90%] md:w-[55%] lg:w-[50%] 
						mb-10 md:mb-0 md:ml-[-50px]
						max-md:mt-[-50px]
						"
          >
            {/* right items */}
            <div
              className="relative bg-[#FFDED1] z-10 
							h-full w-full 
							flex flex-col justify-between 
							py-[40px] px-[30px] md:p-[25px] lg:p-[40px] 
                            "
            >
              <Components.SubHeading
                className="text-start"
                style={{ lineHeight: 1.2 }}
              >
                Undergraduate <br /> Admission
              </Components.SubHeading>

              {/* text */}
              <Components.Paragraph
                className="text-left 
								mb-auto mt-2 xl:mt-5
							"
              >
                Visit the Undergraduate Admission website for more information
                about undergraduate programs, admission requirements, how to
                apply and the University’s generous financial aid program.
              </Components.Paragraph>

              {/* button */}
              <Components.Button text={"Learn More"} className="w-fit mx-4" />
            </div>

            {/* borders */}
            <div
              style={{
                height: "calc( 100% + 50px )",
                width: "30%",
              }}
              className="absolute 
							hidden md:block 
							top-[-25px] right-[-25px] 
							border-[2px] border-[#FFE300] 
							-z-10
							"
            />
            <div
              style={{
                height: "40%",
                width: "calc( 100% + 40px )",
              }}
              className="absolute 
							md:hidden 
							bottom-[-20px] left-[-20px] 
							border-[2px] border-[#FFE300] 
							-z-10
							"
            />
          </div>
        </div>
      </div>

      {/* Graduate Admission */}
      <div
        className="GRADUATE w-full bg-white
                px-8 py-24 lg:px-24
                flex items-stretch justify-center 
                flex-col-reverse md:flex-row
            "
      >
        {/*-- left --*/}
        <div
          className="Left relative z-10 
                    md:aspect-square
                    w-full md:w-[50%] max-w-[600px]
                    max-md:mb-10 max-md:mx-auto
                    "
        >
          {/* left items */}
          <div
            className="relative h-full w-full 
                        bg-[#FFDED1] z-10  
                        flex flex-col justify-center 
                        py-[40px] px-[30px] md:p-[30px] lg:p-[40px] 
                        md:pr-[40px]
                        max-md:pt-16
                    "
          >
            <Components.SubHeading
              className="text-start"
              style={{ lineHeight: 1.2 }}
            >
              Graduate <br /> Admission
            </Components.SubHeading>

            {/* text */}
            <Components.Paragraph
              className="text-left opacity-60
                            md:max-w-[330px]
                            my-8 md:my-3
                            "
            >
              The Graduate School is at the heart of KidverCity teaching and
              research mission. We prepare graduate students for distinguished
              careers, and students from all disciplines and backgrounds are
              encouraged to apply to our Ph.D. and master’s programs.
            </Components.Paragraph>

            {/* button */}
            <Components.Button
              text={"Learn More"}
              className="mr-auto max-xl:text-[14px]"
            />
          </div>

          {/* borders */}
          <div
            style={{
              height: "calc( 100% + 50px )",
              width: "50%",
            }}
            className="absolute hidden md:block top-[-25px] left-[-40px] border-[2px] border-[#FFE300] -z-10"
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
          className="Right overflow-hidden z-20 md:aspect-square
                    w-[90%] md:w-[45%] max-w-[560px]
                    flex items-center
                    max-md:mx-auto max-md:mb-[-35px] md:ml-[-35px] 
                "
        >
          <img
            src={gBg1}
            alt="move_img"
            className="md:hidden w-full object-contain"
          />

          <img
            src={gBg}
            alt="move_img"
            className="max-md:hidden w-full object-contain"
          />
        </div>
      </div>

      {/* International Students */}
      <div
        className="CONTACT-US relative z-0 overflow-hidden
				min-h-[650px] w-full 
				flex flex-col items-center justify-center 
				p-12 md:px-24 
				"
        style={{
          backgroundImage: `url(${internationalBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="Overlay absolute top-0 left-0 w-full min-h-full object-contain z-10 bg-[#C33B4CCC]" />

        <div className="z-20 text-white flex flex-col items-center">
          <Components.Heading>For International Students</Components.Heading>

          <Components.BiggerParagraph className="max-w-[760px] mt-8">
            KidverCity is a diverse community that welcomes students and faculty
            from around the world. We understand that international students may
            have particular questions about the process of applying for
            undergraduate or graduate admission.
          </Components.BiggerParagraph>

          <Components.Button
            className="mt-8 w-fit !px-5 !text-[14px]"
            text={"Learn More"}
          />
        </div>
      </div>
    </StaticLayout>
  );
}
