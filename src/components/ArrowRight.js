import React from "react";

const bg = "https://d10grw5om5v513.cloudfront.net/assets/images/home-right.png";

export default function ArrowRight({ className, ...props }) {
	return (
		<img
			src={bg}
			alt="right_arrow_img"
			className={`hover:opacity-80 cursor-pointer ${className}`}
			{...props}
		/>
	);
}
