import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Snackbar from "../../Snackbar/index";

import "./styles.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

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

const IntervalsModal = ({
	modalsController,
	setModalsController,
	setIntervals,
}) => {
	const [sectionsData, setSectionsData] = useState([
		{
			label: "Work Section",
			name: "workTime",
			value: "",
			error: false,
			errorMessage: "",
		},
		{
			label: "Small break",
			name: "smallBreak",
			value: "",
			error: false,
			errorMessage: "",
		},
		{
			label: "Big break",
			name: "bigBreak",
			value: "",
			error: false,
			errorMessage: "",
		},
	]);

	const [confirmSubmition, setConfirmSubmition] = useState(false);

	useEffect(() => {
		setConfirmSubmition(false);
	}, [modalsController]);

	useEffect(() => {
		window.addEventListener("keydown", ({ key }) => {
			if (key === "ArrowLeft") {
				setModalsController({
					isAboutModalOpen: true,
					isIntervalsModalOpen: false,
				});
			}
		});
	}, [setModalsController]);

	const handleChange = e => {
		const { name, value } = e.target;
		const regex = /^[0-9\b]+$/;

		if (value === "" || regex.test(value)) {
			const changingSectionIndex = sectionsData.findIndex(
				obj => obj.name === name
			);

			setSectionsData(prevState => {
				let newArr = [...prevState];
				newArr[changingSectionIndex] = {
					...prevState[changingSectionIndex],
					value,
					error: false,
					errorMessage: "",
				};

				return newArr;
			});
		}
	};

	const handleFormSubmition = e => {
		e.preventDefault();

		let customTimingInSeconds = {};
		let error = false;

		for (let i = 0; i < sectionsData.length; i++) {
			const { name, value } = sectionsData[i];

			const errorMessage = validateInput(value);

			if (errorMessage !== "") {
				setSectionsData(prevState => {
					let newArr = [...prevState];
					newArr[i] = {
						...prevState[i],
						error: true,
						errorMessage,
					};

					return newArr;
				});

				error = true;
			}

			if (value !== "") customTimingInSeconds[name] = Number(value) * 60;
		}

		if (!error) {
			setConfirmSubmition(true);

			setIntervals(defaultTimes => ({
				...defaultTimes,
				...customTimingInSeconds,
			}));

			setModalsController(prevState => ({
				...prevState,
				isIntervalsModalOpen: false,
			}));
		}
	};

	const validateInput = input => {
		let errorMessage = "";

		if (input === "") {
			return errorMessage;
		}

		if (input >= 1440) {
			errorMessage = "*Each section must have less than 1440 minutes.";
		}

		if (input <= 0) {
			errorMessage = "*Each section must have at least 1 minute.";
		}

		return errorMessage;
	};

	return (
		<>
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
						<h2>Sections interval form</h2>
						<p className="modal-description">
							You can customize the number of minutes you would like to spend on
							each task
						</p>
						<form className="intervals-form" onSubmit={handleFormSubmition}>
							{sectionsData.map((section, index) => (
								<TextField
									key={index}
									className="modal-input"
									label={section.label}
									variant="filled"
									name={section.name}
									value={section.value}
									error={section.error}
									helperText={section.errorMessage}
									onChange={handleChange}
									autoComplete="off"
								/>
							))}
							<Button
								type="submit"
								className="modal-button"
								variant="contained"
								color="primary"
							>
								Confirm
							</Button>
						</form>
					</div>
					<div className="invisible-div"></div>
				</div>
			</Modal>
			<Snackbar confirmSubmition={confirmSubmition} />
		</>
	);
};

export default IntervalsModal;
