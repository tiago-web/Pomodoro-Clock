import React, { useState, useEffect } from "react";

import Audio, { useAudio } from "../Audio/Audio";

import "./styles.css";

const Clock = props => {
	const { setIsPlayingAudio } = useAudio();
	const { setPomodoroCount, setBreakTime, breakTime } = props;

	const [countdownIsRunning, setCountdownIsRunning] = useState(false);
	const [seconds, setSeconds] = useState(1500);
	const [time, setTime] = useState(new Date(seconds * 1000));

	const [countdownTimeout, setCountdownTimeout] = useState(0);

	useEffect(() => {
		if (!countdownIsRunning) return;

		if (seconds === 0) {
			setIsPlayingAudio(true);
			setCountdownIsRunning(false);
			setBreakTime(!breakTime);
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
		setIsPlayingAudio,
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
		if (breakTime) {
			setSeconds(300);
		} else {
			setSeconds(1500);
			setPomodoroCount(prevCount => prevCount + 1);
		}
	}, [breakTime, setPomodoroCount]);

	return (
		<div id="clock">
			<div className="container">
				<h1>{time.toISOString().substr(11, 8)}</h1>
				<Audio />

				{!countdownIsRunning ? (
					<button
						className="countdown-btn"
						onClick={() => {
							setCountdownIsRunning(true);
							setIsPlayingAudio(false);
						}}
					>
						Start
					</button>
				) : (
					<button
						className="countdown-btn"
						onClick={() => setCountdownIsRunning(false)}
					>
						Stop
					</button>
				)}

				<button
					className="countdown-btn"
					onClick={() => {
						setSeconds(breakTime ? 300 : 1500);
						setCountdownIsRunning(false);
						setIsPlayingAudio(false);
					}}
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Clock;
