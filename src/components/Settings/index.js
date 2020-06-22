import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VolumeIcon from "./Volume/index";

import "./styles.css";

export default ({ setModalsController }) => {
	return (
		<div id="settings">
			<MoreHorizIcon
				className="moreIcon"
				onClick={() =>
					setModalsController(prevState => ({
						...prevState,
						isIntervalsModalOpen: true,
					}))
				}
			/>
			<VolumeIcon />
		</div>
	);
};
