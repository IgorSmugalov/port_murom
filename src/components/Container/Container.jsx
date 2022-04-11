import React from 'react';

import styles from './Container.module.scss';

const Container = ({ children }) => {
	return <div className={styles.__container}>{children}</div>;
};

export default Container;
