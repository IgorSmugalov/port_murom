const tripsByShipArray = (trips) => {
	// собирает стандартный массив прогулок в объект, где ключом является название теплохода, а значением  массив со всеми рейсами данного теплохода
	const result = new Map();
	trips.forEach((trip) => {
		result.set(
			trip.shipName,
			result.has(trip.shipName)
				? [
						...result.get(trip.shipName),
						{
							departureTime: trip.departureTime,
							arrivalTime: trip.arrivalTime,
							tripType: trip.tripType,
						},
				  ]
				: [
						{
							departureTime: trip.departureTime,
							arrivalTime: trip.arrivalTime,
							tripType: trip.tripType,
						},
				  ]
		);
	});
	return Object.fromEntries(result);
};
