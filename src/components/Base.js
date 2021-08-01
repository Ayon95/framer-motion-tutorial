import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
	hidden: {
		x: '100vw',
		opacity: 0,
	},

	visible: {
		x: 0,
		opacity: 1,
		transition: { type: 'spring', delay: 0.5 },
	},

	exit: {
		x: '-100vw',
		transition: { type: 'tween', ease: 'easeInOut' },
	},
};

const nextVariants = {
	hidden: {
		x: '-100vw',
		opacity: 0,
	},

	visible: {
		x: 0,
		opacity: 1,
		transition: { type: 'spring', stiffness: 120 },
	},
};

const buttonVariants = {
	hover: {
		scale: 1.03,
		textShadow: '0 0 8px rgb(255, 255, 255)',
		boxShadow: '0 0 8px rgb(255, 255, 255)',
		transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.4 },
	},
};

const Base = ({ addBase, pizza }) => {
	const bases = ['Classic', 'Thin & Crispy', 'Thick Crust'];

	return (
		<motion.div
			className="base container"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<h3>Step 1: Choose Your Base</h3>
			<ul>
				{bases.map((base) => {
					let spanClass = pizza.base === base ? 'active' : '';
					return (
						<motion.li
							key={base}
							onClick={() => addBase(base)}
							whileHover={{ scale: 1.3, color: '#f8e112', originX: 0 }}
						>
							<span className={spanClass}>{base}</span>
						</motion.li>
					);
				})}
			</ul>

			{pizza.base && (
				<motion.div className="next" variants={nextVariants}>
					<Link to="/toppings">
						<motion.button variants={buttonVariants} whileHover="hover">
							Next
						</motion.button>
					</Link>
				</motion.div>
			)}
		</motion.div>
	);
};

export default Base;
