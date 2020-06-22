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
	const [volume, setVolume] = useState(0.5);

	useEffect(() => {
		const audio = document.getElementById("audio");
		audio.load();

		isPlayingAudio ? audio.play() : audio.pause();
	}, [isPlayingAudio]);

	useEffect(() => {
		const audio = document.getElementById("audio");

		audio.volume = volume;
	}, [volume]);

	return { setIsPlayingAudio, setVolume };
};
