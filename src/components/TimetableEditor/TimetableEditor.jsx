import React, { useEffect, useMemo, useState } from 'react';
import Container from '../Container/Container';
import RadioGroup from '../UI/RadioGroup/RadioGroup';
import Button from '../UI/Button/Button';
import getData from '../../data/getData.js';
import TimeLine from '../TimeLine/TimeLine';
import TimePropsEditor from './components/TimePropsEditor';
import dayjs from 'dayjs';

import styles from './TimetableEditor.module.scss';

const TimetableEditor = ({ trips: allTrips, addTrip }) => {
	const [startTime, defaultDuration] = [
		setInitialRoundedTime(dayjs().startOf('date').add(12, 'hours')),
		dayjs.duration(1, 'hours'),
	];
	const shipsList = getData('ships');
	const typesList = getData('trips');

	const [departureTime, setDepartureTime] = useState(startTime);
	const [durationTime, setDurationTime] = useState(defaultDuration);
	const [arrivalTime, setArrivalTime] = useState(
		departureTime.add(durationTime)
	);
	const [shipName, setShipName] = useState(undefined);
	const [tripType, setTripType] = useState(undefined);
	const [timeCollision, setTimeCollision] = useState(false);

	const [startDate, endDate] = [
		departureTime.startOf('date').valueOf(),
		arrivalTime.endOf('date').valueOf(),
	];

	const nearestTrips = useMemo(() => {
		// для оптимизации: фильтрует массив всех рейсов и возвращает массив тех рейсов, которые полностью или частично паподают на диапазон дат, выбранных для создания нового рейса
		const filteredTrips = allTrips.filter((trip) =>
			(trip.arrivalTime >= startDate && trip.arrivalTime <= endDate) ||
			(trip.departureTime >= startDate && trip.departureTime <= endDate) ||
			(trip.departureTime < startDate && trip.arrivalTime > endDate)
				? trip
				: null
		);
		return filteredTrips;
	}, [allTrips, startDate, endDate]);

	function setInitialRoundedTime(date, round = 10) {
		// Округляет время с шагом 10 минут для удобного отображения в селекторах, принимает аргументом Dayjs-объект или UNIX-time, возвращает Dayjs-объект с округленным временем, при вызове без аргумента возвращает текущее округленное время
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
			console.error('Invalid date');
			return null;
		}
	}

	function checkTimeCollision(
		tripsArray,
		selectedShip,
		departureTime,
		arrivalTime
	) {
		tripsArray.some(
			(trip) =>
				(departureTime.valueOf() >= trip.departureTime &&
					departureTime.valueOf() < trip.arrivalTime &&
					selectedShip === trip.shipName) ||
				(arrivalTime.valueOf() > trip.departureTime &&
					arrivalTime.valueOf() <= trip.arrivalTime &&
					selectedShip === trip.shipName)
		)
			? setTimeCollision(true)
			: setTimeCollision(false);
	}

	useEffect(() => {
		checkTimeCollision(nearestTrips, shipName, departureTime, arrivalTime);
	}, [nearestTrips, shipName, departureTime, arrivalTime]);

	function setNewTrip(
		shipName,
		tripType,
		departureTime,
		arrivalTime,
		timeCollision,
		startTime,
		defaultDuration
	) {
		// Времменная проверка заполненности всех полей и пересечения рейсов
		if (
			!!shipName &&
			!!tripType &&
			!!departureTime &&
			!!arrivalTime &&
			timeCollision === false
		) {
			addTrip({
				shipName: shipName,
				tripType: tripType,
				departureTime: dayjs(departureTime).valueOf(),
				arrivalTime: dayjs(arrivalTime).valueOf(),
			});
			resetNewTrip(startTime, defaultDuration);
		} else {
			console.error('не все поля заполнены');
		}
	}

	function resetNewTrip(startTime, defaultDuration) {
		setDepartureTime(startTime);
		setDurationTime(defaultDuration);
		setArrivalTime(startTime.add(defaultDuration));
		setShipName(undefined);
		setTripType(undefined);
	}

	return (
		<Container>
			<div className={styles.__editor}>
				<h2>Добавить рейс</h2>
				<h3>{`с ${departureTime.format(
					'DD MMMM HH:mm'
				)} до ${arrivalTime.format(
					'DD MMMM HH:mm'
				)}, длительность: ${durationTime.format(
					durationTime.asDays() < 1 ? 'HH:mm' : 'D HH:mm'
				)}`}</h3>
				<TimePropsEditor
					departureTime={departureTime}
					arrivalTime={arrivalTime}
					durationTime={durationTime}
					setDepartureTime={setDepartureTime}
					setArrivalTime={setArrivalTime}
					setDurationTime={setDurationTime}
				/>
				<TimeLine
					ships={shipsList}
					shipName={shipName}
					trips={nearestTrips}
					departure={departureTime}
					arrival={arrivalTime}
					collision={timeCollision}
				/>
				<RadioGroup
					name='shipSelector'
					selectedValue={shipName}
					allValues={shipsList}
					setValue={setShipName}
				/>
				<RadioGroup
					name='tripSelector'
					selectedValue={tripType}
					allValues={typesList}
					setValue={setTripType}
				/>
				<div className={styles.__editor__editorButtons}>
					<Button onClick={() => resetNewTrip(startTime, defaultDuration)}>
						Сброс
					</Button>
					<Button
						onClick={() =>
							setNewTrip(
								shipName,
								tripType,
								departureTime,
								arrivalTime,
								timeCollision,
								startTime,
								defaultDuration
							)
						}>
						Добавить рейс
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default TimetableEditor;
