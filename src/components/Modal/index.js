import React, { useState } from "react";
import Modal from "react-modal";

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
	const [modalIsOpen, setIsOpen] = useState(true);

	return (
		<Modal
			isOpen={modalIsOpen}
			style={customStyles}
			overlayClassName="about-modal-overlay"
			className="about-modal"
			shouldFocusAfterRender={false}
			contentLabel="Cadastro concluído!"
			ariaHideApp={false}
		>
			<h1>About the pomodoro technique</h1>
			<div className="modal-text">
				<p>
					The technique has as an objective to make you more productive. This
					technique uses a timer to set short intervals between your work
					sections, generally 25 minutes of work and 3 to 5 minutes of interval.
					After four pomodoros (working sections) a long break should be taken
					(15 to 30 minutes) and then, start over again. You shall end when the
					time you propose to spend on the task is over.
				</p>
				<p>
					This technique can be used in any task since its goal is to make you
					more productive.
				</p>
			</div>
		</Modal>
	);
};

export default AboutModal;
