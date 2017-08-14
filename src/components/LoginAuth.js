import React, { Component, PropTypes } from "react";
import Auth0Lock from "auth0-lock";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const clientId = "O4r7bgASfCN-V4eeGCl3v5C1zzP-7mRn";
const domain = "trackdatbaby.auth0.com";

const LoginButton = styled.button`
	background: linear-gradient(to right, #ff5f6d, #ffc371);
	border: none;
	border-radius: 3px;
	box-shadow: none;
	color: #fff;
	cursor: pointer;
	padding: 5px 10px;
`;

class LoginAuth0 extends Component {
	constructor(props) {
		super(props);

		this._lock = new Auth0Lock(clientId, domain, {
			allowedConnections: ["google-oauth2", "facebook", "twitter"],
			allowShowPassword: true,
			theme: {
				logo: "http://twemoji.maxcdn.com/2/72x72/1f476.png",
				primaryColor: "#ff5f6d"
			}
		});
	}

	static propTypes = {
		history: PropTypes.object.isRequired
	};

	componentDidMount() {
		this._lock.on("authenticated", authResult => {
			window.localStorage.setItem("auth0IdToken", authResult.idToken);
			this.props.history.push(`/signup`);
		});
	}

	_showLogin = () => {
		this._lock.show();
	};

	render() {
		return <LoginButton onClick={this._showLogin}>Log in</LoginButton>;
	}
}

export default withRouter(LoginAuth0);
