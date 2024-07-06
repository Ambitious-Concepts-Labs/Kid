import React from "react";

const SearchBar = (props) => {
	const {
		currentUser,
		setSearchedItems,
		search,
		items,
		setItemsSlice,
		placeholder,
	} = props;
	const BarStyling = {
		width: "20rem",
		background: "#F2F1F9",
		border: "none",
		padding: "0.5rem",
		textAlign: "center",
		marginTop: "2%",
	};
	return (
		<>
			<div id="searchbar-container">
				<input
					style={BarStyling}
					key="random1"
					placeholder={`${placeholder}`}
					onChange={(event) => {
						search({
							currentUser: currentUser,
							event,
							items,
							setSearchedItems,
							setItemsSlice,
						});
					}}
				/>
			</div>
			<div></div>
		</>
	);
};

export default SearchBar;
