import React, { useState, useEffect } from "react";
import Clock from "./components/Clock/index";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import AboutModal from "./components/Modal/AboutModal/index";
import IntervalsModal from "./components/Modal/IntervalsModal/index";

import "./App.css";

const App = () => {
	const [pomodoroCount, setPomodoroCount] = useState(0);
	const [breakTime, setBreakTime] = useState(false);
	const [intervalStatus, setIntervalStatus] = useState("It's work time!");
	const [intervals, setIntervals] = useState({
		workTime: 1500,
		smallBreak: 300,
		bigBreak: 1800,
	});
	const [modalsController, setModalsController] = useState({
		isAboutModalOpen: true,
		isIntervalsModalOpen: false,
	});

	useEffect(() => {
		if (pomodoroCount > 4) {
			setPomodoroCount(1);
			return;
		}

		if (pomodoroCount === 4 && breakTime) {
			setIntervalStatus("It's time for a big break!");
			return;
		}

		if (breakTime) {
			setIntervalStatus("It's time for a small break!");
		} else {
			setIntervalStatus("It's work time!");
		}
	}, [breakTime, pomodoroCount]);

	return (
		<div className="App">
			<Header intervalStatus={intervalStatus} />
			<AboutModal
				modalsController={modalsController}
				setModalsController={setModalsController}
			/>
			<IntervalsModal
				modalsController={modalsController}
				setModalsController={setModalsController}
				setIntervals={setIntervals}
			/>
			<Clock
				setPomodoroCount={setPomodoroCount}
				setBreakTime={setBreakTime}
				breakTime={breakTime}
				intervalStatus={intervalStatus}
				intervals={intervals}
			/>
			<Footer />
		</div>
	);
};

export default App;
