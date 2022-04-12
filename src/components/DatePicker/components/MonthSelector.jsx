import React from 'react';

import styles from './MonthSelector.module.scss';

function MonthSelector({ displayedMonth, setMonth, name }) {
	const monthsNamesArray = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	];
	return (
		<div className={styles.__monthSelector}>
			{monthsNamesArray.map((month, index) => (
				<div key={month}>
					<input
						type='radio'
						name={`switchDisplayedMonth-${name}`}
						id={`${name}-month-${month}`}
						checked={index === displayedMonth}
						value={index}
						onChange={(event) => setMonth(event)}
					/>
					<label htmlFor={`${name}-month-${month}`}>{month}</label>
				</div>
			))}
		</div>
	);
}

export default MonthSelector;
