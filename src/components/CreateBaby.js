import React from "react";
import { withRouter, Link } from "react-router-dom";
import { graphql, gql } from "react-apollo";
import RadioGroup from "./form/RadioGroup";
import {
	Container,
	SignUpContainer,
	FormContainer,
	Logo,
	Input,
	SignUp,
	SkipLink
} from "./styles";
import emoji from "react-easy-emoji";
import moment from "moment";

class Baby extends React.Component {
	state = {
		name: "",
		birthday: "",
		sex: ""
	};

	onGenderChange = e => {
		this.setState({
			sex: e.target.value
		});
	};

	createBaby = () => {
		const name = this.state.name ? this.state.name : "Boogie Bear";
		const birthday = this.state.birthday ? this.state.birthday : moment();

		this.props.mutate({
			variables: {
				name: name,
				birthday: birthday,
				sex: this.state.sex,
				userId: this.props.data.user.id
			}
		});

		this.props.history.replace("/");
	};

	render() {
		let buttonValue = "Skip and Start Tracking";

		if (this.state.name || this.state.birthday || this.state.sex) {
			buttonValue = "Add Your Baby and Start Tracking";
		}

		return (
			<Container>
				<SignUpContainer>
					<Logo>
						<span>{emoji("👶")}</span>
						Add Your Baby
						<p>
							We are only requesting information about your baby
							for the ability to personalize this app specifically
							for you. This is 100% optional and all information
							about your baby will be 100% safe.
						</p>
					</Logo>
					<FormContainer>
						<Input
							value={this.state.name}
							placeholder="Name"
							onChange={e =>
								this.setState({ name: e.target.value })}
						/>
						<Input
							value={this.state.birthday}
							placeholder="Birth Date"
							onChange={e =>
								this.setState({ birthday: e.target.value })}
						/>
						<RadioGroup
							name="gender"
							value={this.state.sex}
							choices={[
								{ value: "male", label: "Male" },
								{ value: "female", label: "Female" }
							]}
							onChange={this.onGenderChange}
						/>
						<SignUp mt onClick={this.createBaby}>
							{buttonValue}
						</SignUp>
						<p>
							<Link to="/" onClick={this.createBaby}>
								<SkipLink>Skip</SkipLink>
							</Link>
						</p>
					</FormContainer>
				</SignUpContainer>
			</Container>
		);
	}
}

const createBabyMutation = gql`
	mutation($name: String!, $birthday: String!, $sex: String, $userId: [ID!]) {
		createBaby(
			name: $name
			birthday: $birthday
			sex: $sex
			usersIds: $userId
		) {
			id
			name
			birthday
			sex
			users {
				id
			}
		}
	}
`;

const userQuery = gql`
	query {
		user {
			id
		}
	}
`;

const BabyWithMutation = graphql(createBabyMutation)(
	graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
		withRouter(Baby)
	)
);

export default BabyWithMutation;
