import {h, render, Component} from 'preact'
import moment from 'moment-timezone'

import {formatDuration, DURATION_30M, DURATION_1H, DURATION_1H30M, DURATION_2H} from '../../timeutils'

const ORIGINAL_STATE = {
	commences: moment.tz(new Date(), 'UTC').format('YYYY-MM-DD'),
	time: '06:00:00',
	duration: DURATION_1H,
	name: '',
	location: '',
	active: false
};

export default class NewScheduleBar extends Component {

	constructor(props) {
		super(props);

		this.state = {...ORIGINAL_STATE};
	}

	render(props, state) {

		let localTime = (moment.tz(state.commences + ' ' + state.time, 'UTC')).tz(moment.tz.guess()).format('HH:mm');

		return (
			<form className={'form-inline'} >
				<div className={'form-row align-items-center mb-2'}>
					<input id={'date'} className={'form-control form-control-sm'} type={'text'} value={state.commences} onChange={e => this.handleChangeCommences(e)}/>
					<input className={'form-control form-control-sm ml-2'} type={'text'} value={localTime} onChange={e => this.handleChangeTime(e)}/>
					<div className={'dropdown ml-2'}>
						<select className="custom-select custom-select-sm" value={state.duration} onChange={e => this.handleChangeDuration(e)}>
							<option value={DURATION_30M}>{formatDuration(DURATION_30M)}</option>
							<option value={DURATION_1H}>{formatDuration(DURATION_1H)}</option>
							<option value={DURATION_1H30M}>{formatDuration(DURATION_1H30M)}</option>
							<option value={DURATION_2H}>{formatDuration(DURATION_2H)}</option>
						</select>
					</div>
					<input className={'form-control form-control-sm ml-2'} type={'text'} value={state.name} placeholder={'Description'} onChange={e => this.handleChangeName(e)}/>
					<input className={'form-control form-control-sm ml-2'} type={'text'} value={state.location} placeholder={'Location'} onChange={e => this.handleChangeLocation(e)}/>
					<div className={'form-check ml-2'}>
						<input id={'active'} className={'form-check-input position-static'} type={'checkbox'} checked={state.active} onClick={e => this.handleClickActive(e)}/>
						<label htmlFor={'active'}>Active</label>
					</div>
					<button className={'btn btn-sm btn-outline-primary ml-2 '} type={'button'} onClick={e => this.handleClickAdd()}><i className={'fa fa-fw fa-plus'} /></button>
				</div>
			</form>
		)
	}

	handleChangeCommences(e) {
		if (moment.tz(e.target.value, 'YYYY-MM-DD', true, "UTC").isValid()) {
			this.setState({commences: e.target.value});
		}
	}

	handleChangeTime(e) {
		if (moment.tz(e.target.value, 'HH:mm', true, "UTC").isValid()) {
			let time = moment.tz(this.state.commences + ' ' + e.target.value, moment.tz.guess());
			this.setState({time: time.tz('UTC').format('HH:mm:ss')});
		}
	}

	handleChangeDuration(e) {
		this.setState({duration: e.target.value});
	}

	handleChangeName(e) {
		this.setState({name: e.target.value});
	}

	handleChangeLocation(e) {
		this.setState({location: e.target.value});
	}

	handleClickActive(e) {
		this.setState({active: e.target.checked});
	}

	handleClickAdd(e) {
		this.props.onScheduleAdded({...this.state});
		this.resetChanges();
	}

	resetChanges() {
		this.setState({...ORIGINAL_STATE});
	}
}