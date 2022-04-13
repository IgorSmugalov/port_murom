import React from 'react';
import { useState, useEffect } from 'react';
import DailyTimetable from './components/DailyTimetable/DailyTimetable';
import TimetableEditor from './components/TimetableEditor/TimetableEditor';
import TripInfo from './components/TripInfo/TripInfo';

import styles from './App.module.scss';


function App() {
	const [tripsList, setTripsList] = useState(() => getTrips('trips'));
	const [selectedTrip, setSelectedTrip] = useState();

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
	const deleteTrip = (id) => {
		setTripsList(tripsList.filter((trip) => trip.id !== id));
	};
	const selectTrip = (id) => {
		setSelectedTrip(tripsList.find((trip) => trip.id === id));
	};

	return (
		<div className={styles.__app}>
			<DailyTimetable
				tripsList={tripsList}
				selectTrip={selectTrip}
				deleteTrip={deleteTrip}
			/>
			{selectedTrip && (
				<TripInfo trip={selectedTrip} close={setSelectedTrip} />
			)}
			<TimetableEditor trips={tripsList} addTrip={addTrip} />
		</div>
	);
}

export default App;
