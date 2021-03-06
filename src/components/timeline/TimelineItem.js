import React from "react";
import { gql, graphql, compose } from "react-apollo";
import emoji from "react-easy-emoji";
import moment from "moment";
import {
	Item,
	Head,
	Content,
	Time,
	Action,
	EditInput,
	EditLabel
} from "./styles";
import TimePicker from "rc-time-picker";

class TimelineItem extends React.Component {
	state = {
		isEditing: false,
		showTimePicker: false,
		childType: this.props.entry.childType,
		time: this.props.entry.time
	};

	onEdit = () => {
		this.setState({
			isEditing: !this.state.isEditing
		});
	};

	showTimePicker = () => {
		this.setState({
			showTimePicker: !this.state.showTimePicker
		});
	};

	handleEditInputChange = e => {
		this.setState({
			childType: e.target.value
		});
	};

	handleEditTimeChange = value => {
		this.setState({
			time: value
		});
	};

	updateEntry = e => {
		this.props.updateEntry({
			variables: {
				id: this.props.entry.id,
				childType: this.state.childType,
				time: this.state.time
			},
			refetchQueries: ["paginateEntries"]
		});

		this.setState({
			isEditing: false
		});
	};

	deleteEntry = () => {
		this.props.deleteEntry({
			variables: {
				id: this.props.entry.id
			},
			refetchQueries: ["paginateEntries"]
		});
	};

	render() {
		const { entry, selected } = this.props;
		const { isEditing } = this.state;
		let icon = emoji("💩");

		if (entry.parentType === "feed") {
			icon = emoji("🍼");
		}

		const child = entry.childType
			.toLowerCase()
			.replace(/\b[a-z]/g, function(letter) {
				return letter.toUpperCase();
			});

		const time = moment(entry.time).format("hh:mm a");

		return (
			<Item selected={selected}>
				<Head>
					{icon}
				</Head>
				<Content>
					{isEditing
						? <span>
								<EditLabel>Edit Type</EditLabel>
								<EditInput
									type="text"
									defaultValue={child}
									onChange={this.handleEditInputChange}
								/>
							</span>
						: child}
					<Time>
						{isEditing
							? <span>
									<EditLabel>Edit Time</EditLabel>
									<TimePicker
										defaultValue={moment(entry.time)}
										onChange={this.handleEditTimeChange}
										use12Hours={true}
										showSecond={false}
									/>
								</span>
							: time}
					</Time>
				</Content>
				<Action onClick={this.onEdit}>
					{isEditing
						? <span onClick={this.updateEntry}>
								{emoji("✔︎ Save")}
							</span>
						: emoji("✏️ Edit")}
				</Action>
				{isEditing &&
					<Action noMargin onClick={this.deleteEntry}>
						{emoji("❌ Delete")}
					</Action>}
			</Item>
		);
	}
}

const updateEntryMutation = gql`
	mutation updateEntry($id: ID!, $childType: String, $time: DateTime) {
		updateEntry(id: $id, childType: $childType, time: $time) {
			id
			childType
			time
		}
	}
`;

const deleteEntryMutation = gql`
	mutation deleteEntry($id: ID!) {
		deleteEntry(id: $id) {
			id
		}
	}
`;

const TimelineItemWithMutation = compose(
	graphql(updateEntryMutation, {
		name: "updateEntry"
	}),
	graphql(deleteEntryMutation, {
		name: "deleteEntry"
	})
)(TimelineItem);

export default TimelineItemWithMutation;
