import React from 'react';

import styles from './MinuteSelector.module.scss';

function MinuteSelector({ name, minutes, minute, setMinute }) {
	return (
		<div className={styles.__minutes}>
			{minutes.map((element) => (
				<div key={`${name}-minute-${element}`}>
					<input
						checked={minute.minute() === Number(element)}
						id={`${name}-minute-${element}`}
						value={element}
						name={`setMinuteTo${name}`}
						type='radio'
						onChange={(event) => setMinute(event)}
					/>
					<label htmlFor={`${name}-minute-${element}`}>{element}</label>
				</div>
			))}
		</div>
	);
}

export default MinuteSelector;
