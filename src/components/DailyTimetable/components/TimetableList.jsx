import React from 'react';
import TimetableItem from './TimetableItem';

function TimetableList({ trips, selectTrip, deleteTrip }) {
	return (
		<>
			{trips.length === 0 ? (
				<h4>Нет рейсов</h4>
			) : (
				trips.map((trip) => (
					<TimetableItem
						key={trip.id}
						trip={trip}
						deleteTrip={deleteTrip}
						selectTrip={selectTrip}
					/>
				))
			)}
		</>
	);
}

export default TimetableList;
