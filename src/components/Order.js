import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Modal from './Modal';

const containerVariants = {
	hidden: {
		x: '100vw',
		opacity: 0,
	},

	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			mass: 0.4,
			damping: 12,
			staggerChildren: 0.4,
			when: 'beforeChildren',
		},
	},

	exit: {
		x: '-100vw',
		transition: { type: 'tween', ease: 'easeInOut' },
	},
};

const childVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const Order = ({ pizza }) => {
	const [shouldShowTitle, setShouldShowTitle] = useState(true);
	const [shouldShowModal, setShouldShowModal] = useState(false);

	// setting a timer that will cause the title to disappear after 4 seconds
	useEffect(() => {
		const timerId = setTimeout(() => setShouldShowTitle(false), 4000);
		return () => clearTimeout(timerId);
	}, []);

	// setting a timer that will cause the modal to appear after 4 seconds
	useEffect(() => {
		const timerId = setTimeout(() => setShouldShowModal(true), 5000);
		return () => clearTimeout(timerId);
	}, []);

	function closeModal() {
		setShouldShowModal(false);
	}
	return (
		<>
			<AnimateSharedLayout>
				<motion.div
					className="container order"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<AnimatePresence>
						{shouldShowTitle && (
							<motion.h2
								key="orderTitle"
								exit={{ y: -100, opacity: 0 }}
								transition={{ type: 'tween', duration: 0.5 }}
							>
								Thank you for your order
							</motion.h2>
						)}
					</AnimatePresence>
					<motion.p layout variants={childVariants}>
						You ordered a {pizza.base} pizza with:
					</motion.p>
					<motion.div layout variants={childVariants}>
						{pizza.toppings.map((topping) => (
							<div key={topping}>{topping}</div>
						))}
					</motion.div>
				</motion.div>
			</AnimateSharedLayout>
			{shouldShowModal && <Modal closeModal={closeModal} />}
		</>
	);
};

export default Order;
