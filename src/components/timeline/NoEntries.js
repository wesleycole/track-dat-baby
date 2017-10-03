import React from "react";
import styled, { keyframes } from "styled-components";
import emoji from "react-easy-emoji";
import { NoEntries } from "./styles";

const NoEntriesToday = props => {
	return (
		<NoEntries>
			<PointAnimated>{emoji("👆")}</PointAnimated>
			<h2>Add your first entry for today.</h2>
		</NoEntries>
	);
};

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-40px);
    }
`;

const PointAnimated = styled.div`
	animation: ${bounce} 2s linear infinite;
	font-size: 64px;
`;

export default NoEntriesToday;
