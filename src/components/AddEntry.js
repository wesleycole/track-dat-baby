import React from "react";
import { gql, graphql } from "react-apollo";
import Modal from "react-modal";
import emoji from "react-easy-emoji";
import RadioGroup from "./form/RadioGroup";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import {
	ModalContent,
	ModalTitle,
	ModalDescription,
	ParentButtons,
	TypeButton,
	SaveButton,
	EditTime,
	TrackButton
} from "./styles";

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

class AddEntry extends React.Component {
	state = {
		modalIsOpen: false,
		parentType: "",
		childType: "",
		editTime: false,
		time: moment(),
		parentSelected: false
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	showChildType = parentType => {
		this.setState({
			parentType: parentType
		});
	};

	handleValueChange = e => {
		this.setState({ childType: e.target.value });
	};

	handleTimeChange = value => {
		this.setState({ time: value });
	};

	showTimePicker = () => {
		this.setState({ editTime: true });
	};

	saveEntry = e => {
		this.props.mutate({
			variables: {
				parentType: this.state.parentType,
				childType: this.state.childType,
				time: this.state.time,
				babyId: this.props.data.user.baby.id
			},
			refetchQueries: ["paginateEntries"]
		});

		this.setState({
			modalIsOpen: false,
			parentType: "",
			childType: "",
			time: moment(),
			editTime: false
		});
	};

	render() {
		const { parentType, childType } = this.state;
		console.log(this.props);
		let childOutput = "";
		if (parentType === "diaper") {
			childOutput = (
				<RadioGroup
					name="foo"
					value={childType}
					choices={[
						{ value: "poop", label: "Poop" },
						{ value: "pee", label: "Pee" },
						{ value: "both", label: "Both" }
					]}
					onChange={this.handleValueChange}
				/>
			);
		} else if (parentType === "feed") {
			childOutput = (
				<RadioGroup
					name="foo"
					value={childType}
					choices={[
						{ value: "breast", label: "Breast" },
						{ value: "bottle", label: "Bottle" }
					]}
					onChange={this.handleValueChange}
				/>
			);
		}

		let time = (
			<EditTime onClick={this.showTimePicker}>
				{emoji("⏰")} Edit the Time
			</EditTime>
		);

		if (this.state.editTime) {
			time = (
				<TimePicker
					defaultValue={this.state.time}
					onChange={this.handleTimeChange}
					use12Hours={true}
					showSecond={false}
				/>
			);
		}
		return (
			<div>
				<TrackButton onClick={this.openModal}>
					Track dat baby!
				</TrackButton>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Entry Modal"
				>
					<ModalContent>
						<ModalTitle>Track yo baby!</ModalTitle>
						<ModalDescription>
							Is your little munchkin eating or smellin'?
						</ModalDescription>
						<ParentButtons>
							<TypeButton
								onClick={() => this.showChildType("diaper")}
								selected={
									this.state.parentType === "diaper" && true
								}
							>
								{emoji("💩")}
							</TypeButton>
							<TypeButton
								onClick={() => this.showChildType("feed")}
								selected={
									this.state.parentType === "feed" && true
								}
							>
								{emoji("🍼")}
							</TypeButton>
						</ParentButtons>
						{childOutput}
						{time}
					</ModalContent>
					<SaveButton onClick={this.saveEntry}>Save</SaveButton>
				</Modal>
			</div>
		);
	}
}

const addEntryMutation = gql`
	mutation createEntry(
		$parentType: String!
		$childType: String!
		$time: DateTime
		$babyId: ID!
	) {
		createEntry(
			parentType: $parentType
			childType: $childType
			time: $time
			babyId: $babyId
		) {
			id
			parentType
			childType
			time
			baby {
				id
			}
		}
	}
`;

const AddEntryWithMutation = graphql(addEntryMutation)(AddEntry);

export default AddEntryWithMutation;
