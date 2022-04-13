import React from 'react';

import styles from './ShipLines.module.scss';

function ShipLines({
	timelineStart,
	timelineLength,
	tripsArray,
	shipName,
	departure,
	arrival,
	collision,
}) {
	function calculateEditableTripBox(departure, arrival, collision) {
		const indicatorStart = departure.valueOf() - timelineStart;
		const indicatorEnd = arrival.valueOf() - timelineStart;
		return {
			left: `${(indicatorStart / timelineLength) * 100}%`,
			width: `${((indicatorEnd - indicatorStart) / timelineLength) * 100}%`,
			backgroundColor: collision ? '#ff060690' : '#00268d90',
		};
	}
	function calculateExistingTripBox(trip) {
		const indicatorStart = trip.departureTime - timelineStart;
		const indicatorEnd = trip.arrivalTime - timelineStart;
		return {
			left: `${(indicatorStart / timelineLength) * 100}%`,
			width: `${((indicatorEnd - indicatorStart) / timelineLength) * 100}%`,
		};
	}
	return (
		<>
			{Object.keys(tripsArray).map((ship) => (
				<div key={ship} className={styles.__shipLine}>
					<div className={styles.__shipLine__shipName}>{ship}</div>
					<div
						className={styles.__shipLine__editableTripBox}
						style={{
							display:
								ship === shipName
									? 'block'
									: shipName === undefined
									? 'block'
									: 'none',
							...calculateEditableTripBox(departure, arrival, collision),
						}}></div>
					{tripsArray[ship].map((trip) => (
						<div
							className={styles.__shipLine__existingTripBox}
							key={trip.departureTime}
							style={{ ...calculateExistingTripBox(trip) }}></div>
					))}
				</div>
			))}
		</>
	);
}

export default ShipLines;
