import React from "react";

import "./styles.css";

import NavBar from "../../components/NavBar/index";
import Clock from "../../components/Clock/index";

const Home = () => {
	return (
		<div id="home-page">
			<NavBar />
			<Clock />
		</div>
	);
};

export default Home;
