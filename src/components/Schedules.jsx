import { h, render, Component } from 'preact';

export default class Schedules extends Component {
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
								<th scope="col">Day</th>
								<th scope="col">Time</th>
								<th scope="col">Group</th>
								<th scope="col">Meeting Place</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<th scope="row">Monday 16th April to Monday 21st May</th>
								<td>19:30</td>
								<td>Beginner Course</td>
								<td>Oxted School, Oxted</td>
							</tr>
							<tr>
								<th scope="row">Monday 16th April to Monday 21st May</th>
								<td>19:30</td>
								<td>Improvers Course</td>
								<td>Oxted School, Oxted</td>
							</tr>
							<tr>
								<th scope="row">Thursday 19th April to Thursday 24th</th>
								<td>09:30</td>
								<td>Beginner Course</td>
								<td>Carpenters Arms, Oxted</td>
							</tr>
							<tr>
								<th scope="row">Thursday 19th April to Thursday 24th</th>
								<td>09:30</td>
								<td>Improvers Course</td>
								<td>Carpenters Arms, Oxted</td>
							</tr>
							<tr>
								<th scope="row">Saturday 21st April - Saturday 26th May</th>
								<td>08:00</td>
								<td>10k Course</td>
								<td>Limpsfield Golf Course, Limpsfield, Oxted</td>
							</tr>
							<tr>
								<th scope="row">Saturday 21st April - Saturday 26th May</th>
								<td>08:00</td>
								<td>Intermediate 10k Run</td>
								<td>Limpsfield Golf Course, Limpsfield, Oxted</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}



