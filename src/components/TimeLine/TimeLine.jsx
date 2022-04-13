import dayjs from 'dayjs';
import React from 'react';
import getData from '../../data/getData';
import ShipLines from './components/ShipLines';

import styles from './TimeLinene.module.scss';

function TimeLine({ departure, arrival, trips, shipName, ships, collision }) {
	const timelineStart = departure.startOf('date').valueOf();
	const timelineEnd = arrival.add(1, 'day').startOf('date').valueOf();
	const timelineLength = timelineEnd - timelineStart;
	const hoursValues = getData('hours');
	const hoursValuesShort = getData('hoursShort');

	console.log(dayjs.duration(timelineLength).asDays());

	const tripsByShipArray = (trips) => {
		// собирает стандартный массив прогулок в объект, где ключом является название теплохода, а значением  массив со всеми рейсами данного теплохода или пустой массив в случае их отсутствия
		const result = new Map();
		ships.forEach((ship) => result.set(ship, []));
		trips.forEach((trip) => {
			result.set(trip.shipName, [
				...result.get(trip.shipName),
				{
					departureTime: trip.departureTime,
					arrivalTime: trip.arrivalTime,
					tripType: trip.tripType,
				},
			]);
		});
		return Object.fromEntries(result);
	};

	return (
		<div className={styles.__timeLine}>
			<ShipLines
				timelineStart={timelineStart}
				timelineLength={timelineLength}
				tripsArray={tripsByShipArray(trips)}
				shipName={shipName}
				departure={departure}
				arrival={arrival}
				collision={collision}
			/>
			<div className={styles.__timeLine__timeIndicators}>
				{dayjs.duration(timelineLength).asDays() === 1
					? hoursValues.map((hour, index) => <div key={index}>{hour}</div>)
					: dayjs.duration(timelineLength).asDays() < 3
					? hoursValuesShort.map((hour, index) => (
							<div key={index}>{hour}</div>
					  ))
					: undefined}
			</div>
		</div>
	);
}

export default TimeLine;
