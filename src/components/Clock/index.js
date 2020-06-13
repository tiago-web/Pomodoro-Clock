import React, { useState, useEffect } from "react";
import numeral from "numeral";
import "./styles.css";

const Clock = () => {
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const [dateTime] = useState(new Date("June 13, 2020 00:25:00"));

	const [mousePressEvent, setMousePressEvent] = useState({
		isPressed: false,
	});
	const [pressingInterval, setPressingInterval] = useState({});

	var string = numeral(10).format("00");

	useEffect(() => {
		if (startTime > 0 && isRunning) {
			setTimeout(() => {
				setStartTime(prevTime => prevTime - 1);
			}, 10);
		} else {
			setIsRunning(false);
		}
	}, [isRunning, startTime]);

	useEffect(() => {
		if (!mousePressEvent.isPressed) return;

		const interval = setInterval(() => {
			setStartTime(prevTime => {
				dateTime.setSeconds(prevTime);

				if (mousePressEvent.event[0] === "+") {
					return prevTime === 60 ? 0 : prevTime + 1;
				}

				if (mousePressEvent.event[0] === "-") {
					if (
						prevTime > 0 ||
						dateTime.getHours() > 0 ||
						dateTime.getMinutes() > 0
					) {
						return prevTime - 1;
					} else {
						return 0;
					}
				}
			});
		}, 1);

		setPressingInterval({ interval });
	}, [mousePressEvent, dateTime]);

	useEffect(() => {
		if (!mousePressEvent.isPressed) {
			clearInterval(pressingInterval.interval);
		}
	}, [mousePressEvent, pressingInterval]);

	const handleIncrease = () => {
		// dateTime.setSeconds(-120);
		console.log(string);
		// console.log(dateTime.getMinutes());
		// setDateTime(new Date());
		// date.setSeconds(startTime);
	};

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
				<h1>{dateTime.toLocaleTimeString("en-GB")}</h1>
				<div>
					<button
						onClick={handleIncrease}
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
