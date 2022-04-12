import React from 'react';
import dayjs from 'dayjs';

import styles from './DateSelector.module.scss';

function DateSelector({ displayedYearAndMonth, setDate, selectedDate, name }) {

	function calculateDates(month) {
		const datesArray = [];
		const datesCountInMonth = dayjs(month).daysInMonth();
		for (let date = 1; date <= datesCountInMonth; date++) {
			datesArray.push(date);
		}
		const firstDateOffset =
			dayjs(month).startOf('month').weekday() + 1;
		return [datesArray, firstDateOffset];
	}

	const [datesArray, firstDateOffset] = calculateDates(displayedYearAndMonth);

	return (
		<div className={styles.__dateSelector}>
			{datesArray.map((date) => (
				<div
					key={date}
					style={date === 1 ? { gridColumnStart: firstDateOffset } : null}>
					<input
						type='radio'
						name={`selectDate-${name}`}
						id={`${name}-day-${date}`}
						checked={displayedYearAndMonth
							.date(date)
							.isSame(selectedDate, 'day')}
						value={date}
						onChange={(event) => setDate(event)}
					/>
					<label htmlFor={`${name}-day-${date}`}>{date}</label>
				</div>
			))}
		</div>
	);
}

export default DateSelector;
