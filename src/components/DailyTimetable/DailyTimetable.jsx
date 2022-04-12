import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import getData from '../../data/getData';
import Container from '../Container/Container';
import DatePicker from '../DatePicker/DatePicker';

import styles from './DailyTimetable.module.scss';
import TimetableList from './components/TimetableList';
import CheckboxGroup from '../UI/CheckboxGroup/CheckboxGroup';

const DailyTimetable = ({ tripsList, selectTrip, deleteTrip }) => {
	const [filteringDate, setFilteringDate] = useState(dayjs());
	const [filteringShip, setFilteringShip] = useState([]);
	const [filteringTripType, setFilteringTripType] = useState([]);
	
	const ships = getData('ships');
	const trips = getData('trips');

	const filteredByDateTrips = useMemo(() => {
		const filtered = tripsList.filter((trip) =>
			trip.departureTime >= filteringDate.startOf('date').valueOf() &&
			trip.departureTime <= filteringDate.endOf('date').valueOf()
				? trip
				: null
		);
		return filtered;
	}, [tripsList, filteringDate]);

	const filteredByPropsTrips = useMemo(() => {
		const filtered = filteredByDateTrips.filter((trip) =>
			filteringShip.includes(trip.shipName) &&
			filteringTripType.includes(trip.tripType)
				? trip
				: null
		);
		return filtered;
	}, [filteredByDateTrips, filteringShip, filteringTripType]);

	return (
		<section>
			<Container>
				<div className={styles.__dailyTimetable}>
					<div className={styles.__dailyTimetable__tripsList}>
						<h2>Расписание на {filteringDate.format('DD MMMM YYYY')}</h2>
						<TimetableList
							trips={filteredByPropsTrips}
							selectTrip={selectTrip}
							deleteTrip={deleteTrip}
						/>
					</div>
					<div className={styles.__dailyTimetable__filter}>
						<DatePicker
							date={filteringDate}
							setDate={setFilteringDate}
							name='DateFilter'
						/>
						<CheckboxGroup
							selectedValues={filteringShip}
							allValues={ships}
							setValues={setFilteringShip}
							name='shipFilter'
						/>
						<CheckboxGroup
							selectedValues={filteringTripType}
							allValues={trips}
							setValues={setFilteringTripType}
							name='tripTypeFilter'
						/>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default DailyTimetable;
