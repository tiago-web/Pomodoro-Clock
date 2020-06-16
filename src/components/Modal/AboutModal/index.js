import React, { useState } from "react";
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

const AboutModal = () => {
	const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);

	return (
		<Modal
			isOpen={aboutModalIsOpen}
			style={customStyles}
			overlayClassName="about-modal-overlay"
			className="about-modal"
			shouldFocusAfterRender={false}
			contentLabel="About the pomodoro technique"
			ariaHideApp={false}
		>
			<div className="modal-container">
				<div className="invisible-div"></div>
				<div className="modal-content">
					<div className="modal-close-icon">
						<CloseIcon onClick={() => setAboutModalIsOpen(false)} />
					</div>
					<h1>About the pomodoro technique</h1>
					<div className="modal-text">
						<p>
							The pomodoro technique is a time management method that aims to
							make you more productive. The technique uses a timer to set short
							intervals between your work sections, generally 25 minutes of work
							and 3 to 5 minutes of break. After four pomodoros (working
							sections) a long break should be taken (15 to 30 minutes) and
							then, start over again. You shall end when the time you set out to
							spend on the task is over.
						</p>
						<p>
							This technique can be used in any task since its goal is to make
							you more productive.
						</p>
					</div>
				</div>
				<div className="modal-next-page-icon">
					<ArrowForwardIosOutlinedIcon
						onClick={() => {
							setAboutModalIsOpen(false);
						}}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default AboutModal;
