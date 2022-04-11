import React from 'react';
import dayjs from 'dayjs';
import 'src/plugins/dayJsPlugins.js';

import DatePicker from './DatePicker';
export default {
	title: 'DatePicker/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'fullscreen',
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
	},
};

const Template = (args) => <DatePicker {...args} />;

export const One = Template.bind({});
One.args = {
	initDate: undefined,
	callback: undefined,
	startSelected: undefined,
};
