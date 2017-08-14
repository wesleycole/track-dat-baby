import React from "react";
import styled from "styled-components";
import TimelineItem from "./TimelineItem";
import NoEntriesToday from "./NoEntries";
import PastDate from "./PastDate";
import moment from "moment";
import emoji from "react-easy-emoji";
import { TimelineContainer } from "./styles";

const customStyles = {
	content: {
		border: "1px solid #eee",
		boxShadow: "4px 4px 20px rgba(0,0,0,0.1)",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		padding: 0,
		transform: "translate(-50%, -50%)",
		width: 320
	},
	overlay: {
		backgroundColor: "rgba(255, 255, 255, 0.7)"
	}
};

class Timeline extends React.Component {
	state = {};

	render() {
		const { date, entries } = this.props;
		if (entries.length) {
			return (
				<TimelineContainer>
					{entries
						.map((entry, key) =>
							<TimelineItem
								i={key}
								key={entry.id}
								length={entries.length}
								entry={entry}
								last={key === 0}
								{...this.props}
							/>
						)
						.reverse()}
				</TimelineContainer>
			);
		} else if (date.format("MM Do YY") !== moment().format("MM Do YY")) {
			return <PastDate />;
		} else {
			return <NoEntriesToday {...this.props} />;
		}
	}
}

export default Timeline;
