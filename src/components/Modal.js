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
	visible: { y: -200, opacity: 1, transition: { delay: 0.5 } },
};

function Backdrop({ shouldShowModal }) {
	return (
		<AnimatePresence>
			{shouldShowModal && (
				<motion.div
					className="backdrop"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					key="backdrop"
				/>
			)}
		</AnimatePresence>
	);
}

function Overlay({ shouldShowModal, closeModal }) {
	return (
		<AnimatePresence>
			{shouldShowModal && (
				<motion.div
					className="overlay"
					variants={overlayVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					key="overlay"
				>
					<p>Want to make another pizza?</p>
					<Link to="/base" onClick={closeModal}>
						<button>Create Pizza</button>
					</Link>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function Modal({ shouldShowModal, closeModal }) {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop shouldShowModal={shouldShowModal} />, document.body)}
			{ReactDOM.createPortal(
				<Overlay shouldShowModal={shouldShowModal} closeModal={closeModal} />,
				document.body
			)}
		</>
	);
}

export default Modal;
