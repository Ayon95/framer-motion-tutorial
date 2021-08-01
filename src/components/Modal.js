import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const overlayVariants = {
	hidden: { y: '-100vh', opacity: 0 },
	visible: { y: 0, opacity: 1, transition: { delay: 0.5 } },
};

function Backdrop({ closeModal }) {
	return (
		<AnimatePresence onExitComplete={closeModal}>
			<motion.div
				className="backdrop"
				onClick={closeModal}
				variants={backdropVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			/>
		</AnimatePresence>
	);
}

function Overlay({ closeModal }) {
	return (
		<AnimatePresence onExitComplete={closeModal}>
			<motion.div
				className="overlay"
				variants={overlayVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<p>Want to make another pizza?</p>
				<Link to="/base">
					<button>Create Pizza</button>
				</Link>
			</motion.div>
		</AnimatePresence>
	);
}

function Modal({ closeModal }) {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop closeModal={closeModal} />, document.body)}
			{ReactDOM.createPortal(<Overlay closeModal={closeModal} />, document.body)}
		</>
	);
}

export default Modal;
