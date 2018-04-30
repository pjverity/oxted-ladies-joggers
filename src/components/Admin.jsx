import {h, render, Component} from 'preact'
import $ from 'jquery'

import Schedules from './schedules/Schedules.jsx'
import NewScheduleBar from './schedules/NewScheduleBar.jsx'
import ScheduleDeletionModal from './schedules/ScheduleDeletionModal.jsx'

import {SITE_API_URL} from '../site-constants';
import {getJSON, postJSON, patchJSON, deleteJSON} from '../ajaxutils'

const SCHEDULES_API_URL = SITE_API_URL + '/schedules';

export default class Admin extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			schedules: null, 
			xhrFailed: null, 
			selectedScheduleIdx: null
		}
	}

	componentDidMount() {
		this.requestSchedules();
	}

	render(props, state) {

		return (
			<div className={'container mt-2 justify-content-center'}>
				<h1>Schedule Admin</h1>
				<hr/>
				<ScheduleDeletionModal schedule={state.selectedScheduleIdx !== null ? state.schedules[state.selectedScheduleIdx] : null}
				                       onModalCancelled={e => this.handleModalCancelled(e)}
				                       onModalConfirmed={e => this.handleModalConfirmed(e)}/>
				{this.state.xhrFailed !== null &&
					<div className='alert alert-danger alert-dismissible fade show' role='alert'>
						<strong>Update failed!</strong> There was a problem saving your changes. ({this.state.xhrFailed})
						<button type='button' className='close' data-dismiss='alert' aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
				}
				<div className={'row mt-4 mb-3 justify-content-center'}>
					<NewScheduleBar onScheduleAdded={newSchedule => this.handleScheduleAdded(newSchedule)}/>
				</div>
				<div className={'row'}>
					<Schedules schedules={this.state.schedules} isEditable={true}
					           onScheduleUpdated={(scheduleChanges, scheduleIdx) => this.handleScheduleUpdated(scheduleChanges, scheduleIdx)}
					           onScheduleDeleted={(scheduleIdx) => this.handleScheduleDeleted(scheduleIdx)}/>
				</div>
			</div>
		)
	}

	handleModalCancelled(e) {
		this.dismissModalAndClearSelection();
	}

	handleModalConfirmed(e) {
		const url = this.state.schedules[this.state.selectedScheduleIdx]._links.self.href;

		deleteJSON(url)
			.done(() => this.removeSchedule(this.state.selectedScheduleIdx))
			.fail((jqxhr, textStatus, error) => this.handleXHRFailure(jqxhr, textStatus, error))
			.always(() => this.dismissModalAndClearSelection());
	}

	handleScheduleAdded(newSchedule) {
		postJSON(SCHEDULES_API_URL, newSchedule)
			.done((data) => this.addSchedule(data))
			.fail((jqxhr, textStatus, error) => this.handleXHRFailure(jqxhr, textStatus, error));
	}

	handleScheduleUpdated(scheduleChanges, scheduleIdx) {
		const url = this.state.schedules[scheduleIdx]._links.self.href;

		patchJSON(url, scheduleChanges)
			.done((data) => this.updateSchedule(data, scheduleIdx))
			.fail((jqxhr, textStatus, error) => this.handleXHRFailure(jqxhr, textStatus, error));
	};

	handleScheduleDeleted(scheduleIdx) {
		this.showModalAndSetSelection(scheduleIdx);
	}

	dismissModalAndClearSelection() {
		this.setState({selectedScheduleIdx: null});
		$('#deleteScheduleModal').modal('hide');
	}

	showModalAndSetSelection(scheduleIdx) {
		this.setState({selectedScheduleIdx: scheduleIdx});
		$('#deleteScheduleModal').modal('show');
	}

	requestSchedules() {
		this.setSchedules(null);
		this.setError(null);

		getJSON(SCHEDULES_API_URL)
			.done((data) => this.setSchedules(data._embedded.schedules))
			.fail((jqxhr, textStatus, error) => this.handleXHRFailure(jqxhr, textStatus, error));
	}

	handleXHRFailure(jqxhr, textStatus, error) {
		if ( jqxhr.readyState === 0 ) {
			this.setError('Connection Error');
		}
		else if ( jqxhr.readyState === 4 ){
			this.setError('Status: ' + jqxhr.status);
		}
		else {
			this.setError('Unknown error: ' + jqxhr.readyState);
		}

		this.setSchedules([]);
	}

	setError(error) {
		this.setState({xhrFailed: error})
	}

	setSchedules(schedules) {
		this.setState({schedules: schedules})
	}

	addSchedule(newSchedule) {
		this.setState({schedules: [newSchedule, ...this.state.schedules]});
	}

	updateSchedule(updatedSchedule, index) {
		let schedulesCopy = [...this.state.schedules];
		schedulesCopy[index] = updatedSchedule;
		this.setState({schedules: schedulesCopy});
	}

	removeSchedule(index) {
		let schedulesCopy = [...this.state.schedules];
		schedulesCopy.splice(index, 1);
		this.setState({schedules: schedulesCopy})
	}

}