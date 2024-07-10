import React from "react";
import * as Components from "../../components/all";
// student
import studentBg from "../../assets/student-bg.png";
// chat
import chatBg from "../../assets/chat-bg.png";
// contact
import contactBg from "../../assets/contact-bg.png";
// city
import cityBg from "../../assets/city-bg.png";
import cityBg1 from "../../assets/city-bg1.png";
// Arts
import artsBg from "../../assets/arts-bg.png";
// Living
import livingBg from "../../assets/living-bg.png";
// sport
import sportBg from "../../assets/sport-bg.png";
import sportBg1 from "../../assets/sport-bg1.png";
// safety
import safetyBg from "../../assets/safety-bg.png";
import StaticLayout from "../../components/StaticLayout";

export default function StudentScreen() {
  return (
    <StaticLayout>
      <div
        className="STUDENT-LIFE relative 
				w-full 
				flex flex-col items-center 
				"
      >
        <div
          className="relative bg-white
					min-h-[750px w-full
					flex flex-col items-center
					py-12 pt-44 
					"
        >
          <div
            className="w-full relative 
                        flex 
                        mb-[110px] sm:mb-[160px] md:mb-[200px] lg:mb-[280px]
                        pb-3
                        px-12 md:px-24
                        "
          >
            <svg
              height="124"
              viewBox="0 0 355 194"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:hidden absolute bottom-0 left-0 w-[230px]"
            >
              <path
                d="M355 193H87.2912L-65 1"
                stroke="#FFE303"
                strokeWidth="2"
              />
            </svg>
            <svg
              width="111"
              height="68"
              viewBox="0 0 111 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:hidden absolute bottom-0 left-0"
            >
              <path d="M111 67H19.2141L-33 1" stroke="#FFE303" />
            </svg>

            <Components.Heading className="">Student Life</Components.Heading>

            <svg
              width="124"
              height="121"
              viewBox="0 0 124 121"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute
                            bottom-[50%] right-[5%]
                            md:bottom-[-20px] md:right-[10%]
                            h-[50px] md:h-[80px]
                            "
            >
              <path
                d="M0.78805 101.558C1.1779 102.304 1.76896 102.644 2.6325 102.606C5.66326 102.468 8.67726 102.787 11.6996 102.937C12.4081 102.971 13.1291 102.879 13.8417 102.799C14.3364 102.74 14.7681 102.518 14.9149 101.986C15.0658 101.437 14.7472 101.08 14.3657 100.762C13.2548 99.827 11.8673 99.7977 10.5343 99.6174C9.43181 99.4665 8.31675 99.3994 7.20589 99.2946C6.29205 99.2108 6.03215 98.8838 6.56453 97.9993C8.60599 94.6123 10.048 90.9275 11.6326 87.3183C12.2194 85.9853 11.9386 84.8954 10.9535 84.233C9.73782 83.4114 8.58503 83.7635 7.85983 85.2684C6.87892 87.3141 5.96089 89.3933 5.03448 91.4641C3.74755 94.3356 2.43548 97.1945 0.792246 99.8899C0.788054 100.443 0.78805 101.001 0.78805 101.558Z"
                fill="#FFE303"
              />
              <path
                d="M57.9479 120.898C62.3326 120.735 65.9209 118.861 69.2787 116.409C69.5386 116.22 69.811 115.935 69.5511 115.612C69.2032 115.176 68.8134 115.495 68.499 115.705C66.4952 117.029 64.2567 117.654 61.9009 117.93C60.1906 118.132 58.497 117.662 56.7867 117.754C56.1118 117.788 55.4327 117.746 54.762 117.792C54.0033 117.842 53.4667 118.232 53.3829 119.02C53.3032 119.758 53.8566 120.026 54.4392 120.261C55.6088 120.722 56.8412 120.773 57.9479 120.898Z"
                fill="#FFE303"
              />
              <path
                d="M83.1094 91.5058C82.9291 90.1015 82.5309 88.7391 81.9398 87.4229C80.6445 84.5263 79.0055 81.8686 76.6664 79.6888C76.3059 79.3534 75.9076 78.7791 75.3627 79.236C74.7926 79.7139 75.3375 80.1918 75.6268 80.5691C77.794 83.3861 79.3492 86.4755 80.0115 89.9967C80.1499 90.7303 80.4475 91.4429 80.7451 92.1304C81.026 92.7718 81.3068 93.5766 82.2542 93.3125C83.1471 93.0652 83.0675 92.2478 83.1094 91.5058Z"
                fill="#FFE303"
              />
              <path
                d="M45.0622 110.239C45.6909 110.113 46.7934 110.591 46.9192 109.438C47.0491 108.268 45.9466 108.252 45.146 108.151C42.7524 107.841 40.866 106.546 39.0216 105.141C38.485 104.73 37.9233 104.353 37.349 103.997C36.7202 103.607 36.1124 103.729 35.6261 104.253C35.165 104.751 35.3578 105.284 35.6764 105.783C36.8921 107.677 38.6695 108.822 40.7612 109.522C42.1236 109.975 43.5237 110.251 45.0622 110.239Z"
                fill="#FFE303"
              />
              <path
                d="M27.0148 92.6414C27.0064 93.1067 27.2621 93.4673 27.4759 93.8487C28.2053 95.1566 29.3162 96.1375 30.3348 97.1897C31.6595 98.5604 33.0554 99.8599 34.4094 101.201C34.8747 101.662 35.3903 101.985 35.9772 101.524C36.5473 101.08 36.2706 100.522 35.973 100.028C34.0531 96.8753 31.5211 94.2428 28.9012 91.6857C28.5742 91.3671 28.2095 91.1449 27.7233 91.3671C27.2705 91.5767 27.0022 92.0462 27.0148 92.6414Z"
                fill="#FFE303"
              />
              <path
                d="M45.2052 25.7721C45.31 29.004 45.6453 32.1899 47.0496 35.1662C47.343 35.7866 47.6407 36.4866 48.521 36.1932C49.3719 35.9081 49.4306 35.1871 49.2965 34.4242C48.8479 31.7959 47.7077 29.3394 47.385 26.6817C47.2676 25.7385 47.1167 24.7953 46.9616 23.8563C46.8735 23.3156 46.6765 22.8126 46.0016 22.8629C45.3267 22.9132 45.2135 23.4288 45.2052 23.9821C45.201 24.5815 45.2052 25.1768 45.2052 25.7721Z"
                fill="#FFE303"
              />
              <path
                d="M71.6094 70.1053C71.3956 68.1728 70.4063 66.3535 69.2619 64.6222C68.0085 62.7191 66.5204 61.0046 64.8352 59.4703C64.5502 59.2104 64.2274 58.808 63.825 59.2021C63.477 59.5416 63.8375 59.877 64.0429 60.1369C66.1766 62.8406 67.5893 65.8798 68.4067 69.2208C68.5535 69.8328 68.8595 70.4113 69.1403 70.9814C69.4463 71.606 69.8236 72.2054 70.662 72.0629C71.2321 71.9623 71.601 71.2287 71.6094 70.1053Z"
                fill="#FFE303"
              />
              <path
                d="M46.4325 16.7215C46.4242 17.3545 46.5499 17.7611 46.9775 18.0084C47.4344 18.2725 47.841 18.0923 48.168 17.7653C48.7297 17.2036 49.3208 16.6544 49.7945 16.0256C51.1401 14.2441 52.5234 12.5002 54.066 10.8821C54.6278 10.2953 55.0511 9.62038 54.3595 8.89937C53.693 8.19931 53.039 8.65204 52.4731 9.13831C50.6999 10.6809 48.998 12.3032 47.5518 14.1686C46.9398 14.9693 46.5331 15.8705 46.4325 16.7215Z"
                fill="#FFE303"
              />
              <path
                d="M58.5906 54.0369C59.4667 53.9656 59.8314 53.5548 59.7182 52.7667C59.6092 51.9996 59.2445 51.3289 58.8212 50.7085C57.4127 48.6418 55.9748 46.5962 54.5454 44.5421C54.1807 44.0181 53.7196 43.5696 53.0615 43.9511C52.3195 44.3787 52.5794 45.0368 52.8938 45.6195C54.0927 47.858 55.279 50.1048 56.5282 52.3182C56.9977 53.144 57.6139 53.8943 58.5906 54.0369Z"
                fill="#FFE303"
              />
              <path
                d="M82.6374 104.122C82.6374 103.644 82.6542 103.166 82.6332 102.689C82.6123 102.207 82.5871 101.628 81.9374 101.649C81.3756 101.666 81.3547 102.198 81.3086 102.642C81.2541 103.196 81.1619 103.745 81.1116 104.298C80.8558 106.918 79.6108 108.851 77.2382 110.066C76.5424 110.423 75.4902 110.745 75.9345 111.865C76.3873 113.009 77.4646 112.745 78.3197 112.506C80.9648 111.768 81.8116 109.568 82.3607 107.207C82.5913 106.201 82.7338 105.166 82.6374 104.122Z"
                fill="#FFE303"
              />
              <path
                d="M90.4764 21.9778C91.0172 21.9862 91.2896 21.7514 91.2142 21.2526C91.1807 21.0304 91.0591 20.7915 90.904 20.628C88.2924 17.8865 85.6096 15.2288 82.1596 13.5227C81.6231 13.2586 80.9523 12.743 80.4912 13.5478C80.072 14.2772 80.5625 14.8431 81.141 15.2623C82.2057 16.0295 83.2873 16.7714 84.3688 17.5134C86.142 18.7249 87.8732 19.995 89.5123 21.3867C89.8057 21.6466 90.1075 21.9107 90.4764 21.9778Z"
                fill="#FFE303"
              />
              <path
                d="M63.5695 5.47461C63.0497 5.54168 62.2533 5.48719 62.2072 6.43875C62.1611 7.38613 62.8318 7.58734 63.6282 7.6586C66.6758 7.92689 69.7149 8.25386 72.6828 9.07128C73.1565 9.20123 73.7853 9.44856 73.9991 8.74431C74.1877 8.11972 73.5966 7.95623 73.1607 7.78855C70.109 6.6232 67.0237 5.58779 63.5695 5.47461Z"
                fill="#FFE303"
              />
              <path
                d="M94.0297 28.8404C94.1094 29.4525 94.5705 29.8507 95.0652 30.1819C96.612 31.2256 98.2007 32.2149 99.7392 33.2755C100.754 33.9714 101.709 34.7511 102.694 35.493C103.034 35.7487 103.399 35.9206 103.763 35.5685C104.128 35.2164 104.019 34.8265 103.701 34.5205C101.156 32.1101 98.5361 29.792 95.4382 28.1027C94.604 27.6499 93.9878 28.0146 94.0297 28.8404Z"
                fill="#FFE303"
              />
              <path
                d="M20.4016 88.3151C18.1505 88.3025 16.218 89.1786 14.4281 90.4446C14.0005 90.7464 13.6609 91.132 13.3843 91.5806C13.0741 92.092 13.0992 92.5741 13.5058 93.0016C13.9334 93.4502 14.4406 93.4208 14.9101 93.0813C15.4928 92.6663 16.0713 92.2345 16.6121 91.7692C17.8654 90.6919 19.3494 90.1721 20.9507 89.9457C21.5795 89.8577 22.3885 89.9164 22.2837 88.9942C22.1831 88.0929 21.3783 88.3067 20.7579 88.3151C20.6405 88.3151 20.5231 88.3151 20.4016 88.3151Z"
                fill="#FFE303"
              />
              <path
                d="M111.027 5.06354C111.723 5.11804 112.285 4.92102 112.591 4.23354C112.931 3.47061 112.704 2.82086 112.122 2.29687C110.881 1.18182 109.258 0.766817 107.8 0.0667654C107.116 -0.260205 106.307 0.678787 106.58 1.47106C107.012 2.74541 108.328 3.34904 109.028 4.46829C109.38 5.0342 110.311 5.00486 111.027 5.06354Z"
                fill="#FFE303"
              />
              <path
                d="M122.133 19.9778C122.107 19.1561 121.785 18.4267 121.349 17.7602C120.083 15.8236 118.536 14.1258 116.767 12.6377C116.381 12.3149 115.958 12.0215 115.53 12.5161C115.157 12.9479 115.438 13.3587 115.765 13.6605C117.614 15.3624 118.888 17.4333 119.806 19.7514C119.936 20.0742 120.162 20.3718 120.38 20.6485C120.657 21.0006 120.98 21.2982 121.495 21.1263C121.94 20.9754 122.141 20.6149 122.133 19.9778Z"
                fill="#FFE303"
              />
              <path
                d="M123.287 29.6074C123.362 28.4169 123.144 27.1971 123.056 25.973C123.027 25.558 122.939 25.1137 122.444 25.0927C121.866 25.0676 121.752 25.5622 121.748 26.0108C121.736 28.4546 121.115 30.8021 120.642 33.1706C120.528 33.7365 120.445 34.3527 121.061 34.6419C121.773 34.9773 122.172 34.3736 122.499 33.9C123.383 32.6172 123.354 31.1333 123.287 29.6074Z"
                fill="#FFE303"
              />
              <path
                d="M112.915 40.9682C115.337 40.8928 117.199 40.0418 118.926 38.8303C119.14 38.6794 119.479 38.5117 119.324 38.189C119.156 37.8452 118.817 38.0339 118.586 38.1429C116.071 39.3208 113.464 39.0148 110.848 38.671C110.571 38.6333 110.295 38.6123 110.014 38.604C109.515 38.5914 109.02 38.6375 108.848 39.2118C108.66 39.8406 109.154 40.0334 109.59 40.2472C110.722 40.8131 111.946 40.9389 112.915 40.9682Z"
                fill="#FFE303"
              />
            </svg>
          </div>

          <img
            src={studentBg}
            alt="academic_bg_img"
            className="absolute 
						w-[100%] md:w-[80%] max-w-[1000px]
						left-[50%] bottom-0 
						translate-y-[50%] translate-x-[-50%]
						object-contain
						max-md:px-12
                        z-10
						"
          />
        </div>

        <div
          className="relative bg-[#F5F5F5]
					w-full z-0
					flex items-center justify-between flex-wrap
					p-12 md:px-24 md:pb-24
					pt-[27%] sm:pt-[170px] md:pt-[240px] lg:pt-[290px]
					"
        >
          <Components.SubHeading
            className="text-left
                        max-w-[400px] md:max-w-[500px] xl:max-w-[760px] 
						my-4 md:mr-5
						"
          >
            You’ll love the friendly and inclusive community spirit here in
            KidverCity.
          </Components.SubHeading>

          <Components.BigParagraph
            className="text-left
                        max-w-[800px] 
                        my-4 md:mr-5
                        "
          >
            There's always something happening on campus, and so many
            opportunities to explore a new interest, learn a new skill, and meet
            new people. Campus is based in the heart of a vibrant, diverse city
            with loads to discover, and plenty more right on our doorstep.
          </Components.BigParagraph>
        </div>
      </div>

      {/* Chat With Student */}
      <div
        className="CHAT bg-[#F5F5F5] 
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
						md:w-[64%] lg:w-[50%] xl:w-[45%]
                        z-0"
          >
            <img
              src={chatBg}
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
                height: "40%",
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
						w-[90%] md:w-[55%] lg:w-[45%] xl:w-[40%] 
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
                Chat with our students{" "}
              </Components.SubHeading>

              {/* text */}
              <Components.Paragraph
                className="text-left 
								mb-auto mt-2 xl:mt-5
								lg:text-[90%] xl:text-[100%]
								text-[#00000099]
							"
              >
                The best way to find out what it's really like at KidverCity is
                to speak to our students, who can offer hints and tips on how to
                make the most of your time at university.
              </Components.Paragraph>

              {/* button */}
              <Components.Button
                text={"Chat Now"}
                className="mr-auto max-md:mt-5 
								max-xl:py-1 max-xl:px-4 
								max-xl:text-[14px]
								"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact US */}
      <div
        className="CONTACT-US relative z-0 overflow-hidden
				min-h-[650px] w-full 
				flex flex-col items-center justify-center 
				p-12 md:px-24 
				"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="Overlay absolute top-0 left-0 w-full min-h-full object-contain z-10 bg-[#C33B4CCC]" />

        <div className="z-20 text-white flex flex-col items-center">
          <Components.Heading>Contact us</Components.Heading>

          <Components.BiggerParagraph className="max-w-[760px] mt-8">
            Got a question about studying at the University of KidverCity?
            Complete our enquiries form and our Enquiries Team will be in touch
            soon. Alternatively, you can register for updates from the
            University.
          </Components.BiggerParagraph>

          <Components.Button
            className="mt-8 w-fit !px-5 !text-[14px]"
            text={"Apply Now"}
          />
        </div>
      </div>

      {/* City Center */}
      <div
        className="CITY-CENTER bg-white   
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
                        py-[40px] pl-[30px] !pr-[35px] md:p-[30px] lg:p-[40px] 
                        max-md:pt-16
                    "
          >
            <Components.SubHeading className="text-start max-w-[400px]">
              Our city centre campus
            </Components.SubHeading>

            {/* text */}
            <Components.Paragraph
              className="text-left opacity-60
                            md:max-w-[350px]
                            my-8 md:my-4
                            "
            >
              You'll find everything you need here - whether you're studying,
              relaxing or playing. It's friendly, compact and located just
              minutes from the city centre.
            </Components.Paragraph>

            {/* button */}
            <Components.Button
              text={"Our Campus"}
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
                    z-10
                "
        >
          <img
            src={cityBg1}
            alt="move_img"
            className="md:hidden w-full object-contain"
          />

          <img
            src={cityBg}
            alt="move_img"
            className="max-md:hidden w-full object-contain"
          />
        </div>
      </div>

      {/* Arts & Culture */}
      <div
        className="ARTS relative 
                min-h-[100vh] w-full 
                flex flex-col md:flex-row 
                items-center justify-center md:justify-between 
                py-12 md:py-24
                "
      >
        {/* left */}
        <div
          className="relative 
                    w-full md:w-[50%] lg:w-[45%]
                    max-w-[850px] min-w-[350px] 
                    z-0
                    px-12 md:pl-24 md:pr-0
                    "
        >
          <img loading="lazy" src={artsBg} alt="dates_img" className="w-full object-contain" />
        </div>

        {/* right */}
        <div
          className="relative
                    w-full md:w-[45%] lg:w-[50%]   
                    pt-5
                    max-md:mt-10  
                    flex flex-col items-start 
                    text-left
                    "
        >
          <Components.SubHeading
            className="relative 
                        w-full 
                        px-12 md:pr-24 md:pl-0
                        "
          >
            Arts and culture
            <svg
              width="300"
              height="318"
              viewBox="0 0 395 318"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:hidden absolute bottom-[100%] right-0"
            >
              <path
                d="M0 317H179.984L526 0.999991"
                stroke="#FFE303"
                strokeWidth="2"
              />
            </svg>
            <svg
              width="127"
              height="146"
              viewBox="0 0 127 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:hidden absolute bottom-[100%] right-0"
            >
              <path d="M0 145H82.1219L240 0.999996" stroke="#FFE303" />
            </svg>
          </Components.SubHeading>

          <Components.Paragraph
            className="text-left text-[#00000099] 
                        mt-5 md:mt-16 lg:mt-5 
                        xl:w-[480px]
                        px-12 md:pr-24 md:pl-0
                        "
          >
            KidverSity thriving arts scene, diverse multicultural influences and
            historical venues make it an exciting cultural centre.
            <br />
            You'll find plenty to feed the mind and the soul.
          </Components.Paragraph>

          <div
            className="flex mt-8
                        px-12 md:pr-24 md:pl-0
                        "
          >
            <Components.Button text="Events In KidverSity" className="px-4" />
          </div>

          <svg
            height="167"
            viewBox="0 0 173 167"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-md:hidden absolute bottom-[110%] w-[80px]"
          >
            <path
              d="M55.2777 1.73846C37.5067 11.6744 29.5773 39.4998 51.7323 54.389C70.5632 67.0441 118.408 74.601 123.151 111.761C126.731 139.81 105.141 139.231 104.116 149.922C104.004 151.044 119.268 135.843 121.353 132.619C125.016 126.976 127.148 120.405 127.392 113.745C128.945 71.7288 69.7362 60.5583 53.4271 49.4805C34.6095 36.696 39.0793 12.6471 53.5083 4.44377C54.187 4.07408 55.8881 1.38916 55.2777 1.73846Z"
              fill="#FFE303"
            />
            <path
              d="M103.363 129.9C102.451 133.462 100.705 151.675 101.875 151.435C112.357 151.519 126.535 156.161 126.695 156.151C127.394 156.102 129.358 153.861 129.072 153.145C126.996 148.008 115.803 146.682 110.682 146.453C108.704 146.364 106.824 147.066 105.814 144.815C105.427 143.95 106.596 131.207 105.201 127.951C105.086 127.658 103.44 129.606 103.363 129.9Z"
              fill="#FFE303"
            />
          </svg>

          <svg
            width="60"
            height="66"
            viewBox="0 0 60 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:hidden absolute right-[20%] top-[80%]"
          >
            <path
              d="M25.1793 64.6132C17.9484 62.3985 12.8886 52.9172 19.7657 45.775C25.6109 39.7044 42.3898 33.2109 41.1997 19.3471C40.3012 8.88291 32.5076 10.7851 31.2976 6.98364C31.1692 6.58512 37.9023 10.908 38.912 11.915C40.6844 13.677 41.9732 15.8955 42.584 18.2947C46.4406 33.4279 25.8189 42.124 20.7657 47.4243C14.9354 53.5408 18.4431 61.9221 24.3249 63.7697C24.6003 63.8507 25.4283 64.6922 25.1793 64.6132Z"
              fill="#FFE303"
            />
            <path
              d="M32.5936 14.3125C31.9834 13.0906 29.9223 6.61478 30.3656 6.61022C34.1648 5.75819 38.9486 2.96163 39.0075 2.95275C39.2652 2.91592 40.1542 3.57547 40.1063 3.85792C39.7551 5.88576 35.7952 7.24419 33.9536 7.72876C33.2425 7.91632 32.505 7.80851 32.3148 8.70511C32.2421 9.04956 33.6651 13.5844 33.4138 14.8759C33.3951 14.9913 32.6449 14.4132 32.5936 14.3125Z"
              fill="#FFE303"
            />
          </svg>
        </div>
      </div>

      {/* Living Cost */}
      <div
        className="LIVING relative z-0 overflow-hidden
				min-h-[650px] w-full 
				flex flex-col items-center justify-center 
				p-12 md:px-24 
				"
        style={{
          backgroundImage: `url(${livingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="Overlay absolute top-0 left-0 w-full min-h-full object-contain z-10 bg-[#C33B4CCC]" />

        <div className="z-20 text-white flex flex-col items-center">
          <Components.Heading>Living costs</Components.Heading>

          <Components.BiggerParagraph className="max-w-[760px] mt-8">
            You don't need lots of money to get the best from student life in
            KidverCity. We've put together a rough guide to living costs to help
            you plan your budget.
          </Components.BiggerParagraph>

          <Components.Button
            className="mt-8 w-fit !px-5 !text-[14px]"
            text={"our guide"}
          />
        </div>
      </div>

      {/* Sport & Fitness */}
      <div
        className="Sport bg-[#F5F5F5]   
				w-full
                px-8 py-28 lg:px-24
                flex items-stretch justify-center 
                flex-col-reverse md:flex-row
            "
      >
        {/*-- left --*/}
        <div
          className="Left relative z-10 
                    md:aspect-square
                    w-full md:w-[50%] max-w-[550px] md:max-w-[500px]
                    max-md:mb-10 max-md:mx-auto
                    max-md:px-[20px] lg:py-[28px]
                    "
        >
          {/* left items */}
          <div
            className="relative h-full w-full 
                        bg-[#FFDED1] z-10  
                        flex flex-col justify-center 
                        py-[40px] p-[30px] md:p-[30px] lg:p-[40px] 
                        max-md:pt-16
                    "
          >
            <Components.SubHeading className="text-start max-w-[400px]">
              Sport and fitness{" "}
            </Components.SubHeading>

            {/* text */}
            <Components.Paragraph
              className="text-left opacity-60
                            md:max-w-[350px]
                            my-8 md:my-4
                            "
            >
              KidverCity is a really sporty city. Whether you're a spectator or
              a player we're behind you all the way with a lively campus sports
              scene and strong links to the city's sporting institutions. We
              have great sport and fitness facilities on campus, including the
              Unique Fitness and Lifestyle centre.
            </Components.Paragraph>

            {/* button */}
            <Components.Button
              text={"Find out more"}
              className="mr-auto max-xl:text-[14px]"
            />
          </div>
        </div>

        {/*-- right --*/}
        <div
          className="Right relative md:aspect-square
                    w-[100%] md:w-[40%] max-w-[550px]
                    flex items-center
                    max-md:mx-auto 
                    z-10
                    "
        >
          <img
            src={sportBg1}
            alt="move_img"
            className="md:hidden w-full object-contain"
          />
          <img
            src={sportBg}
            alt="move_img"
            className="max-md:hidden w-full object-contain"
          />
        </div>
      </div>

      {/* Safety & Security */}
      <div
        className="SAFETY relative bg-white 
                min-h-[100vh] w-full 
                flex flex-col md:flex-row 
                items-center justify-center md:justify-between 
                py-12 md:py-24
                "
      >
        {/* left */}
        <div
          className="relative 
                    w-full md:w-[50%] lg:w-[45%]
                    max-w-[850px] min-w-[350px] 
                    z-0
                    px-12 md:pl-24 md:pr-0
                    "
        >
          <img
            src={safetyBg}
            alt="dates_img"
            className="w-full object-contain"
          />
        </div>

        {/* right */}
        <div
          className="relative
                    w-full md:w-[45%] lg:w-[50%]   
                    pt-5
                    max-md:mt-10  
                    flex flex-col items-start 
                    text-left
                    "
        >
          <div className="w-full relative px-12 md:pr-24 md:pl-0 pt-2">
            <Components.SubHeading
              className="
                            w-full 
                            max-w-[280px]
                            "
              style={{ lineHeight: 1.2 }}
            >
              Safety and security
            </Components.SubHeading>

            <svg
              width="300"
              height="450"
              viewBox="0 0 411 664"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:hidden absolute top-0 right-0"
            >
              <path d="M0 1H262.448L767 663" stroke="#FFE302" strokeWidth="2" />
            </svg>

            <svg
              width="94"
              height="116"
              viewBox="0 0 94 116"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:hidden absolute top-0 right-0"
            >
              <path d="M0 1H45.5092L133 115" stroke="#FFE302" />
            </svg>
          </div>
          <Components.Paragraph
            className="text-left text-[#00000099] 
                        mt-5 md:mt-16 lg:mt-5 
                        xl:w-[480px]
                        px-12 md:pr-24 md:pl-0
                        "
          >
            Campus is a friendly and safe place, but our security team is on
            hand 24/7 to help. Our student village, The Green, is accredited
            with the Secure by Design standard
          </Components.Paragraph>
          <div
            className="flex mt-8
                        px-12 md:pr-24 md:pl-0
                        "
          >
            <Components.Button text="Learn More" className="px-4" />
          </div>
          <svg
            height="55"
            viewBox="0 0 127 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-md:hidden absolute bottom-[110%] w-[80px] left-[20%]"
          >
            <path
              d="M125.758 1C100.562 12.1115 54.9391 40.0667 69.5245 64.6391C70.1526 65.6975 71.2348 66.4223 72.4471 66.6345C83.6545 68.5964 100.21 66.287 89.6213 42.9865C89.4116 42.5252 89.0794 42.1095 88.6596 41.8257C80.0881 36.0306 59.5437 30.1012 40.8248 49.9432C30.7487 59.6998 9.25278 83.9156 3.87863 102.725M3.87863 102.725L1 66.2578M3.87863 102.725C9.63677 98.7265 22.6885 91.6889 28.8304 95.5276"
              stroke="#FFE300"
              strokeWidth="2"
            />
          </svg>
          <svg
            width="37"
            height="31"
            viewBox="0 0 37 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:hidden absolute right-[20%] top-[95%]"
          >
            <path
              d="M36 30C29.3518 27.0207 17.6344 19.7937 19.6686 13.1164C20.0293 11.9325 21.1852 11.1852 22.422 11.1388C25.248 11.0327 28.2338 12.2382 26.0771 17.528C25.8864 17.9959 25.5623 18.4016 25.126 18.6564C22.5006 20.1892 17.1102 21.3657 12.1726 16.0472C9.34582 13.2657 3.31527 6.36226 1.80758 0.999999M1.80758 0.999999L1 11.3962M1.80758 0.999999C3.423 2.13994 7.08459 4.14623 8.80767 3.05189"
              stroke="#FFE300"
            />
          </svg>
        </div>
      </div>
    </StaticLayout>
  );
}
