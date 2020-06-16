import React from "react";
import Modal from "react-modal";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

import "./styles.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		width: "100%",
		transform: "translate(-50%, -50%)",
	},
};

const IntervalsModal = props => {
	const { modalsController, setModalsController } = props;

	const handleFormSubmition = e => {
		e.preventDefault();
	};

	return (
		<Modal
			isOpen={modalsController.isIntervalsModalOpen}
			style={customStyles}
			overlayClassName="interval-modal-overlay"
			className="interval-modal"
			shouldFocusAfterRender={false}
			contentLabel="Intervals form"
			ariaHideApp={false}
		>
			<div className="modal-container">
				<div className="modal-previous-page-icon">
					<ArrowBackIosOutlinedIcon
						onClick={() =>
							setModalsController({
								isAboutModalOpen: true,
								isIntervalsModalOpen: false,
							})
						}
					/>
				</div>

				<div className="modal-content">
					<div className="modal-close-icon">
						<CloseIcon
							onClick={() =>
								setModalsController(prevState => ({
									...prevState,
									isIntervalsModalOpen: false,
								}))
							}
						/>
					</div>
					<h1>Sections form</h1>
					<p>Please, input how many minutes you would like for each section</p>
					<form className="intervals-form" onSubmit={handleFormSubmition}>
						<TextField
							className="modal-input"
							label="Work Section"
							variant="filled"
						/>
						<TextField
							className="modal-input"
							label="Small break"
							variant="filled"
						/>
						<TextField
							className="modal-input"
							label="Big break"
							variant="filled"
						/>
						<Button
							className="modal-button"
							variant="contained"
							color="secondary"
						>
							Confirm
						</Button>
					</form>
				</div>
				<div className="invisible-div"></div>
			</div>
		</Modal>
	);
};

export default IntervalsModal;
