import React from 'react';

import styles from './TimePicker.module.scss';
import HourSelector from './components/HourSelector';
import MinuteSelector from './components/MinuteSelector';

const TimePicker = ({ time, callback, name }) => {
	const [workTimeStart, workTimeEnd, timeStep] =  [0, 23, 10]; // for future functionality
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
				return callback
					? callback(time.hour(value))
					: console.error('no callback func for TimeSelector');
			case `setMinuteTo${name}`:
				return callback
					? callback(time.minute(value))
					: console.error('no callback func for TimeSelector');
			default:
				console.error('TimeSelector: Incorrect input');
				break;
		}
	};

	return (
		<div className={styles.__timeSelector}>
			<HourSelector
				name={name}
				hours={hoursArray}
				time={time}
				setHour={setTime}
			/>
			<MinuteSelector
				name={name}
				minutes={minutesArray}
				minute={time}
				setMinute={setTime}
			/>
		</div>
	);
};

export default TimePicker;
