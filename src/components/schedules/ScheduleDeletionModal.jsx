import {h, render, Component} from 'preact'
import moment from 'moment-timezone'

export default class ScheduleDeletionModal extends Component {

	render(props, state) {
		return (
			<div id='deleteScheduleModal' className='modal fade' tabIndex='-1'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header text-danger'>
							<h5 className='modal-title'>Confirm Schedule Deletion</h5>
							<button type='button' className='close' onClick={e => this.handleClickDeleteScheduleCancelled(e)}>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<p>
								Are you sure you want to delete the following schedule:
							</p>
							{this.props.schedule !== null &&
							<p>
								<strong>{props.schedule.name}</strong> on {props.schedule.commences} at {(moment.tz(props.schedule.commences + ' ' + props.schedule.time, 'UTC')).tz(moment.tz.guess()).format('HH:mm')}?
							</p>
							}
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-outline-secondary' onClick={e => this.props.onModalCancelled(e)}>Cancel</button>
							<button type='button' className='btn btn-danger' onClick={e => this.props.onModalConfirmed(e)}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
