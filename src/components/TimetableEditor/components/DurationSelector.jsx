import React from 'react';
import Button from '../../UI/Button/Button';

import styles from './DurationSelector.module.scss';

function DurationSelector({ duration, callback }) {
	const setValue = (event) => {
		switch (event.target.name) {
			case 'increaseDuration':
				return callback(duration.add(10, 'minute'));
			case 'decreaseDuration':
				if (duration.asMinutes() > 30) {
					return callback(duration.subtract(10, 'minute'));
				} else {
					console.error('Прогулка не может быть короче 30 минут');
				}
				break;
			default:
				return console.error('changeLength Error');
		}
	};
	return (
		<div className={styles.__durationSelector}>
			<Button
				name='decreaseDuration'
				onClick={(event) => {
					setValue(event);
				}}>
				- - -
			</Button>
			<div className={styles.__durationSelector__value}>
				{duration.format('HH:mm ')}
			</div>
			<Button
				name='increaseDuration'
				onClick={(event) => {
					setValue(event);
				}}>
				+ + +
			</Button>
		</div>
	);
}

export default DurationSelector;
