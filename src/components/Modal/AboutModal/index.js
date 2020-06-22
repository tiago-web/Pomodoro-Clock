import React, { useEffect } from "react";
import Modal from "react-modal";

import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

import "./styles.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

const AboutModal = ({ modalsController, setModalsController }) => {
	useEffect(() => {
		window.addEventListener("keydown", ({ key }) => {
			if (key === "ArrowRight") {
				setModalsController({
					isAboutModalOpen: false,
					isIntervalsModalOpen: true,
				});
			}
		});
	}, [setModalsController]);

	return (
		<Modal
			isOpen={modalsController.isAboutModalOpen}
			style={customStyles}
			overlayClassName="about-modal-overlay"
			className="about-modal"
			contentLabel="About the pomodoro technique"
			ariaHideApp={false}
			shouldCloseOnEsc={true}
			shouldCloseOnOverlayClick={false}
			onRequestClose={() =>
				setModalsController(prevState => ({
					...prevState,
					isAboutModalOpen: false,
				}))
			}
		>
			<div className="modal-container">
				<div className="invisible-div"></div>
				<div className="modal-content">
					<div className="modal-close-icon">
						<CloseIcon
							onClick={() =>
								setModalsController(prevState => ({
									...prevState,
									isAboutModalOpen: false,
								}))
							}
						/>
					</div>
					<h2>About the pomodoro technique</h2>
					<div className="modal-text">
						<p>
							The pomodoro technique is a time management method that aims to
							make you more productive. The technique uses a timer to set short
							intervals between your work sections, generally 25 minutes, and 3
							to 5 minutes of break. Each working interval is known as a
							pomodoro, from the Italian word for "tomato." After four pomodoros
							a long break should be taken (15 to 30 minutes) and then, start
							over again. You shall end when the time you set out to spend on
							the task is over.
						</p>
						<p>
							This technique can be used in any task since its goal is to make
							you more productive.
						</p>
						<p className="extra-note">
							<strong>Important! </strong> This app has default values for work
							sections, small breaks, big breaks (25, 5, and 30 minutes
							respectively). On the next page, you can customize each section
							according to your needs.
						</p>
					</div>
				</div>
				<div className="modal-next-page-icon">
					<ArrowForwardIosOutlinedIcon
						onClick={() =>
							setModalsController({
								isAboutModalOpen: false,
								isIntervalsModalOpen: true,
							})
						}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default AboutModal;
