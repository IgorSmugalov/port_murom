import React, { useState } from 'react';
import YearSelector from './components/YearSelector';
import MonthSelector from './components/MonthSelector';
import DateSelector from './components/DateSelector';

import styles from './DatePicker.module.scss';

function DatePicker({ date, callback }) {
	// date: dayJsObject
	// callback: function
	// about naming: using 'day' in variable names, implies that it is the day of the week, 'dates' using for day of the month as number

	const [calendarValues, setCalendarValues] = useState(date);
	const setValue = (event) => {
		const key = event.target.name;
		const value = Number(event.target.value);
		switch (key) {
			case 'increaseDisplayedYear':
				return setCalendarValues(calendarValues.add(1, 'year'));
			case 'decreaseDisplayedYear':
				return setCalendarValues(calendarValues.subtract(1, 'year'));
			case 'switchDisplayedMonth':
				return setCalendarValues(calendarValues.month(value));
			case 'selectDate':
				return callback
					? callback(
							date
								.year(calendarValues.year())
								.month(calendarValues.month())
								.date(value)
					  )
					: console.error('no callback for DateSelector');
			default:
				console.error('Incorrect input');
				break;
		}
	};

	return (
		<div className={styles.__calendar}>
			<YearSelector setYear={setValue} year={calendarValues.year()} />
			<MonthSelector
				setMonth={setValue}
				displayedMonth={calendarValues.month()}
			/>
			<DateSelector
				setDate={setValue}
				displayedYearAndMonth={calendarValues}
				selectedDate={date}
			/>
		</div>
	);
}

export default DatePicker;
