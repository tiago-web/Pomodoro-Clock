import React, { useState, useEffect } from "react";

import "./styles.css";

const Clock = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [seconds, setSeconds] = useState(1500);
	const [time, setTime] = useState(new Date(seconds * 1000));

	const [mousePressEvent, setMousePressEvent] = useState({
		isPressed: false,
		event: "",
	});
	const [pressingInterval, setPressingInterval] = useState(0);
	const [countDownTimeout, setCountDownTimeout] = useState(0);

	useEffect(() => {
		if (!isRunning && seconds < 0) {
			setIsRunning(false);
			return;
		}

		const timeout = setTimeout(() => {
			setSeconds(prevSeconds => {
				return prevSeconds - 1;
			});
		}, 1000);

		setCountDownTimeout(timeout);
	}, [isRunning, seconds]);

	useEffect(() => {
		if (!isRunning) {
			clearTimeout(countDownTimeout);
		}
	}, [isRunning, countDownTimeout]);

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
		}, 100);

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
			{!isRunning ? (
				<button className="confirm-btn" onClick={() => setIsRunning(true)}>
					Start
				</button>
			) : (
				<button className="confirm-btn" onClick={() => setIsRunning(false)}>
					Stop
				</button>
			)}
		</div>
	);
};

export default Clock;
