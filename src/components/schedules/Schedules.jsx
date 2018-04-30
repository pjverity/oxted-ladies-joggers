import {h, render, Component} from 'preact'

import Schedule from './Schedule.jsx'
import EditableSchedule from './EditableSchedule.jsx'

export default class Schedules extends Component {

	render(props, state) {
		return (
			<div>
				<div className={'row mb-4 justify-content-center'}>
					<div className={'col'}>
						<table className={'table table-sm table-striped'} style={{tableLayout: 'fixed'}}>
							<thead>
							<tr>
								<th scope='col'>When</th>
								{this.props.isEditable &&
								<th scope='col'>Time</th>
								}
								<th scope='col'>Duration</th>
								<th scope='col'>Group</th>
								<th scope='col'>Location</th>
								{this.props.isEditable && /* TODO - https://github.com/developit/preact/issues/946 */
								<th scope='col' style={{width: '5em'}}>Active</th>
								}
								{this.props.isEditable &&
								<th scope='col' style={{width: '5em'}}/>
								}
							</tr>
							</thead>
							<tbody>
							{this.props.schedules === null &&
							<tr>
								<td className={'text-center'} colSpan={this.props.isEditable ? 7 : 4}>Getting latest schedules... <i className={'fa fa-fw fa-circle-o-notch fa-spin'}/></td>
							</tr>
							}
							{this.props.schedules !== null && this.props.schedules.length === 0 &&
							<tr>
								<td className={'text-center'} colSpan={this.props.isEditable ? 7 : 4}>No schedules. Please check back later...</td>
							</tr>
							}
							{this.props.schedules !== null && this.props.schedules.length > 0 && !this.props.isEditable &&
							this.props.schedules.map(schedule => <Schedule key={schedule._links.self.href} schedule={schedule}/>)
							}
							{this.props.schedules !== null && this.props.schedules.length > 0 && this.props.isEditable &&
							this.props.schedules.map((schedule, index) => <EditableSchedule key={schedule._links.self.href} index={index}
							                                                                schedule={schedule}
							                                                                onScheduleUpdated={(scheduleChanges, scheduleIdx) => this.props.onScheduleUpdated(scheduleChanges, scheduleIdx)}
							                                                                onScheduleDeleted={(scheduleIdx) => this.props.onScheduleDeleted(scheduleIdx)}/>)
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
