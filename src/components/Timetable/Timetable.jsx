import React from 'react';
import Container from '../Container/Container';
import Button from '../UI/Button/Button';
import styles from './Timetable.module.scss';
import TimetableItem from './TimetableItem';

const Timetable = ({ tripsList, setTripsList, setTripInfo }) => {
	const deleteTrip = (id) => {
		setTripsList(tripsList.filter((trip) => trip.id !== id));
	};
	const selectTrip = (id) => {
		setTripInfo(tripsList.find((trip) => trip.id === id));
	};

	const sortTripsByTime = (array, direction) => {
		switch (direction) {
			case 'increase':
				array.sort((a, b) => {
					return a.departureTime < b.departureTime
						? -1
						: a.departureTime > b.departureTime
						? 1
						: 0;
				});
				break;
			case 'decrease':
				array.sort((a, b) => {
					return a.departureTime < b.departureTime
						? 1
						: a.departureTime > b.departureTime
						? -1
						: 0;
				});
				break;
			default:
				console.error('sort direction not set or incorrect');
				break;
		}
		setTripsList([...array]);
	};

	return (
		<section>
			<Container>
				<div className={styles.__tripsList}>
					<h2>Расписание</h2>
					{tripsList.length === 0 ? (
						<h4>Нет рейсов</h4>
					) : (
						tripsList.map((trip) => (
							<TimetableItem
								key={trip.id}
								trip={trip}
								deleteTrip={deleteTrip}
								selectTrip={selectTrip}
							/>
						))
					)}
					<div className={styles.__tripsList__buttons}>
						<Button onClick={() => setTripsList([])}>Удалить все</Button>
						<Button
							onClick={() => sortTripsByTime(tripsList, 'increase')}>
							Сортировать +++
						</Button>
						<Button
							onClick={() => sortTripsByTime(tripsList, 'decrease')}>
							Сортировать ---
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Timetable;
