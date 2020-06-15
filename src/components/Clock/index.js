import React, { useState, useEffect } from "react";

import Audio, { useAudio } from "../Audio/Audio";

import "./styles.css";

const Clock = () => {
	const { setPlaying } = useAudio();

	const [countdownIsRunning, setCountdownIsRunning] = useState(false);
	const [seconds, setSeconds] = useState(10);
	const [time, setTime] = useState(new Date(seconds * 1000));

	const [countdownTimeout, setCountdownTimeout] = useState(0);

	useEffect(() => {
		if (!countdownIsRunning && seconds < 0) {
			setCountdownIsRunning(false);
			return;
		}

		if (seconds === 0) {
			setPlaying(true);
			return;
		}

		const timeout = setTimeout(() => {
			setSeconds(prevSeconds => {
				return prevSeconds - 1;
			});
		}, 1000);

		setCountdownTimeout(timeout);
	}, [countdownIsRunning, seconds, setPlaying]);

	useEffect(() => {
		if (!countdownIsRunning) {
			clearTimeout(countdownTimeout);
		}
	}, [countdownIsRunning, countdownTimeout]);

	useEffect(() => {
		setTime(new Date(seconds * 1000));
	}, [seconds]);

	return (
		<div id="clock">
			<div className="container">
				<h1>{time.toISOString().substr(11, 8)}</h1>
				<Audio />

				{!countdownIsRunning ? (
					<button
						className="countdown-btn"
						onClick={() => setCountdownIsRunning(true)}
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
						setSeconds(1500);
						setCountdownIsRunning(false);
						setPlaying(false);
					}}
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Clock;
