import React, { useState, useEffect } from "react";
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

	const [sectionsData, setSectionsData] = useState([
		{ label: "Work Section", name: "workTime", value: "", error: false },
		{ label: "Small break", name: "smallBreak", value: "", error: false },
		{ label: "Big break", name: "bigBreak", value: "", error: false },
	]);

	useEffect(() => {
		window.addEventListener("keydown", ({ key }) => {
			if (key === "ArrowLeft") {
				setModalsController({
					isAboutModalOpen: true,
					isIntervalsModalOpen: false,
				});
			}
		});
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		const regex = /^[0-9\b]+$/;

		if (value === "" || regex.test(value)) {
			const objectIndex = sectionsData.findIndex(obj => obj.name === name);

			setSectionsData(prevState => {
				let newArr = [...prevState];
				newArr[objectIndex] = {
					...prevState[objectIndex],
					value,
				};

				return newArr;
			});
		}
	};

	const handleFormSubmition = e => {
		e.preventDefault();

		let customTimingSeconds = {};

		sectionsData.forEach(({ name, value }, index) => {
			const currentSectionValue = Number(value);

			if (validateInput(currentSectionValue) !== "") {
				console.log(validateInput(currentSectionValue));
			}

			customTimingSeconds[name] = currentSectionValue * 60;
		});

		console.log(customTimingSeconds);

		// setIntervals(customTimingSeconds);

		// setModalsController(prevState => ({
		// 	...prevState,
		// 	isIntervalsModalOpen: false,
		// }));
	};

	const validateInput = input => {
		let message = "";

		if (!Number(input)) {
			message = "*This field is required";
		} else if (input >= 1440) {
			message = `*Please input less than 1440 minutes.`;
		}
		return message;
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
						{sectionsData.map((section, index) => (
							<TextField
								key={index}
								className="modal-input"
								label={section.label}
								variant="filled"
								name={section.name}
								value={section.value}
								error={section.error}
								onChange={handleChange}
								autoComplete="off"
							/>
						))}
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
