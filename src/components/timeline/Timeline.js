import React from "react";
import TimelineItem from "./TimelineItem";
import NoEntriesToday from "./NoEntries";
import PastDate from "./PastDate";
import moment from "moment";
import { TimelineContainer } from "./styles";

class Timeline extends React.Component {
	state = {};

	render() {
		const { date, entries } = this.props;
		if (entries.length) {
			return (
				<TimelineContainer>
					{entries.map((entry, key) =>
						<TimelineItem
							i={key}
							key={entry.id}
							length={entries.length}
							entry={entry}
							last={key === 0}
							{...this.props}
						/>
					)}
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
