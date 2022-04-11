import dayjs from 'dayjs';
import 'dayjs/locale/ru';
// var objectSupport = require('dayjs/plugin/objectSupport');
// var toObject = require('dayjs/plugin/toObject');
var localeData = require('dayjs/plugin/localeData');
var weekday = require('dayjs/plugin/weekday');
var duration = require('dayjs/plugin/duration');
var relativeTime = require('dayjs/plugin/relativeTime');

// dayjs.extend(objectSupport);
// dayjs.extend(toObject);
dayjs.extend(localeData);
dayjs.locale('ru');
dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(relativeTime);
// Format Examples:
// D MMMM HH:mm:ss
// D MMMM
// HH:mm
