import styled from "styled-components";

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
