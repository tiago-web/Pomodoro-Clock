import React, { useState, useEffect, useContext } from "react";

import { IntervalContext } from "../../context/IntervalContext";
import Audio from "../Audio/Audio";

import "./styles.css";

const Clock = ({
	setPomodoroCount,
	setBreakTime,
	breakTime,
	intervals,
	intervalStatus,
}) => {
	const [, setState] = useContext(IntervalContext);

	const [countdownIsRunning, setCountdownIsRunning] = useState(false);
	const [seconds, setSeconds] = useState(intervals.workTime);
	const [time, setTime] = useState(new Date(seconds * 1000));

	const [countdownTimeout, setCountdownTimeout] = useState(0);

	useEffect(() => {
		if (!countdownIsRunning) return;

		if (seconds === 0) {
			setState(prevState => ({ ...prevState, isPlayingAudio: true }));
			setBreakTime(!breakTime);
			setCountdownIsRunning(false);
			return;
		}

		const timeout = setTimeout(() => {
			setSeconds(prevSeconds => prevSeconds - 1);
		}, 1000);

		setCountdownTimeout(timeout);
	}, [
		countdownIsRunning,
		seconds,
		setPomodoroCount,
		setState,
		setBreakTime,
		breakTime,
	]);

	useEffect(() => {
		if (!countdownIsRunning) {
			clearTimeout(countdownTimeout);
		}
	}, [countdownIsRunning, countdownTimeout]);

	useEffect(() => {
		setTime(new Date(seconds * 1000));
	}, [seconds]);

	useEffect(() => {
		if (!breakTime) {
			setPomodoroCount(prevCount => prevCount + 1);
		}
	}, [breakTime, setPomodoroCount]);

	useEffect(() => {
		if (intervalStatus.includes("small")) {
			setSeconds(intervals.smallBreak);
		} else if (intervalStatus.includes("big")) {
			setSeconds(intervals.bigBreak);
		} else {
			setSeconds(intervals.workTime);
		}
	}, [intervalStatus, intervals]);

	useEffect(() => {
		setSeconds(
			breakTime
				? intervalStatus.includes("small")
					? intervals.smallBreak
					: intervals.bigBreak
				: intervals.workTime
		);
		setCountdownIsRunning(false);
		setState(prevState => ({ ...prevState, isPlayingAudio: false }));
	}, [intervals]);

	const handleResetButton = () => {
		setSeconds(
			breakTime
				? intervalStatus.includes("small")
					? intervals.smallBreak
					: intervals.bigBreak
				: intervals.workTime
		);
		setCountdownIsRunning(false);
		setState(prevState => ({ ...prevState, isPlayingAudio: false }));
	};

	const handleStartButton = () => {
		const audio = document.getElementById("audio");
		audio.load();

		setCountdownIsRunning(true);
		setState(prevState => ({ ...prevState, isPlayingAudio: false }));
	};

	return (
		<div id="clock">
			<div className="container">
				<div className="time">
					<h1>{time.toISOString().substr(11, 8)}</h1>
				</div>
				<Audio />

				{!countdownIsRunning ? (
					<button onClick={handleStartButton}>Start</button>
				) : (
					<button onClick={() => setCountdownIsRunning(false)}>Stop</button>
				)}

				<button onClick={handleResetButton}>Reset</button>
			</div>
		</div>
	);
};

export default Clock;
