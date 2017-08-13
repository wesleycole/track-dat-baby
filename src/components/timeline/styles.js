import styled, { keyframes } from "styled-components";

export const Container = styled.div`display: flex;`;

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

export const TimelineContainer = styled.ul`
	list-style: none;
	margin: 0 1em 2em 0;
	padding: 0;
	width: 40%;
`;

export const Item = styled.li`
	align-items: center;
	border-bottom: 1px solid #eee;
	display: flex;
	padding: 0.5em 0em;
	transition: all 0.2s ease-in-out;
`;

export const Head = styled.div`
	font-size: 24px;
	padding: 0.5em;
`;

export const Content = styled.div`
	align-items: baseline;
	display: flex;
	font-size: 24px;

	.rc-time-picker {
		margin-top: 0;
	}
`;

export const Time = styled.div`
	font-size: 14px;
	margin-left: 1em;
`;

export const Action = styled.div`
	border: 1px solid #eee;
	border-radius: 3px;
	color: #555;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	margin-left: ${props => (props.noMargin ? "5px" : "auto")};
	padding: 5px;
	text-transform: uppercase;
	transition: all 0.2s ease-in-out;

	&:hover {
		background: #ff5f6d;
		color: #fff;
	}
`;

export const NoEntries = styled.div`
	text-align: ${props => (props.past ? "center" : "left")};
	width: 40%;
`;

export const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-40px);
    }
`;

export const PointAnimated = styled.div`
	animation: ${bounce} 2s linear infinite;
	font-size: 64px;
`;

export const Point = styled.div`font-size: 64px;`;

export const EditInput = styled.input`
	border: 1px solid #eee;
	border-radius: 3px;
	box-sizing: border-box;
	color: #666;
	display: block;
	height: 28px;
	font-size: 12px;
	padding: 0 5px;
`;

export const EditLabel = styled.label`
	display: block;
	font-size: 10px;
	font-weight: bold;
	margin-bottom: 4px;
	text-transform: uppercase;
`;
