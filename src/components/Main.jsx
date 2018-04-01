import React from 'react';

import Schedules from "./Schedules.jsx";
import Registration from "./Registration.jsx";

export default class Main extends React.Component {
	render() {
		return (
			<main>
				<div className="container">
					<Schedules/>
					<hr/>
					<Registration/>
				</div>
			</main>
		);
	}
}