import styled from "styled-components";

export const Container = styled.div`
	align-items: center;
	background: linear-gradient(to right, #ff5f6d, #ffc371);
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
`;

export const SignUpContainer = styled.div`
	background: #fff;
	border-radius: 3px;
	padding: 30px;
`;

export const Logo = styled.h1`
	font-size: 32px;
	margin-bottom: 20px;
	text-align: center;

	span {
		display: block;
	}

	p {
		font-size: 18px;
		font-weight: normal;
		max-width: 400px;
	}
`;

export const FormContainer = styled.div`min-width: 320px;`;

export const Input = styled.input`
	background: #eee;
	border: none;
	border-radius: 3px;
	box-shadow: none;
	box-sizing: border-box;
	display: block;
	font-size: 18px;
	margin-bottom: 10px;
	padding: 12px 10px;
	width: 100%;
`;

export const SignUp = styled.button`
	background: linear-gradient(to right, #ff5f6d, #ffc371);
	border-radius: 3px;
	box-shadow: none;
	border: none;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	display: block;
	font-size: 18px;
	margin-top: ${props => (props.mt ? "20px" : "")};
	padding: 12px 10px;
	positoin: relative;
	transition: all 0.2s ease-in-out;
	width: 100%;

	&:hover {
		transform: scale(1.05);
	}
`;

export const SkipLink = styled.a`
	color: #ccc;
	font-size: 14px;
	text-decoration: none;
	text-transform: uppercase;
	transition: all 0.2s ease-in-out;

	&:hover {
		color: #ff5f6d;
	}
`;

export const TrackButton = styled.button`
	background: linear-gradient(to right, #ff5f6d, #ffc371);
	border: none;
	border-radius: 3px;
	box-shadow: none;
	color: #fff;
	cursor: pointer;
	font-weight: bold;
	letter-spacing: 1px;
	padding: 10px 20px;
	transition: background 0.3s ease-in-out;
`;

export const ModalContent = styled.div`padding: 1.5em;`;

export const SaveButton = styled.button`
	background: linear-gradient(to right, #ff5f6d, #ffc371);
	border: none;
	box-shadow: none;
	color: #fff;
	cursor: pointer;
	display: block;
	width: 100%;
	font-weight: bold;
	letter-spacing: 1px;
	padding: 20px 20px;
	text-transform: uppercase;
	transition: background 0.3s ease-in-out;
`;

export const ParentButtons = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const TypeButton = styled.button`
	background: #fff;
	border: 1px solid ${props => (props.selected ? "#ff5f6d" : "#eee")};
	border-radius: 3px;
	box-shadow: none;
	color: ${props => (props.selected ? "#ff5f6d" : "#333")};
	flex: 1;
	font-size: 24px;
	margin-right: 0.5em;
	outline: none;
	padding: 10px 10px;
	transition: all 0.1s ease-in-out;

	&:last-child {
		margin-right: 0;
	}
`;

export const EditTime = styled.button`
	background: none;
	border: none;
	box-shadow: none;
	color: #ccc;
	font-size: 14px;
	margin-top: 1em;
`;

export const ModalTitle = styled.h3`
	margin: 0;
	margin-bottom: 0.5em;
	text-transform: uppercase;
`;

export const ModalDescription = styled.p`
	color: #cecece;
	margin-top: 0;
`;
