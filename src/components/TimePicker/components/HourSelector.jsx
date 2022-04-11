import React from 'react';

import styles from './HourSelector.module.scss';

function HourSelector({ name, hours, time, setHour }) {
	return (
		<div className={styles.__hours}>
			{hours.map((element) => (
				<div key={`${name}-hour-${element}`}>
					<input
						type='radio'
						name={`setHourTo${name}`}
						id={`${name}-hour-${element}`}
						checked={time.hour() === Number(element)}
						value={element}
						onChange={(event) => setHour(event)}
					/>
					<label htmlFor={`${name}-hour-${element}`}>{element}</label>
				</div>
			))}
		</div>
	);
}

export default HourSelector;
