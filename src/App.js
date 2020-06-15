import React, { useState, useEffect } from "react";
import Clock from "./components/Clock/index";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

import "./App.css";

const App = () => {
	const [pomodoroCount, setPomodoroCount] = useState(0);
	const [breakTime, setBreakTime] = useState(false);
	const [workStatus, setWorkStatus] = useState({
		status: "It's work time!",
	});

	useEffect(() => {
		if (breakTime) {
			setWorkStatus({ status: "It's time for a small break!" });
			return;
		}

		if (pomodoroCount === 4) {
			setWorkStatus({ status: "It's time for a big break!" });
			setBreakTime(false); // Big break is the same time as a non-break time
			return;
		} else if (pomodoroCount < 4) {
			setWorkStatus({ status: "It's work time!" });
		} else {
			setPomodoroCount(0);
		}
	}, [breakTime, pomodoroCount, setWorkStatus]);

	return (
		<div className="App">
			<Header workStatus={workStatus} />
			<Clock
				setPomodoroCount={setPomodoroCount}
				setBreakTime={setBreakTime}
				breakTime={breakTime}
			/>
			<Footer />
		</div>
	);
};

export default App;
