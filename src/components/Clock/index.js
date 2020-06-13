import React, { useState, useEffect } from "react";

import "./styles.css";

const Clock = () => {
	const [isRunning, setIsRunning] = useState(false);

	const [seconds, setSeconds] = useState(1500);

	const [date, setDate] = useState(new Date(seconds * 1000));

	const [mousePressEvent, setMousePressEvent] = useState({
		isPressed: false,
		event: "",
	});
	const [pressingInterval, setPressingInterval] = useState({});

	useEffect(() => {
		if (seconds > 0 && isRunning) {
			setTimeout(() => {
				setSeconds(prevSeconds => {
					return prevSeconds - 1;
				});
			}, 1000);
		} else {
			setIsRunning(false);
		}
	}, [isRunning, seconds]);

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
		}, 10);

		setPressingInterval({ interval });
	}, [mousePressEvent]);

	useEffect(() => {
		if (!mousePressEvent.isPressed) {
			clearInterval(pressingInterval.interval);
		}
	}, [mousePressEvent, pressingInterval]);

	useEffect(() => {
		setDate(new Date(seconds * 1000));
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
				<h1>{date.toISOString().substr(11, 8)}</h1>
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
