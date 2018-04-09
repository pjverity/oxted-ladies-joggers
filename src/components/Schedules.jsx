import { h, render, Component } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

import {SITE_API_URL} from '../site-constants';

let SCHEDULES_API_URL = SITE_API_URL + '/schedules/search/activeSchedules';

export default class Schedules extends Component {

	constructor(props) {
		super(props);
		this.state = {schedules: []};
	}

	componentDidMount() {
		$.get(SCHEDULES_API_URL, (data) => this.setState(data._embedded));
	}

	render(props, state) {
		return (
			<div>

				<div class="row m-4 justify-content-center">
					<div class="col">
						<hr class="d-none d-sm-block"/>
					</div>
					<div class="h4">Upcoming Courses</div>
					<div class="col">
						<hr class="d-none d-sm-block"/>
					</div>
				</div>

				<div class="row mb-4 justify-content-center">
					<div class="col">
						<table class="table table-sm table-striped">
							<thead>
							<tr>
								<th scope="col">When</th>
								<th scope="col">Duration</th>
								<th scope="col">Group</th>
								<th scope="col">Where</th>
							</tr>
							</thead>
							<tbody>
							{
								state.schedules.map(schedule =>
								{
									return (
										<tr key={schedule.name}>
											<th scope="row">{new Date(schedule.commences + 'T' + schedule.time).toLocaleDateString('en-GB', {weekday: 'long', hour: '2-digit', minute: '2-digit'})}</th>
											<td>{schedule.duration}</td>
											<td>{schedule.name}</td>
											<td>{schedule.location}</td>
										</tr>
									)
								})
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}



