import React from "react";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";
import styled from "styled-components";
import emoji from "react-easy-emoji";

const Header = props => {
	return (
		<SiteHeader>
			<Link to="/">
				<SiteTitle>
					{emoji("👶")}
					<SiteTitleText>Track Dat Baby</SiteTitleText>
				</SiteTitle>
			</Link>
			<Buttons>
				<AccountButton to="/account">
					{props.user && (
						<AccountPhoto
							email={props.user.emailAddress}
							size={30}
							rating="pg"
						/>
					)}Your Account
				</AccountButton>
				<LogoutButton onClick={props.handleLogout}>
					Log out
				</LogoutButton>
			</Buttons>
		</SiteHeader>
	);
};

const SiteHeader = styled.header`
	align-items: center;
	border-bottom: 1px solid #eee;
	display: flex;
`;

const SiteTitle = styled.h1`
	align-items: center;
	display: flex;
	color: #333;
	margin: 0;
	padding-left: 0.5em;
`;

const SiteTitleText = styled.span`
	font-size: 20px;
	margin-left: 10px;
`;

const Buttons = styled.div`
	display: flex;
	margin-left: auto;
`;

const AccountButton = styled(Link)`
	align-items: center;
	background: ${props => (props.isAccountPage ? "#ff5f6d" : "#fff")};
	color: ${props => (props.isAccountPage ? "#fff" : "#000")};
	cursor: pointer;
	display: flex;
	padding: 1em;
	text-decoration: none;
	transition: all 0.2s ease-in-out;

	&:hover {
		background: #ff5f6d;
		color: #fff;
	}
`;

const AccountPhoto = styled(Gravatar)`
	border-radius: 100%;
	margin-right: 0.5em;
`;

const LogoutButton = styled.button`
	background: none;
	border: none;
	border-left: 1px solid #eee;
	border-radius: 0;
	box-shadow: none;
	cursor: pointer;
	cursor: pointer;
	font-size: 1em;
	padding: 1em;
	transition: all 0.2s ease-in-out;

	&:hover {
		background: #ff5f6d;
		color: #fff;
	}
`;

export default Header;
