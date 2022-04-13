import dayjs from 'dayjs';
import React from 'react';
import DatePicker from '../../DatePicker/DatePicker';
import TimePicker from '../../TimePicker/TimePicker';
import DurationSelector from '../../DurationSelector/DurationSelector';

import styles from './TimePropsEditor.module.scss';

function TimePropsEditor({
	departureTime,
	arrivalTime,
	durationTime,
	setDepartureTime,
	setArrivalTime,
	setDurationTime,
}) {
	const setDepartureAndArrival = (newDeparture) => {
		setDepartureTime(newDeparture);
		setArrivalTime(newDeparture.add(durationTime));
	};
	const setArrivalAndDuration = (newArrival) => {
		if (newArrival.diff(departureTime, 'minute') >= 30) {
			setArrivalTime(newArrival);
			setDurationTime(dayjs.duration(newArrival.diff(departureTime)));
		} else {
			console.error(
				'Прогулка не может быть короче 30 минут или заканчиваться раньше отправления'
			);
		}
	};
	const setDurationAndArrival = (newDuratoin) => {
		setDurationTime(newDuratoin);
		setArrivalTime(departureTime.add(newDuratoin));
	};
	return (
		<div className={styles.__timeProps}>
			<div className={styles.__timeProps__datepicker}>
				<DatePicker
					date={departureTime}
					setDate={setDepartureAndArrival}
					name='newTripDate'
				/>
			</div>
			<div className={styles.__timeProps__timepickers}>
				<TimePicker
					name='departureTime'
					time={departureTime}
					callback={setDepartureAndArrival}
				/>
				<DurationSelector
					departure={departureTime}
					arrival={arrivalTime}
					duration={durationTime}
					callback={setDurationAndArrival}
				/>
				<TimePicker
					name='arrivalTime'
					time={arrivalTime}
					callback={setArrivalAndDuration}
				/>
			</div>
		</div>
	);
}

export default TimePropsEditor;
