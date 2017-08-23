import React from "react";
import emoji from "react-easy-emoji";
import styled from "styled-components";

const Container = styled.div`
	background: linear-gradient(to right, #ff5f6d, #ffc371);
	height: 100vh;
	padding: 2em;
`;

const Letter = styled.div`
	background: #fff;
	border-radius: 3px;
	line-height: 2;
	margin: 0 auto;
	max-width: 40%;
	padding: 2em;
`;

const Welcome = () => {
	return (
		<Container>
			<Letter>
				<h1>
					{emoji("🙌")} Howdy!
				</h1>
				<p>
					Welcome to <strong>{emoji("👶")} Track Dat Baby!</strong>, a
					new and easy tracking system for your little boo bear.
				</p>
				<p>
					Track Dat Baby(TDB) came about because I had a baby, well my
					wife did and I watched {emoji("🙈")}. Anyway, we needed to
					track all of the poops, pees, and feedings because we
					couldn't ever remember that stuff, so Track Dat Baby was
					born (pun intended).
				</p>
				<p>
					TDB is a fairly simple app. My wife and I didn't need a ton
					of functionality, so we are just tracking the minimal for
					right now. I'll hopefully add more features based on
					requests.
				</p>
				<p>
					That's enough from me, I would really appreciate it if you
					would give TDB a try and start tracking dat baby!
				</p>
				<p>
					<em>A fellow sleep deprived but happy parent,</em>
					<br />
					<strong>Wes Cole</strong>
				</p>
			</Letter>
		</Container>
	);
};

export default Welcome;
