import React, { useState } from 'react';
import Container from '../Container/Container';
import TimePicker from '../TimePicker/TimePicker';
import DatePicker from '../DatePicker/DatePicker';
import RadioGroup from '../UI/RadioGroup/RadioGroup';
import Button from '../UI/Button/Button';
import getData from '../../data/getData.js';
import dayjs from 'dayjs';
import DurationSelector from './components/DurationSelector';

import styles from './TimetableEditor.module.scss';

const TimetableEditor = ({ addTrip }) => {
	const [departureTime, setDepartureTime] = useState(setInitialRoundedTime());
	const [durationTime, setDurationTime] = useState(dayjs.duration(1, 'hours'));
	const [arrivalTime, setArrivalTime] = useState(
		departureTime.add(durationTime)
	);
	const [shipName, setShipName] = useState(undefined);
	const [tripType, setTripType] = useState(undefined);

	const shipsList = getData('ships');
	const typesList = getData('trips');

	function setInitialRoundedTime(date, round = 10) { // Округляет время с шагом 10 минут, принимает аргументом Dayjs-объект или UNIX-time, возвращает Dayjs-объект с округленным временем, при вызове без аргумента возвращает текущее округленное время 
		if (date === undefined) {
			return dayjs()
				.startOf('minute')
				.minute(Math.round(dayjs().minute() / round) * round);
		}
		if (
			(typeof date === 'number' && dayjs(date).isValid()) ||
			(dayjs.isDayjs(date) && dayjs(date).isValid())
		) {
			const roundedMinuts = Math.round(dayjs(date).minute() / round) * round;
			return dayjs(date).startOf('minute').minute(roundedMinuts);
		} else {
			console.error('Invalid argument "date"');
			return null;
		}
	}

	const setDepartureAndArrival = (newDeparture) => {
		setDepartureTime(newDeparture);
		setArrivalTime(newDeparture.add(durationTime));
	};

	const setArrivalAndDuration = (newArrival) => {
		if (newArrival.diff(departureTime, 'minute') >= 30) {
			setArrivalTime(newArrival);
			setDurationTime(dayjs.duration(newArrival.diff(departureTime)));
		} else {
			console.error('Прогулка не может быть короче 30 минут');
		}
	};

	const setDurationAndArrival = (newDuratoin) => {
		setDurationTime(newDuratoin);
		setArrivalTime(departureTime.add(newDuratoin));
	};

	function setNewTrip(shipName, tripType, departureTime, arrivalTime) {
		// Времменная проверка заполненности всех полей
		if (!!shipName && !!tripType && departureTime && arrivalTime) {
			departureTime = dayjs(departureTime).valueOf();
			arrivalTime = dayjs(arrivalTime).valueOf();
			addTrip({
				shipName,
				tripType,
				departureTime,
				arrivalTime,
			});
			resetNewTrip();
		} else {
			console.error('не все поля заполнены');
		}
	}

	function resetNewTrip() {
		const defaultTime = setInitialRoundedTime();
		const defaultDuration = dayjs.duration(1, 'hours');
		setDepartureTime(defaultTime);
		setDurationTime(dayjs.duration(1, 'hours'));
		setArrivalTime(defaultTime.add(defaultDuration));
		setShipName(undefined);
		setTripType(undefined);
	}

	return (
		<Container>
			<div className={styles.__editor}>
				<h2>Добавить рейс</h2>
				<div className={styles.__datePicker}>
					<DatePicker
						date={departureTime}
						setDate={setDepartureAndArrival}
						name='newTripDate'
					/>
				</div>
				<div className={styles.__timePicker}>
					<h3>Отправление: {departureTime.format('DD MMMM HH:mm')}</h3>
					<TimePicker
						name='departureTime'
						time={departureTime}
						callback={setDepartureAndArrival}
					/>
					<h3>Длительность:</h3>
					<DurationSelector
						departure={departureTime}
						arrival={arrivalTime}
						duration={durationTime}
						callback={setDurationAndArrival}
					/>
					<h3>Прибытие: {arrivalTime.format('DD MMMM HH:mm')}</h3>
					<TimePicker
						name='arrivalTime'
						time={arrivalTime}
						callback={setArrivalAndDuration}
					/>
				</div>
				<div className={styles.__shipSelector}>
					<RadioGroup
						name='shipSelector'
						selectedValue={shipName}
						allValues={shipsList}
						setValue={setShipName}
					/>
				</div>
				<div className={styles.__tripSelector}>
					<RadioGroup
						name='tripSelector'
						selectedValue={tripType}
						allValues={typesList}
						setValue={setTripType}
					/>
				</div>
				<div className={styles.__editorButtons}>
					<Button onClick={() => resetNewTrip()}>Сброс</Button>
					<Button
						onClick={() =>
							setNewTrip(shipName, tripType, departureTime, arrivalTime)
						}>
						Добавить рейс
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default TimetableEditor;
