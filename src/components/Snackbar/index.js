import React, { useState, useEffect } from "react";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

export default () => {
	const classes = useStyles();
	const [confirmSubmition, setConfirmSubmition] = useSnackBar();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		console.log("test" + confirmSubmition);
	}, [confirmSubmition]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setConfirmSubmition(false);
	};

	return (
		<div className={classes.root}>
			<Snackbar
				open={confirmSubmition}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					This is a success message!
				</Alert>
			</Snackbar>
		</div>
	);
};

export const useSnackBar = () => {
	const [confirmSubmition, setConfirmSubmition] = useState(false);

	useEffect(() => {
		console.log(confirmSubmition);

		setConfirmSubmition(confirmSubmition);
	}, [confirmSubmition]);
	return [confirmSubmition, setConfirmSubmition];
};

// export const useAudio = () => {
// 	const [isPlayingAudio, setIsPlayingAudio] = useState(false);

// 	useEffect(() => {
// 		const audio = document.getElementById("audio");

// 		isPlayingAudio ? audio.play() : audio.pause();
// 	}, [isPlayingAudio]);

// 	return { isPlayingAudio, setIsPlayingAudio };
// };
