import React from "react";
import Auth0Lock from "auth0-lock";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import AddEntry from "./AddEntry";
import EntriesListWithData from "./EntriesList";
import moment from "moment";

const clientId = process.env.REACT_APP_AUTH0_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;

const Container = styled.div`padding: 1em;`;

const ToolBar = styled.div`
	display: flex;
	padding: 1em 0 2em 0;
`;

const DateWrapper = styled.div`
	align-items: center;
	display: flex;
	margin-left: auto;
`;

const DateNav = styled.div`margin-left: 1em;`;

const CurrentDate = styled.div`margin-right: 1em;`;

const DateNavButton = styled.button`
	background: ${props => (props.disabled ? "#eee" : "none")};
	border: 1px solid #eee;
	border-right: none;
	color: ${props => (props.disabled ? "#ccc" : "#333")};
	cursor: ${props => (props.disabled ? "normal" : "pointer")};
	box-shadow: none;
	font-size: 1em;
	outline: none;
	padding: 10px 20px;
	transition: all 0.2s ease-in-out;

	&:first-child {
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	&:last-child {
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		border-right: 1px solid #eee;
	}

	&:hover {
		background: ${props => (props.disabled ? "#eee" : "#ff5f6d")};
		color: ${props => (props.disabled ? "#ccc" : "#fff")};
	}
`;

class App extends React.Component {
	constructor() {
		super();

		this._lock = new Auth0Lock(clientId, domain, {
			allowedConnections: ["google-oauth2", "facebook"],
			allowShowPassword: true,
			theme: {
				logo: "http://twemoji.maxcdn.com/2/72x72/1f476.png",
				primaryColor: "#ff5f6d"
			},
			closable: false,
			languageDictionary: {
				emailInputPlaceholder: "something@youremail.com",
				title: "Log me in"
			}
		});

		this.state = {
			date: moment()
		};
	}

	logout = () => {
		window.localStorage.removeItem("auth0IdToken");
		window.location.reload();
	};

	isLoggedIn = () => {
		return this.props.data.user;
	};

	goBack = () => {
		this.setState({
			date: this.state.date.subtract(1, "days")
		});
	};

	goForward = () => {
		this.setState({
			date: this.state.date.add(1, "days")
		});
	};

	goToToday = () => {
		this.setState({
			date: moment()
		});
	};

	componentDidMount() {
		this._lock.on("authenticated", authResult => {
			window.localStorage.setItem("auth0IdToken", authResult.idToken);
			this.props.history.push(`/signup`);
		});
	}

	componentDidUpdate() {
		if (!this.isLoggedIn()) {
			this._lock.show();
		}
	}

	render() {
		const today =
			this.state.date.format("MMM Do YY") ===
			moment().format("MMM Do YY");

		return (
			<div>
				<Header
					user={this.props.data.user}
					isLoggedIn={this.isLoggedIn}
					handleLogout={this.logout}
				/>
				<Container>
					<ToolBar>
						<AddEntry {...this.props} />
						<DateWrapper>
							<CurrentDate>
								{this.state.date.format("MMMM Do, YYYY")}
							</CurrentDate>
							<DateNav>
								<DateNavButton onClick={this.goBack}>
									Prev
								</DateNavButton>
								<DateNavButton middle onClick={this.goToToday}>
									Today
								</DateNavButton>
								<DateNavButton
									disabled={today}
									onClick={this.goForward}
								>
									Next
								</DateNavButton>
							</DateNav>
						</DateWrapper>
					</ToolBar>
					{this.isLoggedIn() && (
						<EntriesListWithData
							startDate={this.state.date.startOf("day").format()}
							endDate={this.state.date.endOf("day").format()}
							date={this.state.date}
							goToToday={this.goToToday}
						/>
					)}
				</Container>
			</div>
		);
	}
}

const babyQuery = gql`
	query babyQuery {
		user {
			id
			name
			emailAddress
			baby {
				id
				entries {
					id
					parentType
					childType
					time
				}
			}
		}
	}
`;

export default graphql(babyQuery, { options: { fetchPolicy: "network-only" } })(
	withRouter(App)
);
