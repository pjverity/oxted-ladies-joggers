import { h, render, Component } from 'preact'
import _ from 'lodash'
import moment from 'moment-timezone'

import {formatDuration, DURATION_30M, DURATION_1H, DURATION_1H30M, DURATION_2H} from '../../timeutils'

export default class EditableSchedule extends Component {

	constructor(props) {
		super(props);

		this.state = {
			changes: {},
			inEditMode: false,
			saveInProgress: false
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		if ( !_.isEqual(this.props.schedule, nextProps.schedule) ) {
			this.endSaveInProgress();
			this.resetChanges();
		}
	}

	render(props, state) {

		let commences = state.changes.commences === undefined ? props.schedule.commences : state.changes.commences;
		let time = state.changes.time === undefined ? props.schedule.time : state.changes.time;
		let duration = state.changes.duration === undefined ? props.schedule.duration : state.changes.duration;
		let name = state.changes.name === undefined ? props.schedule.name : state.changes.name;
		let location = state.changes.location === undefined ? props.schedule.location : state.changes.location;
		let active = state.changes.active === undefined ? props.schedule.active : state.changes.active;

		let localTime = (moment.tz(commences + ' ' + time, 'UTC')).tz(moment.tz.guess()).format('HH:mm');

		return (
			<tr>
				<td className={'align-middle'}>
					{state.inEditMode ?
						(<input className={'form-control form-control-sm'} type={'text'} value={commences} onChange={e => this.handleChangeCommences(e)}/>)
						:
						(commences)
					}
				</td>
				<td className={'align-middle'}>
					{state.inEditMode ?
						(<input className={'form-control form-control-sm'} type={'text'} value={localTime} onChange={e => this.handleChangeTime(e)} />)
						:
						(localTime)
					}
				</td>
				<td className={'align-middle'}>
					{state.inEditMode ?
						(<select className='custom-select custom-select-sm' value={duration} onChange={e => this.handleSelectDuration(e)}>
							<option value={DURATION_30M}>{formatDuration(DURATION_30M)}</option>
							<option value={DURATION_1H}>{formatDuration(DURATION_1H)}</option>
							<option value={DURATION_1H30M}>{formatDuration(DURATION_1H30M)}</option>
							<option value={DURATION_2H}>{formatDuration(DURATION_2H)}</option>
						</select>)
						:
						(formatDuration(duration))}
				</td>
				<td className={'align-middle'}>
					{state.inEditMode ?
						(<input className={'form-control form-control-sm'} type={'text'} value={name} onChange={e => this.handleChangeName(e)}/>)
						:
						(name)
					}
				</td>
				<td className={'align-middle'}>
					{state.inEditMode ?
						(<input className={'form-control form-control-sm'} type={'text'} value={location} onChange={e => this.handleChangeLocation(e)}/>)
						:
						(location)
					}
				</td>
				<td className={'align-middle text-center'}>
					<div className='form-check'>
						{state.inEditMode ?
							(<input className={'form-check-input position-static'} type={'checkbox'} checked={active} onClick={e => this.handleClickActive(e)}/>)
							:
							(<input className={'form-check-input position-static'} type={'checkbox'} disabled={true} checked={active}/>)
						}
					</div>
				</td>
				<td className={'align-middle bg-white text-center'}>
					{this.renderActionState()}
				</td>
			</tr>
		)
	}

	renderActionState() {

		if ( this.state.saveInProgress ) {
			return (<i className={'fa fa-circle-o-notch fa-spin'}/>);
		}
		
		let iconClass = 'fa ';
		let handler = null;

		if ( this.state.inEditMode ) {
			iconClass += 'fa-floppy-o';
			handler = e => this.handleClickSave(e);
		}
		else {
			iconClass += 'fa-pencil';
			handler = e => this.enterEditMode(e);
		}

		return (
			<div className={'btn-group'}>
				<button className={'btn btn-sm btn-outline-primary'} type={'button'} onClick={handler}>
					<i className={iconClass}/>
				</button>
				{this.state.inEditMode ?
					(<button className={'btn btn-sm btn-outline-primary'} type={'button'} onClick={e => {this.handleClickUndo()}}>
						<i className={'fa fa-undo'}/>
					</button>) :
					(<button className={'btn btn-sm btn-outline-danger'} type={'button'} onClick={e => this.handleClickDelete(e)}>
						<i className={'fa fa-trash'}/>
					</button>)
				}
			</div>
		)
	}

	handleChangeCommences(e) {
		if ( moment.tz(e.target.value, 'YYYY-MM-DD', true, 'UTC').isValid() ) {
			this.setState({changes: {...this.state.changes, commences: e.target.value}});
		}
	}

	handleChangeTime(e) {
		let commences = this.props.schedule.commences;

		if ( this.state.changes.commences !== undefined ) {
			commences = this.state.changes.commences;
		}

		if ( moment.tz(e.target.value, 'HH:mm', true, 'UTC').isValid() ) {
			let time = moment.tz(commences + ' ' + e.target.value, moment.tz.guess());
			this.setState({changes: {...this.state.changes, time: time.tz('UTC').format('HH:mm:ss')}});
		}
	}

	handleSelectDuration(e) {
		this.setState({changes: {...this.state.changes, duration: e.target.value}});
	}

	handleChangeName(e) {
		this.setState({changes: {...this.state.changes, name: e.target.value}});
	}

	handleChangeLocation(e) {
		this.setState({changes: {...this.state.changes, location: e.target.value}});
	}

	handleClickActive(e) {
		this.setState({changes: {...this.state.changes, active: e.target.checked}});
	}

	handleClickSave(e) {
		if ( !_.isEmpty(this.state.changes)) {
			this.props.onScheduleUpdated({...this.state.changes}, this.props.index);
			this.beginSaveInProgress();
		}

		this.exitEditMode();
	}

	handleClickUndo() {
		this.exitEditMode();
		this.resetChanges();
	}

	handleClickDelete(e) {
		this.props.onScheduleDeleted(this.props.index);
	}

	resetChanges() {
		this.setState({changes: {}});
	}

	enterEditMode() {
		this.setState({inEditMode: true});
	}

	exitEditMode() {
		this.setState({inEditMode: false});
	}

	beginSaveInProgress() {
		this.setState({saveInProgress: true});
	}

	endSaveInProgress() {
		this.setState({saveInProgress: false});
	}
}