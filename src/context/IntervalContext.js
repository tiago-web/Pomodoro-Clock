import React, { createContext, useState } from "react";

export const IntervalContext = createContext([{}, () => {}]);

export const IntervalProvider = props => {
	const [state, setState] = useState({ isPlayingAudio: false, volume: 0.5 });

	return (
		<IntervalContext.Provider value={[state, setState]}>
			{props.children}
		</IntervalContext.Provider>
	);
};
