import React from "react";
import styled from "styled-components";

const Loading = props => {
	<Container>
		<p>Loading</p>
	</Container>;
};

const Container = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
`;

export default Loading;
