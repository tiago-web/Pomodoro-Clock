import React, { useEffect, useContext } from "react";

import { IntervalContext } from "../../context/IntervalContext";

export default () => {
	const [state] = useContext(IntervalContext);

	useEffect(() => {
		const audio = document.getElementById("audio");

		state.isPlayingAudio && state.volume !== 0 ? audio.play() : audio.pause();
	}, [state.isPlayingAudio, state.volume]);

	useEffect(() => {
		const audio = document.getElementById("audio");

		audio.volume = state.volume;
	}, [state.volume]);

	return (
		<audio id="audio" loop>
			<source src="./sounds/alarm-clock.mp3"></source>
		</audio>
	);
};
