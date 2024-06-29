import React from "react";
import * as Components from "../../components/all";
// about
import aboutBg from "../../assets/about-bg.png";
import aboutRight from "../../assets/about-right.png";
import aboutLeft from "../../assets/about-left.png";
// higher
import higherBg from "../../assets/about-bg1.png";
import overlay from "../../assets/footer-bg.png";
import higherRight from "../../assets/higher-right.png";
// glance
import glanceBg from "../../assets/glance-bg.png";
// meet
import meetBg from "../../assets/meet-bg.png";
// offer
import offerBg from "../../assets/offer-bg.png";
// culture
import cultureBg from "../../assets/culture-bg.png";
import cultureBg1 from "../../assets/culture-bg1.png";
// people
import sarah from "../../assets/people-sarah.png";
import brickson from "../../assets/people-brickson.png";
import marnie from "../../assets/people-marnie.png";
// funded
import fundedBg from "../../assets/funded-bg.png";
import { Slide } from "pure-react-carousel";
import StaticLayout from "../../components/StaticLayout";

export default function AboutScreen() {
  return (
    <StaticLayout>
      <div
        className="ABOUT relative 
					min-h-[100vh] w-full 
				bg-white 
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
            src={aboutBg}
            alt="dates_img"
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
          <div className="flex flex-col items-start">
            <Components.Heading
              className="relative 
								w-full md:w-fit 
								flex
								"
              style={{ lineHeight: 2 }}
            >
              About
              <img
                src={aboutLeft}
                alt="left1_img"
                className="absolute 
									right-[0px] bottom-[60%] 
									md:right-[-90%] md:bottom-[40%] 
									h-[50px] md:h-[60px] lg:h-[70px] 
									aspect-square
									"
              />
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
              KidverCity
            </Components.Heading>
          </div>

          <Components.BigParagraph
            className="text-left text-[#00000099] 
							mt-5 md:mt-16 lg:mt-5 
							xl:w-[380px]
							"
          >
            Patton is at the frontier of academic and intellectual discovery.
            Those who venture here—to learn, research, teach, work, and
            grow—join nearly four centuries of students and scholars in the
            pursuit of truth, knowledge, and a better world.
          </Components.BigParagraph>
        </div>

        {/* vector */}
        <img
          src={aboutRight}
          alt="left1_img"
          className="absolute 
						w-[30%] sm:w-[35%] md:w-[15%] lg:w-[20%] 
						aspect-square 
						right-[-50px] bottom-[170px] 
						sm:bottom-[70px] md:bottom-[8vw] 
						md:top-[29%] lg:top-[30%]"
        />
      </div>

      {/* Higher */}
      <div
        className="HIGHER relative 
					min-h-[500px] w-full 
					flex flex-col items-center justify-center 
					p-12 md:px-24 
					z-0 overflow-hidden
					"
        style={{
          backgroundImage: `url(${higherBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={overlay}
          alt="overlay_img"
          className="absolute top-0 left-0 w-full min-h-full object-contain z-10 bg-[#C33B4CCC]"
        />
        <img
          src={higherRight}
          alt="right_img"
          className="absolute max-md:hidden top-[10%] right-[10%] h-[90px] object-contain z-10"
        />

        <div className="z-20 text-white flex flex-col items-center">
          <Components.Paragraph className="border-b-2 border-[#C33B4C] font-bold">
            HIGHER EDUCATION, HIGHER PURPOSE
          </Components.Paragraph>

          <Components.BiggerParagraph className="md:w-[530px] mt-5">
            As a research university and nonprofit institution, KidverCity is
            focused on creating educational opportunities for people from many
            lived experiences.
          </Components.BiggerParagraph>

          <Components.Button
            text={"Learn About The"}
            className="mt-8 w-fit !px-5 !text-[14px]"
          />
        </div>
      </div>

      {/* KidverCity At A glance */}
      <div
        className="GLANCE relative 
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
          className="md:w-1/2 
						pl-12 max-md:py-2 md:pl-24 
						text-left 
						"
        >
          KidverCity
          <br />
          At A glance
        </Components.Heading>

        <Components.BigParagraph
          className="relative 
						md:w-1/2 max-md:py-2 
						px-12 md:pr-24 
						text-left text-[#00000099]
					"
        >
          <span className="max-md:hidden">
            Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit.
            Curabitur <br /> nec tempus nulla. Cras in consequat
            <br /> augue, in sagittis augue.
          </span>

          <span className="md:hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            nec tempus nulla. Cras in consequat augue, in sagittis augue.
          </span>

          <svg
            width="200"
            height="250"
            viewBox="0 0 277 318"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-[-40px] md:right-0 bottom-[-20px]"
          >
            <path
              d="M0.046875 317H139.223L406.786 0.993248"
              stroke="#FFE303"
              strokeWidth="2"
            />
          </svg>
        </Components.BigParagraph>

        {/* image */}
        <img
          src={glanceBg}
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
              the year that KidverCity <br /> University was established.
            </Components.BigParagraph>
            <h1 className="text-[45px] text-[#F38315] font-bold font-[riffic]">
              1636
            </h1>
          </div>

          {/* 2 */}
          <div className="flex flex-col-reverse md:flex-col md:text-left p-2">
            <Components.BigParagraph className="text-[#00000099]">
              students study <br /> at KidverCity.
            </Components.BigParagraph>
            <h1 className="text-[45px] text-[#F38315] font-bold font-[riffic]">
              35,276
            </h1>
          </div>

          {/* 3 */}
          <div className="flex flex-col-reverse md:flex-col md:text-left py-2">
            <Components.BigParagraph className="text-[#00000099]">
              alumni <br /> worldwide.
            </Components.BigParagraph>
            <h1 className="text-[45px] text-[#F38315] font-bold font-[riffic]">
              400k+
            </h1>
          </div>
        </div>
      </div>

      {/* Meet Our President */}
      <div
        className="MEET bg-white 
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
            src={meetBg}
            alt="move_img"
            className="w-full md:w-[55%] lg:w-[50%] object-contain"
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
								py-[40px] px-[30px] md:p-[30px] lg:p-[40px] 
								"
            >
              <Components.SubHeading className="text-start">
                Meet Our President
              </Components.SubHeading>

              {/* text */}
              <Components.Paragraph
                className="text-left 
									mb-auto mt-2 xl:mt-5
								"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur nec tempus nulla. Cras in consequat augue, in sagittis
                augue. Mauris at lobortis tellus, eget blandit libero. Ut rutrum
                vel turpis sed vestibulum. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Nam aliquam tellus sed sem ullamcorper
                pulvinar.
              </Components.Paragraph>

              {/* button */}
              <Components.Button
                text={"Meet Larry"}
                className="mr-auto max-md:mt-5 
									max-xl:py-1 max-xl:px-4 
									max-xl:text-[14px]
									"
              />

              {/* vector */}
              <svg
                width="65"
                height="101"
                viewBox="0 0 104 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute 
									bottom-[0%] 
									right-[10%] 
									max-md:hidden
									"
              >
                <path
                  d="M97.7844 70.7684C91.6337 59.0676 85.2856 41.7765 79.34 35.2827C67.8637 22.7631 72.597 87.4904 53.1463 91.4503C38.3518 94.4626 28.1075 48.0197 15.0826 30.1976C15.0329 29.7436 15.1385 30.1053 17.9764 31.3246C29.1796 47.0165 40.8845 91.4919 54.5493 89.8374C64.7831 88.5988 67.6314 31.9662 77.0777 31.1775C84.2193 30.5848 89.7256 47.7414 100.052 69.4141C100.262 69.8357 97.9619 71.109 97.7844 70.7684Z"
                  fill="#FFE303"
                />
                <path
                  d="M32.7349 35.7832C25.1371 33.9952 17.5776 32.0629 11.0998 27.5384C12.2336 26.8613 13.3673 26.1842 14.4945 25.5112C15.5527 32.6736 16.255 41.1033 14.2556 48.1603C14.0479 48.9005 10.9552 50.1466 10.9547 49.9992C11.0086 44.4999 12.7743 40.2674 11.0891 27.5359C10.9871 26.7877 13.886 25.0727 14.4837 25.5087C20.7304 30.0034 28.0683 32.0382 35.4314 33.9372C35.6187 33.9854 33.5794 35.9806 32.7349 35.7832Z"
                  fill="#FFE303"
                />
              </svg>
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
                height: "30%",
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

      {/* Academic Offerings */}
      <div
        className="OFFERINGS relative z-0 overflow-hidden
					min-h-[700px] w-full 
					flex flex-col items-center justify-center 
					p-12 md:px-24 
					"
        style={{
          backgroundImage: `url(${offerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="Overlay absolute top-0 left-0 w-full min-h-full object-contain z-10 bg-[#C33B4CCC]" />

        <div className="z-20 text-white flex flex-col items-center">
          <Components.Heading>
            Academic offerings <br /> for many kinds <br /> of learners
          </Components.Heading>

          <Components.BiggerParagraph className="max-w-[760px] mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            nec tempus nulla. Cras in consequat augue, in sagittis augue. Mauris
            at lobortis tellus, eget blandit libero. Ut rutrum vel turpis sed
            vestibulum. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Nam aliquam tellus sed sem ullamcorper pulvinar.
          </Components.BiggerParagraph>

          <Components.Button
            className="mt-8 w-fit !px-5 !text-[14px]"
            text={"Learn More"}
          />
        </div>
      </div>

      {/* Culture Where Everyone */}
      <div
        className="CULTURE w-full
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
            <Components.SubHeading className="text-start">
              A culture where <br /> everyone can <br /> thrive
            </Components.SubHeading>

            {/* text */}
            <Components.Paragraph
              className="text-left opacity-60
								md:max-w-[330px]
								my-8 md:my-3
								"
            >
              We are focused on creating a vibrant community of belonging that
              pursues diversity, builds inclusion, and creates more equitable
              opportunities for learning.
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
            src={cultureBg1}
            alt="move_img"
            className="md:hidden w-full object-contain"
          />

          <img
            src={cultureBg}
            alt="move_img"
            className="max-md:hidden w-full object-contain"
          />
        </div>
      </div>

      {/* People Committed */}
      <div
        className="PEOPLE relative bg-white 
					min-h-[100vh] w-full 
					flex flex-col 
					px-12 py-24 md:px-24
					"
      >
        {/* left vector */}
        <svg
          height="319"
          viewBox="0 0 308 319"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute 
						max-w-[300px] aspect-square w-[20%] md:w-[20%] lg:w-[25%]
						lg:top-[21%] lg:left-0 
						md:top-[14%] md:left-0 
						max-md:hidden"
        >
          <path
            d="M307.738 1.99316H168.562L-99.001 318"
            stroke="#FFE303"
            strokeWidth="2"
          />
        </svg>
        <svg
          width="84"
          height="132"
          viewBox="0 0 84 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute 
						max-w-[300px] aspect-square w-[15%] md:w-[20%] lg:w-[25%]
						top-[18%] left-0 
						md:hidden
						"
        >
          <path d="M84 1H26.5146L-84 131" stroke="#FFE303" strokeWidth="2" />
        </svg>

        {/* right vector */}
        <svg
          width="70"
          viewBox="0 0 103 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute 
						lg:top-[15%] lg:right-[10%] lg:h-[30px] 
						md:top-[20%] md:right-[7%] md:h-[25px]
						top-[8%] right-[5%] h-[20px]
						"
        >
          <path
            d="M101.55 43.3963C61.8599 48.5263 76.7298 21.7463 74.1398 6.90627C70.9598 -11.3037 32.8198 10.9863 3.23981 22.2963C1.86981 22.8263 3.18983 28.0863 3.37983 27.9963C14.3398 22.8563 61.3198 -1.72375 71.0098 4.88625C80.4998 11.3563 55.8999 56.4263 101.66 48.1563C102.56 47.9863 102.17 43.3263 101.55 43.3963Z"
            fill="#FFE303"
          />
          <path
            d="M42.6183 25.5662C26.5383 19.7062 25.7383 19.7462 9.00834 22.3862C16.4283 17.0362 24.2783 11.3262 29.6083 4.72618C29.7183 4.59618 29.7083 3.43619 29.5383 3.48619C26.8883 4.28619 2.0083 21.3062 0.648297 22.2262C-0.421703 22.9562 0.488295 28.2262 0.958295 28.1962C23.1783 27.0462 20.1683 22.7462 42.7483 30.7962C42.9883 30.8762 43.8283 26.0062 42.6183 25.5662Z"
            fill="#FFE303"
          />
        </svg>

        {/* text */}
        <Components.Heading
          className="mx-auto lg:w-[700px]"
          style={{ lineHeight: 1.1 }}
        >
          People committed to public purpose
        </Components.Heading>

        <Components.BigParagraph
          className="lg:w-[680px] 
						mx-auto 
						mt-4
						"
        >
          students, alumni, faculty, and staff are committed to making a
          difference in their communities.
        </Components.BigParagraph>

        {/* cards */}
        <div className="w-full flex justify-center my-16 overflow-hidden">
          <Components.Carousel slidesTotal={5}>
            <Slide index={1} className="h-full flex">
              <div
                style={{
                  backgroundImage: `url(${sarah})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="card relative
									max-md:max-w-[300px] 
									flex flex-col 
									shadow-sm mx-auto 
									cursor-pointer aspect-square"
              >
                {/* overlay */}
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195, 59, 76, 0.12) 0%, rgba(195, 59, 76, 0.88) 75%, #C33B4C 100%)",
                  }}
                  className="Overlay absolute h-full w-full top-0 left-0 z-10"
                />

                <div className="card-text h-full w-full flex flex-col items-start justify-end z-20 text-white p-3 md:p-5 text-left">
                  <h1 className="font-[riffic] md:w-[170px] tracking-wider">
                    Sarah Lockridge- Steckel
                  </h1>

                  <p className="my-2 text-[65%]"></p>

                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px]"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={2} className="h-full flex">
              <div
                style={{
                  backgroundImage: `url(${brickson})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="card relative
									max-md:max-w-[300px] 
									flex flex-col 
									shadow-sm mx-auto 
									cursor-pointer aspect-square"
              >
                {/* overlay */}
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195, 59, 76, 0.12) 0%, rgba(195, 59, 76, 0.88) 75%, #C33B4C 100%)",
                  }}
                  className="Overlay absolute h-full w-full top-0 left-0 z-10"
                />

                <div className="card-text h-full w-full flex flex-col items-start justify-end z-20 text-white p-3 md:p-5 text-left">
                  <h1 className="font-[riffic] md:w-[170px] tracking-wider">
                    Brickson Diamond{" "}
                  </h1>

                  <p className="my-2 text-[65%]">
                    HBS alumni Brickson Diamond co-founded the Blackhouse
                    Foundation to educate and promote African American writers,
                    producers, directors, and executives.
                  </p>

                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px]"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={3} className="h-full flex">
              <div
                style={{
                  backgroundImage: `url(${marnie})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="card relative
									max-md:max-w-[300px] 
									flex flex-col 
									shadow-sm mx-auto 
									cursor-pointer aspect-square"
              >
                {/* overlay */}
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195, 59, 76, 0.12) 0%, rgba(195, 59, 76, 0.88) 75%, #C33B4C 100%)",
                  }}
                  className="Overlay absolute h-full w-full top-0 left-0 z-10"
                />

                <div className="card-text h-full w-full flex flex-col items-start justify-end z-20 text-white p-3 md:p-5 text-left">
                  <h1 className="font-[riffic] md:w-[170px] tracking-wider">
                    Marnie Gelbart{" "}
                  </h1>

                  <p className="my-2 text-[65%]"></p>

                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px]"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={4} className="h-full flex">
              <div
                style={{
                  backgroundImage: `url(${brickson})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="card relative
									max-md:max-w-[300px] 
									flex flex-col 
									shadow-sm mx-auto 
									cursor-pointer aspect-square"
              >
                {/* overlay */}
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195, 59, 76, 0.12) 0%, rgba(195, 59, 76, 0.88) 75%, #C33B4C 100%)",
                  }}
                  className="Overlay absolute h-full w-full top-0 left-0 z-10"
                />

                <div className="card-text h-full w-full flex flex-col items-start justify-end z-20 text-white p-3 md:p-5 text-left">
                  <h1 className="font-[riffic] md:w-[170px] tracking-wider">
                    Brickson Diamond{" "}
                  </h1>

                  <p className="my-2 text-[65%]">
                    HBS alumni Brickson Diamond co-founded the Blackhouse
                    Foundation to educate and promote African American writers,
                    producers, directors, and executives.
                  </p>

                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px]"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>

            <Slide index={5} className="h-full flex">
              <div
                style={{
                  backgroundImage: `url(${marnie})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="card relative
									max-md:max-w-[300px] 
									flex flex-col 
									shadow-sm mx-auto 
									cursor-pointer aspect-square"
              >
                {/* overlay */}
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(195, 59, 76, 0.12) 0%, rgba(195, 59, 76, 0.88) 75%, #C33B4C 100%)",
                  }}
                  className="Overlay absolute h-full w-full top-0 left-0 z-10"
                />

                <div className="card-text h-full w-full flex flex-col items-start justify-end z-20 text-white p-3 md:p-5 text-left">
                  <h1 className="font-[riffic] md:w-[170px] tracking-wider">
                    Marnie Gelbart{" "}
                  </h1>

                  <p className="my-2 text-[65%]"></p>

                  <Components.Button
                    text={"Read More"}
                    className="bg-transparent !p-0 text-[10px]"
                    arrowHeight={8}
                    arrowWidth={14}
                  />
                </div>
              </div>
            </Slide>
          </Components.Carousel>
        </div>

        {/* button */}
        <Components.Button text="View All" className={"w-fit mx-auto"} />
      </div>

      {/* Kidversity Is Funded */}
      <div
        className="FUNDED relative
					min-h-[100vh] w-full 
					flex flex-col md:flex-row items-center justify-center 
					px-12 py-24 lg:px-24
					"
      >
        {/* left */}
        <div
          className="relative 
						w-full md:w-[50%] lg:w-[45%] max-w-[750px] 
						p-0 md:pr-8 z-0
						"
        >
          <img
            src={fundedBg}
            alt="dates_img"
            className="w-full object-contain"
          />
        </div>

        {/* right */}
        <div
          className="relative 
						w-full md:w-[50%] lg:w-[50%] max-w-[600px] 
						mt-20 md:mt-0 
						p-0 lg:pl-8 
						flex flex-col items-start 
						text-left
						"
        >
          <Components.SubHeading className="max-w-[500px]">
            How KidverCity University is funded
          </Components.SubHeading>

          <Components.Paragraph className="pt-4 pb-7">
            Research, scholarship, and educational opportunities are made
            possible by an endowment. Our endowment includes thousands of
            philanthropic gifts donated since Patton early history, many of
            which were given to support specific aspects of the University’s
            work. These gifts form a permanent source of funding that connects
            scholars and learners from many diverse backgrounds with
            opportunities at KidverCity, now and into the future.
          </Components.Paragraph>

          <Components.Button
            text="Learn More"
            className="w-fit 
							px-4 
							text-[12px] md:text-[14px]"
          />

          <svg
            width="110"
            height="174"
            viewBox="0 0 110 174"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:hidden absolute 
							bottom-[110%] left-[calc(100%-62px)] sm:left-[calc(100%-30px)]"
          >
            <path d="M0 173H75.6206L221 0.999995" stroke="#FFE303" />
          </svg>
        </div>

        {/* vector */}
        <svg
          width="250"
          height="250"
          viewBox="0 0 277 319"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-md:hidden absolute top-[-140px] right-[-40px]"
        >
          <path
            d="M0.046875 317.007H139.223L406.786 1.00008"
            stroke="#FFE303"
            strokeWidth="2"
          />
        </svg>
      </div>
    </StaticLayout>
  );
}
