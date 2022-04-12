import React from 'react';

import styles from './RadioGroup.module.scss';

const RadioGroup = ({ selectedValue, setValue, allValues, name }) => {
	return (
		<div className={styles.__radioGroup}>
			{allValues.map((value) => (
				<div key={value} className={styles.__radioGroup__item}>
					<input
						type='radio'
						name={`${name}-radioGroup`}
						id={`${name}-${value}`}
						checked={value === selectedValue}
						value={value}
						onChange={(event) => {
							setValue(event.target.value);
						}}
					/>
					<label htmlFor={`${name}-${value}`}>{value}</label>
				</div>
			))}
		</div>
	);
};

export default RadioGroup;
