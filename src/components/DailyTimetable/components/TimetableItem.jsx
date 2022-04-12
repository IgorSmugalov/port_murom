import dayjs from 'dayjs';
import React from 'react';
import Button from '../../UI/Button/Button';
import styles from './TimetableItem.module.scss';

const TimetableItem = ({ deleteTrip, selectTrip, trip }) => {
	return (
		<div className={styles.__trip}>
			<div className={styles.__trip__time}>
				{dayjs(trip.departureTime).format('D MMMM HH:mm')}
			</div>
			<div className={styles.__trip__type}>{trip.tripType}</div>
			<div className={styles.__trip__ship}>{trip.shipName}</div>
			<div className={styles.__trip__button}>
				<Button size='fill' onClick={() => selectTrip(trip.id)}>
					Подробнее
				</Button>
			</div>
			<div className={styles.__trip__button}>
				<Button size='fill' onClick={() => deleteTrip(trip.id)}>
					Удалить
				</Button>
			</div>
		</div>
	);
};

export default TimetableItem;
