import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import { FormContainer, Input, SignUp } from "./styles";

class Account extends React.Component {
	state = {
		name: "",
		emailAddress: ""
	};

	logout = () => {
		window.localStorage.removeItem("auth0IdToken");
		this.props.history.push(`/`);
	};

	isLoggedIn = () => {
		return this.props.data.user;
	};

	updateUser = () => {
		const variables = {
			id: this.props.data.user.id,
			emailAddress: this.state.emailAddress,
			name: this.state.name
		};

		this.props
			.updateUser({ variables })
			.then(response => {
				console.log("user updated");
			})
			.catch(e => {
				console.error(e);
			});
	};

	render() {
		if (this.props.data.loading) {
			return <p>Loading...</p>;
		}

		if (this.props.data.error) {
			return <p>{this.props.data.error.message}</p>;
		}

		return (
			<div>
				<Header
					user={this.props.data.user}
					isLoggedIn={this.isLoggedIn}
					handleLogout={this.logout}
					isAccountPage
				/>
				<SettingsContainer>
					<h1>Your Account</h1>
					<FormContainer>
						<Input
							value=""
							placeholder="Email"
							onChange={e =>
								this.setState({ emailAddress: e.target.value })}
						/>
						<Input
							value=""
							placeholder="Name"
							onChange={e =>
								this.setState({ name: e.target.value })}
						/>
						<SignUp onClick={this.updateUser}>Save</SignUp>
					</FormContainer>
				</SettingsContainer>
			</div>
		);
	}
}

const SettingsContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 4em 0;
`;

const updateUser = gql`
	mutation($id: ID!, $name: String!, $emailAddress: String!) {
		updateUser(id: $id, name: $name, emailAddress: $emailAddress) {
			id
		}
	}
`;

const userQuery = gql`
	query userQuery {
		user {
			id
			name
			emailAddress
		}
	}
`;

export default graphql(updateUser, {
	idToken: window.localStorage.getItem("auth0IdToken"),
	name: "updateUser"
})(
	graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
		withRouter(Account)
	)
);
