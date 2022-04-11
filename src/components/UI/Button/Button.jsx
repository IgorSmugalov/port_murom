import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

function Button({ name, onClick, size, children }) {
	const style = cn(styles.__button, styles[`__button_${size}`]);
	return (
		<button className={style} name={name} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
