import React from "react";
import Clock from "./components/Clock/index";
import Header from "./components/Header/index";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<Header />
			<Clock />
		</div>
	);
};

export default App;
