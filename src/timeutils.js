import {parse} from 'iso8601-duration'

function formatDuration(durationString) {
	let duration = parse(durationString);

	let hours = duration.hours;
	let minutes = duration.minutes;

	let hoursPart = '';
	if ( hours > 0 ) {
		hoursPart = `${hours} hr`;
		if ( hours > 1 ) {
			hoursPart += 's';
		}
	}

	let minsPart = '';
	if ( minutes > 0 ) {
		minsPart = `${minutes} min`;
		if ( minutes > 1 ) {
			minsPart += 's';
		}
	}

	return hours > 0 ? `${hoursPart} ${minsPart} ` : minsPart;
}

const DURATION_30M = 'PT30M';
const DURATION_1H = 'PT1H';
const DURATION_1H30M = 'PT1H30M';
const DURATION_2H = 'PT2H';

module.exports = {
	formatDuration,
	DURATION_30M, DURATION_1H, DURATION_1H30M, DURATION_2H
};