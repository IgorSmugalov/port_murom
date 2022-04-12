import React, { useState } from 'react';
import YearSelector from './components/YearSelector';
import MonthSelector from './components/MonthSelector';
import DateSelector from './components/DateSelector';

import styles from './DatePicker.module.scss';

function DatePicker({ date, name, setDate }) {
	// date: initial date, may be only dayJsObject
	// about naming: using 'day' in variable names, implies that this is the day of the week, 'dates' using for day of the month as number

	const [calendarValues, setCalendarValues] = useState(date);
	const setValue = (event) => {
		const key = event.target.name;
		const value = Number(event.target.value);
		switch (key) {
			case `increaseDisplayedYear-${name}`:
				return setCalendarValues(calendarValues.add(1, 'year'));
			case `decreaseDisplayedYear-${name}`:
				return setCalendarValues(calendarValues.subtract(1, 'year'));
			case `switchDisplayedMonth-${name}`:
				return setCalendarValues(calendarValues.month(value));
			case `selectDate-${name}`:
				return setDate(
					date
						.year(calendarValues.year())
						.month(calendarValues.month())
						.date(value)
				);
			default:
				console.error('Incorrect input');
				break;
		}
	};

	return (
		<div className={styles.__calendar}>
			<YearSelector
				setYear={setValue}
				year={calendarValues.year()}
				name={name}
			/>
			<MonthSelector
				setMonth={setValue}
				displayedMonth={calendarValues.month()}
				name={name}
			/>
			<DateSelector
				setDate={setValue}
				displayedYearAndMonth={calendarValues}
				selectedDate={date}
				name={name}
			/>
		</div>
	);
}

export default DatePicker;
