import React, { useState, useContext } from "react";
// import { useAudio } from "../../Audio/Audio";
import { IntervalContext } from "../../../context/IntervalContext";

import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

import Slider from "@material-ui/core/Slider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./styles.css";

export default () => {
	const [mouseOver, setMouseOver] = useState(false);
	const [state, setState] = useContext(IntervalContext);
	const [value, setValue] = useState(state.volume * 100);

	const handleIconClick = () => {
		const volume = value === 0 ? 50 : 0;
		setValue(volume);
		setState(prevState => ({ ...prevState, volume: volume / 100 }));
	};

	const handleIconDisplay = () => {
		if (value <= 0) {
			return (
				<VolumeOffIcon
					onClick={handleIconClick}
					onMouseOver={() => setMouseOver(true)}
				/>
			);
		} else if (value <= 40) {
			return (
				<VolumeDownIcon
					onClick={handleIconClick}
					onMouseOver={() => setMouseOver(true)}
				/>
			);
		} else {
			return (
				<VolumeUpIcon
					onClick={handleIconClick}
					onMouseOver={() => setMouseOver(true)}
				/>
			);
		}
	};

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
		setState(prevState => ({ ...prevState, volume: newValue / 100 }));
	};

	return (
		<ClickAwayListener onClickAway={() => setMouseOver(false)}>
			<div className="volume-control" onMouseLeave={() => setMouseOver(false)}>
				{handleIconDisplay()}
				<Slider
					value={typeof value === "number" ? value : 0}
					onChange={handleSliderChange}
					aria-labelledby="input-slider"
					valueLabelFormat={() => value}
					valueLabelDisplay="auto"
					style={{ display: mouseOver ? "" : "none" }}
				/>
			</div>
		</ClickAwayListener>
	);
};
