import React from 'react';

import styles from './TimePicker.module.scss';
import HourSelector from './components/HourSelector';
import MinuteSelector from './components/MinuteSelector';
import Button from '../UI/Button/Button';

const TimePicker = ({ time, name, callback }) => {
	const [workTimeStart, workTimeEnd, timeStep] = [0, 23, 10]; // for future functionality
	const [hoursArray, minutesArray] = calculateTimesArrays(
		workTimeStart,
		workTimeEnd,
		timeStep
	);

	function calculateTimesArrays() {
		function timeFormatter(time) {
			return time.toString().length < 2 ? `0${time}` : `${time}`;
		}
		const hoursArray = [];
		for (let hour = workTimeStart; hour <= workTimeEnd; hour++) {
			hoursArray.push(timeFormatter(hour));
		}
		const minutesArray = [];
		for (let minute = 0; minute < 60; minute += timeStep) {
			minutesArray.push(timeFormatter(minute));
		}
		return [hoursArray, minutesArray];
	}

	const setTime = (event) => {
		const key = event.target.name;
		const value = Number(event.target.value);
		switch (key) {
			case `setHourTo${name}`:
				return callback(time.hour(value));
			case `setMinuteTo${name}`:
				return callback(time.minute(value));
			case `decreaseHoursTo${name}`:
				return callback(time.subtract(1, 'hours'));
			case `increaseHoursTo${name}`:
				return callback(time.add(1, 'hours'));
			case `decreaseMinutesTo${name}`:
				return callback(time.subtract(10, 'minutes'));
			case `increaseMinutesTo${name}`:
				return callback(time.add(10, 'minutes'));
			default:
				console.error('TimeSelector: Incorrect input');
				break;
		}
	};

	return (
		<div className={styles.__timeSelector}>
			<div className={styles.__timeSelector__hoursDecreaser}>
				<Button
					name={`decreaseHoursTo${name}`}
					size='fill'
					onClick={(event) => setTime(event)}>
					{'<<<<'} 1 час
				</Button>
			</div>
			<div className={styles.__timeSelector__minutesDecreaser}>
				<Button
					name={`decreaseMinutesTo${name}`}
					size='fill'
					onClick={(event) => setTime(event)}>
					{'<<<<'} 10 минут
				</Button>
			</div>
			<div className={styles.__timeSelector__hoursSelector}>
				<HourSelector
					name={name}
					hours={hoursArray}
					time={time}
					setHour={setTime}
				/>
			</div>
			<div className={styles.__timeSelector__minutesSelector}>
				<MinuteSelector
					name={name}
					minutes={minutesArray}
					minute={time}
					setMinute={setTime}
				/>
			</div>
			<div className={styles.__timeSelector__hoursIncreaser}>
				<Button
					name={`increaseHoursTo${name}`}
					size='fill'
					onClick={(event) => setTime(event)}>
					1 час {'>>>>'}
				</Button>
			</div>
			<div className={styles.__timeSelector__minutesIncreaser}>
				<Button
					name={`increaseMinutesTo${name}`}
					size='fill'
					onClick={(event) => setTime(event)}>
					10 минут {'>>>>'}
				</Button>
			</div>
		</div>
	);
};

export default TimePicker;
