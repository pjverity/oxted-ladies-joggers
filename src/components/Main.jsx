import { h, render, Component } from 'preact';

import Schedules from "./Schedules.jsx";
import Registration from "./Registration.jsx";

export default class Main extends Component {
	render(props, state) {
		return (
			<main>
				<div class="container">
					<Schedules/>
					<hr/>
					<Registration/>
				</div>
			</main>
		);
	}
}