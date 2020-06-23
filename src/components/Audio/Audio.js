import React, { useState, useEffect, useContext } from "react";

import { IntervalContext } from "../../context/IntervalContext";

export default () => {
	return (
		<audio id="audio" loop>
			<source src="./sounds/alarm-clock.mp3"></source>
		</audio>
	);
};

export const useAudio = () => {
	const [isPlayingAudio, setIsPlayingAudio] = useState(false);

	const [state] = useContext(IntervalContext);

	useEffect(() => {
		const audio = document.getElementById("audio");

		isPlayingAudio && state.volume !== 0 ? audio.play() : audio.pause();
	}, [isPlayingAudio, state.volume]);

	useEffect(() => {
		const audio = document.getElementById("audio");

		audio.volume = state.volume;
	}, [state.volume]);

	return { setIsPlayingAudio };
};
