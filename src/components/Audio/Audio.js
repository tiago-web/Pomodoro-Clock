import React, { useState, useEffect } from "react";

export default Audio = () => {
	return (
		<audio id="audio">
			<source src="./sounds/alarm-clock-effect.mp3"></source>
		</audio>
	);
};

export const useAudio = () => {
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const audio = document.getElementById("audio");

		playing ? audio.play() : audio.pause();
	}, [playing]);

	return { setPlaying };
};
