import React from "react";

const bg = "https://d10grw5om5v513.cloudfront.net/assets/images/left-arrow.png";

export default function ArrowLeft({ className, ...props }) {
	return (
		<img
			src={bg}
			alt="left_arrow_img"
			className={`hover:opacity-80 cursor-pointer ${className}`}
			{...props}
		/>
	);
}
