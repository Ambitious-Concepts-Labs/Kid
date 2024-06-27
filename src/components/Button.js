import React from "react";
import * as Components from "./all";

export default function Button({
  text,
  onClick,
  withOutArrow,
  className,
  arrowHeight = 13,
  arrowWidth = 21,
  arrowFill = "white",
  outlined = false,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        outlined === true
          ? "text-black bg-transparent border-2 border-[#F38315]"
          : "text-white bg-[#F38315]"
      }
			py-2 px-10 
			rounded-full 
			flex items-center justify-center 
			hover:opacity-80 
			font-bold
			${className}
			`}
      {...props}
    >
      <Components.Paragraph>{text}&nbsp;</Components.Paragraph>
      {!withOutArrow &&
        <svg
          width={arrowWidth}
          height={arrowHeight}
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4365 9.72023C20.3579 9.79464 20.2775 9.86721 20.2003 9.94347C17.1653 12.9378 14.1311 15.9322 11.0968 18.9265C10.8624 19.1578 10.8618 19.1578 10.6294 18.929C10.2 18.5053 9.77624 18.0748 9.33751 17.6609C9.1811 17.5133 9.18546 17.4247 9.33814 17.2747C11.4133 15.236 13.4823 13.1906 15.5544 11.1488C15.6242 11.08 15.7164 11.032 15.8386 10.9459C15.6523 10.8666 15.5513 10.8856 15.4541 10.8856C9.27021 10.8844 7.16241 10.885 0.97854 10.885C0.564745 10.885 0.564745 10.885 0.564745 10.4693C0.564745 9.88504 0.570354 9.30081 0.561629 8.71719C0.558513 8.52777 0.623948 8.45951 0.817135 8.46197C1.44032 8.46997 2.06351 8.46443 2.68607 8.46443C8.2935 8.46443 9.82485 8.46443 15.4323 8.46443C15.5326 8.46443 15.6323 8.46443 15.752 8.46443C15.7258 8.3359 15.6336 8.28363 15.5669 8.21782C13.5029 6.17853 11.4376 4.14109 9.37241 2.10304C9.14806 1.88164 9.14807 1.88103 9.37366 1.6584C9.80303 1.23468 10.2399 0.817104 10.6587 0.383541C10.817 0.219955 10.9104 0.23164 11.0675 0.387231C14.1149 3.40065 17.1672 6.41038 20.2183 9.42073C20.29 9.49145 20.3642 9.55849 20.4371 9.62737C20.4365 9.65873 20.4365 9.68948 20.4365 9.72023Z"
            fill={arrowFill}
          />
        </svg>
      }
    </button>
  );
}
