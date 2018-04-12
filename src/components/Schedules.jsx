import { h, render, Component } from 'preact';

import Schedule from './Schedule.jsx';

import {SITE_API_URL} from '../site-constants';

let SCHEDULES_API_URL = SITE_API_URL + '/schedules/search/activeSchedules';

export default class Schedules extends Component {

	componentDidMount() {
		$.get(SCHEDULES_API_URL, (data) => this.setState({getSchedulesFailed: false, schedules: data._embedded.schedules}))
			.fail((jqxhr, textStatus, error) => this.setState({getSchedulesFailed: true}));
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
							{this.state.getSchedulesFailed &&
								<tr>
									<td class='text-center' colSpan={4}><i class="fa fa-exclamation-triangle text-danger"/> Failed to get schedules. Please check back later...</td>
								</tr>
							}
							{!this.state.getSchedulesFailed && this.state.schedules === undefined &&
								<tr>
									<td class='text-center' colSpan={4}>Getting latest schedules... <i class='fa fa-fw fa-circle-o-notch fa-spin'></i></td>
								</tr>
							}
							{this.state.schedules !== undefined && this.state.schedules.length === 0 &&
								<tr>
									<td class='text-center' colSpan={4}>No schedules. Please check back later...</td>
								</tr>
							}
							{this.state.schedules !== undefined && this.state.schedules.length > 0 &&
								this.state.schedules.map(schedule => <Schedule schedule={schedule}/>)
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}



