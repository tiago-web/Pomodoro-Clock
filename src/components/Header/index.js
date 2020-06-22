import React from "react";

import "./styles.css";

const Header = ({ intervalStatus }) => {
	return (
		<div id="header">
			<header>
				<h1>Pomodoro Clock</h1>

				<img src="./images/tomato.png" alt="tomato-icon" />
			</header>
			<h3>{intervalStatus}</h3>
		</div>
	);
};

export default Header;
