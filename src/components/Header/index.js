import React from "react";

import "./styles.css";

const Header = props => {
	const { workStatus } = props;
	return (
		<div id="header">
			<header>
				<h1>Pomodoro Clock</h1>
				<img src="./images/tomato.png" alt="tomato-icon" />
			</header>
			<p>{workStatus}</p>
		</div>
	);
};

export default Header;
