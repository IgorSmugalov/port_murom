import React from 'react';

import styles from './TripSelector.module.scss';

const TripSelector = ({ value, callback, typesList }) => {
	return (
		<div className={styles.__tripSelector}>
			<h3>{value ? `Выбрано: ${value}` : 'Тип рейса не выбран'}</h3>
			{typesList.map((trip) => (
				<div key={trip} className={styles.__tripSelector__selector}>
					<input
						type='radio'
						name='tripType'
						id={trip}
						checked={trip === value}
						value={trip}
						onChange={(event) => {
							callback(event.target.value);
						}}
					/>
					<label htmlFor={trip}>{trip}</label>
				</div>
			))}
		</div>
	);
};

export default TripSelector;
