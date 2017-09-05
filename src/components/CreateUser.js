import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { graphql, gql } from "react-apollo";
import {
	Container,
	SignUpContainer,
	FormContainer,
	Logo,
	Input,
	SignUp
} from "./styles";
import emoji from "react-easy-emoji";

class CreateUser extends React.Component {
	state = {
		emailAddress: "",
		name: "",
		emailSubscription: false
	};

	createUser = () => {
		const variables = {
			idToken: window.localStorage.getItem("auth0IdToken"),
			emailAddress: this.state.emailAddress,
			name: this.state.name,
			emailSubscription: this.state.emailSubscription
		};

		this.props
			.createUser({ variables })
			.then(response => {
				this.props.history.replace("/baby");
			})
			.catch(e => {
				console.error(e);
				this.props.history.replace("/");
			});
	};

	render() {
		if (this.props.data.loading) {
			return <div>Loading</div>;
		}

		// redirect if user is logged in or did not finish Auth0 Lock dialog
		if (
			this.props.data.user ||
			window.localStorage.getItem("auth0IdToken") === null
		) {
			console.warn("not a new user or already logged in");
			return (
				<Redirect
					to={{
						pathname: "/"
					}}
				/>
			);
		}

		return (
			<Container>
				<SignUpContainer>
					<Logo>
						<span>{emoji("👶")}</span>
						Sign Up
						<p>
							Looks like you are new here! Enter your name and
							email address to get started.
						</p>
					</Logo>
					<FormContainer>
						<Input
							value={this.state.emailAddress}
							placeholder="Email"
							onChange={e =>
								this.setState({ emailAddress: e.target.value })}
						/>
						<Input
							value={this.state.name}
							placeholder="Name"
							onChange={e =>
								this.setState({ name: e.target.value })}
						/>
						{this.state.name &&
						this.state.emailAddress && (
							<SignUp onClick={this.createUser}>Sign up</SignUp>
						)}
					</FormContainer>
				</SignUpContainer>
			</Container>
		);
	}
}

const createUser = gql`
	mutation(
		$idToken: String!
		$name: String!
		$emailAddress: String!
		$emailSubscription: Boolean!
	) {
		createUser(
			authProvider: { auth0: { idToken: $idToken } }
			name: $name
			emailAddress: $emailAddress
			emailSubscription: $emailSubscription
		) {
			id
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

export default graphql(createUser, {
	idToken: window.localStorage.getItem("auth0IdToken"),
	name: "createUser"
})(
	graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
		withRouter(CreateUser)
	)
);
