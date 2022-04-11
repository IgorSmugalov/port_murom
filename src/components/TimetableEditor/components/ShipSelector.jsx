import React from 'react';

import styles from './ShipSelector.module.scss';

const ShipSelector = ({ value, callback, shipList }) => {
	return (
		<div className={styles.__shipSelector}>
			<h3>{value ? `Выбран теплоход: ${value}` : 'Теплоход не выбран'}</h3>
			{shipList.map((ship) => (
				<div key={ship} className={styles.__shipSelector__selector}>
					<input
						type='radio'
						name='shipName'
						id={ship}
						checked={ship === value}
						value={ship}
						onChange={(event) => {
							callback(event.target.value);
						}}
					/>
					<label htmlFor={ship}>{ship}</label>
				</div>
			))}
		</div>
	);
};

export default ShipSelector;
