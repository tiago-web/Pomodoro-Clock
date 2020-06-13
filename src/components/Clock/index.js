import React, { useState, useEffect } from "react";
import numeral from "numeral";

import "./styles.css";

const Clock = () => {
	const [isRunning, setIsRunning] = useState(false);

	const [startTime, setStartTime] = useState(0);
	const [newTime, setNewTime] = useState({
		hours: 1,
		minutes: 0,
		seconds: 0,
	});

	const time = useTime({
		hours: newTime.hours,
		minutes: newTime.minutes,
		seconds: newTime.seconds,
	});

	const [mousePressEvent, setMousePressEvent] = useState({
		isPressed: false,
	});
	const [pressingInterval, setPressingInterval] = useState({});

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
				if (mousePressEvent.event[0] === "+") {
					return prevTime === 60 ? 0 : prevTime + 1;
				} else {
					return prevTime > 0 ? prevTime - 1 : 0;
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

	const handleIncrease = () => {
		console.log(time);
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
				<h1>
					{time.getHour}:{time.getMinute}:{time.getSecond}
				</h1>
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

function useTime({ hours, minutes, seconds }) {
	const getHour = numeral(hours).format("00");
	const getMinute = numeral(minutes).format("00");
	const getSecond = numeral(seconds).format("00");

	return { getHour, getMinute, getSecond };
}

export default Clock;
