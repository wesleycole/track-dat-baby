import React from "react";
import emoji from "react-easy-emoji";
import { NoEntries, Point, InlineButton } from "./styles";

const PastDate = props => {
	return (
		<NoEntries past>
			<Point>
				{emoji("🚫")}
			</Point>
			<h2>This date has passed.</h2>
		</NoEntries>
	);
};

export default PastDate;
