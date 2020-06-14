import React, { useState, useEffect } from "react";

import "./styles.css";

const Clock = () => {
	const [countdownIsRunning, setCountdownIsRunning] = useState(false);
	const [seconds, setSeconds] = useState(1500);
	const [time, setTime] = useState(new Date(seconds * 1000));

	const [mousePressEvent, setMousePressEvent] = useState({
		isPressed: false,
		event: "",
	});
	const [pressingInterval, setPressingInterval] = useState(0);
	const [countdownTimeout, setCountdownTimeout] = useState(0);

	useEffect(() => {
		if (!countdownIsRunning && seconds < 0) {
			setCountdownIsRunning(false);
			return;
		}

		const timeout = setTimeout(() => {
			setSeconds(prevSeconds => {
				return prevSeconds - 1;
			});
		}, 1000);

		setCountdownTimeout(timeout);
	}, [countdownIsRunning, seconds]);

	useEffect(() => {
		if (!countdownIsRunning) {
			clearTimeout(countdownTimeout);
		}
	}, [countdownIsRunning, countdownTimeout]);

	useEffect(() => {
		if (!mousePressEvent.isPressed) return;

		const interval = setInterval(() => {
			setSeconds(prevSeconds => {
				if (mousePressEvent.event[0] === "+") {
					return prevSeconds + 1;
				} else {
					return prevSeconds > 0 ? prevSeconds - 1 : 0;
				}
			});
		}, 150);

		setPressingInterval(interval);
	}, [mousePressEvent]);

	useEffect(() => {
		if (!mousePressEvent.isPressed) {
			clearInterval(pressingInterval);
		}
	}, [mousePressEvent, pressingInterval]);

	useEffect(() => {
		setTime(new Date(seconds * 1000));
	}, [seconds]);

	const handleMouseDown = e => {
		const { value } = e.target;

		setMousePressEvent({ isPressed: true, event: [value] });
	};

	const handleMouseUp = () => {
		setMousePressEvent({ isPressed: false });
	};

	return (
		<div>
			<div id="clock">
				<h1>{time.toISOString().substr(11, 8)}</h1>
				<div>
					<button
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						value="+"
					>
						+
					</button>
					<br />
					<button
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						value="-"
					>
						-
					</button>
				</div>
			</div>
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
		</div>
	);
};

export default Clock;
