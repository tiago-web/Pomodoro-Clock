import React, { useState, useEffect } from "react";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import "./styles.css";

function Alert(props) {
	return (
		<MuiAlert elevation={6} severity="success" variant="filled" {...props} />
	);
}

export default ({ confirmSubmition }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(true);
	}, [confirmSubmition]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			autoHideDuration={3000}
			onClose={handleClose}
		>
			<Alert onClose={handleClose}>
				Intervals were successfully customized!
			</Alert>
		</Snackbar>
	);
};
