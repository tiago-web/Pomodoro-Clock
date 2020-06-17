import React, { useState } from "react";
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
	const { modalsController, setModalsController, setIntervals } = props;
	const [customTiming, setCustomTiming] = useState({
		workTime: "",
		smallBreak: "",
		bigBreak: "",
	});

	const [sectionsData, setSectionsData] = useState([
		{ label: "Work Section", name: "workTime", value: "", error: false },
		{ label: "Small break", name: "smallBreak", value: "", error: false },
		{ label: "Big break", name: "bigBreak", value: "", error: false },
	]);

	const handleChange = e => {
		const { name, value } = e.target;
		const regex = /^[0-9\b]+$/;
		if (value === "" || regex.test(value)) {
			setCustomTiming(prevValue => {
				return {
					...prevValue,
					[name]: value,
				};
			});
		}
	};

	const handleFormSubmition = e => {
		e.preventDefault();

		let customTimingSeconds = {};

		for (const prop in customTiming) {
			const currentInputValue = Number(customTiming[prop]);

			if (!validateInput(currentInputValue)) {
				break;
			}

			customTimingSeconds[prop] = currentInputValue * 60;
		}

		setIntervals(customTimingSeconds);

		setModalsController(prevState => ({
			...prevState,
			isIntervalsModalOpen: false,
		}));
	};

	const validateInput = input => {
		const message = `${input} is not a valid number.`;

		if (!Number(input) || input === "" || input >= 1440) {
			throw new Error(message);
		}
		return true;
	};

	return (
		<Modal
			isOpen={modalsController.isIntervalsModalOpen}
			style={customStyles}
			overlayClassName="interval-modal-overlay"
			className="interval-modal"
			contentLabel="Intervals form"
			ariaHideApp={false}
			shouldCloseOnEsc={true}
			shouldCloseOnOverlayClick={false}
			onRequestClose={() =>
				setModalsController(prevState => ({
					...prevState,
					isIntervalsModalOpen: false,
				}))
			}
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
							name="workTime"
							value={customTiming.workTime}
							onChange={handleChange}
						/>
						<TextField
							className="modal-input"
							label="Small break"
							variant="filled"
							name="smallBreak"
							value={customTiming.smallBreak}
							onChange={handleChange}
						/>
						<TextField
							className="modal-input"
							label="Big break"
							variant="filled"
							name="bigBreak"
							value={customTiming.bigBreak}
							onChange={handleChange}
						/>
						<Button
							type="submit"
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
