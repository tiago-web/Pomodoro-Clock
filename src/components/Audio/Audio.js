import React, { useState, useEffect } from "react";

export default () => {
	return (
		<audio id="audio" loop>
			<source src="./sounds/alarm-clock-effect.mp3"></source>
		</audio>
	);
};

export const useAudio = () => {
	const [isPlayingAudio, setIsPlayingAudio] = useState(false);

	useEffect(() => {
		const audio = document.getElementById("audio");

		isPlayingAudio ? audio.play() : audio.pause();
	}, [isPlayingAudio]);

	return { isPlayingAudio, setIsPlayingAudio };
};
