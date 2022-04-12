import React, { useEffect } from 'react';

import styles from './CheckboxGroup.module.scss';

function CheckboxGroup({ selectedValues, allValues, setValues, name }) {
	useEffect(() => {
		setValues([...allValues]);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function updateActiveValues(event) {
		const value = event.target.value;
		if (selectedValues.includes(value)) {
			setValues([
				...selectedValues.filter((activeValue) => activeValue !== value),
			]);
		} else {
			setValues([...selectedValues, value]);
		}
	}

	return (
		<div className={styles.__checkboxGroup}>
			{allValues.map((value) => (
				<div key={value} className={styles.__checkboxGroup__item}>
					<input
						id={`${name}-${value}`}
						type='checkbox'
						name={`${name}-checkboxGroup`}
						checked={selectedValues.includes(value)}
						value={value}
						onChange={(event) => updateActiveValues(event)}
					/>
					<label htmlFor={`${name}-${value}`}>{value}</label>
				</div>
			))}
		</div>
	);
}

export default CheckboxGroup;
