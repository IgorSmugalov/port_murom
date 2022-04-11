import React from 'react';
import { useState, useEffect } from 'react';
import styles from './App.module.scss';

import Timetable from './components/Timetable/Timetable';
import TimetableEditor from './components/TimetableEditor/TimetableEditor';
import TripInfo from './components/TripInfo/TripInfo';

function App() {
	const [tripsList, setTripsList] = useState(() => getTrips('trips'));
	const [tripInfo, setTripInfo] = useState();

	function getTrips(key) {
		if (localStorage.getItem(key)) {
			return [...JSON.parse(localStorage.getItem(key))];
		} else {
			return [];
		}
	}
	useEffect(
		() => localStorage.setItem('trips', JSON.stringify(tripsList)),
		[tripsList]
	);

	function addTrip(newTrip) {
		function generateId(tripsList) {
			let maxId = 0;
			for (const trip of tripsList) {
				if (maxId <= trip.id) maxId = trip.id;
			}
			return maxId + 1;
		}
		const newTripsList = [
			...tripsList,
			{ ...newTrip, id: generateId(tripsList) },
		];
		newTripsList.sort((a, b) => {
			return a.departureTime < b.departureTime
				? -1
				: a.departureTime > b.departureTime
				? 1
				: 0;
		});
		setTripsList(newTripsList);
	}

	return (
		<div className={styles.__app}>
			<Timetable
				tripsList={tripsList}
				setTripsList={setTripsList}
				setTripInfo={setTripInfo}
			/>
			{tripInfo && <TripInfo trip={tripInfo} close={setTripInfo} />}
			<TimetableEditor addTrip={addTrip} />
		</div>
	);
}

export default App;
