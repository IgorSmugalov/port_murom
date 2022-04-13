import dayjs from 'dayjs';
import React from 'react';
import Button from '../UI/Button/Button';

import styles from './TripInfo.module.scss';

function TripInfo({ trip, close }) {
	return (
		<div className={styles.__tripInfo} onClick={() => close()}>
			<div
				onClick={(event) => event.stopPropagation()}
				className={styles.__tripInfo__body}>
				<h3>Информация о прогулке</h3>
				<ul>
					<li>{`ID: ${trip.id}`}</li>
					<li>
						{`Отправление: ${dayjs(trip.departureTime).format(
							'YYYY D MMMM HH:mm:ss'
						)}`}
					</li>
					<li>
						{`Прибытие: ${dayjs(trip.arrivalTime).format(
							'YYYY D MMMM HH:mm:ss'
						)}`}
					</li>
					<li>{`Теплоход: ${trip.shipName}`} </li>
					<li>{`Тип рейса: ${trip.tripType}`} </li>
					<Button onClick={() => close()}>Закрыть</Button>
				</ul>
			</div>
		</div>
	);
}

export default TripInfo;
