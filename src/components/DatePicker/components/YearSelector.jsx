import React from 'react';
import Button from '../../UI/Button/Button';

import styles from './YearSelector.module.scss';

function YearSelector({ year, setYear }) {
	return (
		<div className={styles.__yearsSelector}>
			<Button
				name='decreaseDisplayedYear'
				onClick={(event) => setYear(event)}
				size='sm'>
				{'<<<'}
			</Button>
			<div>{year}</div>
			<Button
				name='increaseDisplayedYear'
				onClick={(event) => setYear(event)}
				size='sm'>
				{'>>>'}
			</Button>
		</div>
	);
}

export default YearSelector;
