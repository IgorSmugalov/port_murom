import dayjs from 'dayjs';
import React from 'react';
import Button from '../UI/Button/Button';

import styles from './DurationSelector.module.scss';

function DurationSelector({ duration, name, callback }) {
	const setValue = (event) => {
		switch (event.target.name) {
			case `increaseDurationMinutesTo${name}`:
				return callback(duration.add(10, 'minute'));
			case `increaseDurationHoursTo${name}`:
				return callback(duration.add(1, 'hour'));
			case `decreaseDurationMinutesTo${name}`:
				if (duration.asMinutes() > 30) {
					return callback(duration.subtract(10, 'minute'));
				} else {
					console.error('Прогулка не может быть короче 30 минут');
					break
				}
			case `decreaseDurationHoursTo${name}`:
				if (duration.asMinutes() > 90) {
					return callback(duration.subtract(1, 'hour'));
				} else {
					console.error('Прогулка не может быть короче 30 минут');
					return callback(dayjs.duration(30, 'minutes'));
				}
			default:
				return console.error('changeLength Error');
		}
	};
	return (
		<div className={styles.__durationSelector}>
			<Button
				name={`decreaseDurationHoursTo${name}`}
				onClick={(event) => {
					setValue(event);
				}}>
				{'<<<'} 1 час
			</Button>
			<Button
				name={`decreaseDurationMinutesTo${name}`}
				onClick={(event) => {
					setValue(event);
				}}>
				{'<<<'} 10 минут
			</Button>
			<div className={styles.__durationSelector__value}>
				{duration.format('DD HH:mm')}
			</div>
			<Button
				name={`increaseDurationMinutesTo${name}`}
				onClick={(event) => {
					setValue(event);
				}}>
				10 минут{'>>>'}
			</Button>
			<Button
				name={`increaseDurationHoursTo${name}`}
				onClick={(event) => {
					setValue(event);
				}}>
				1 час{'>>>'}
			</Button>
		</div>
	);
}

export default DurationSelector;
