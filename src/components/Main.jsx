import { h, render, Component } from 'preact'

import Schedules from './schedules/Schedules.jsx'
import Registration from './Registration.jsx'

import {SITE_API_URL} from '../site-constants'
import {getJSON} from '../ajaxutils'

const ACTIVE_SCHEDULES_API_URL = SITE_API_URL + '/schedules/search/activeSchedules';

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {schedules: null, xhrFailed: null}
	}

	componentDidMount() {
		this.requestActiveSchedules();
	}

	render(props, state) {
		return (
			<main>
				<div className='container'>
					<div className='row m-4 justify-content-center'>
						<div className='col'>
							<hr className='d-none d-sm-block'/>
						</div>
						<div className='h4'>Upcoming Courses</div>
						<div className='col'>
							<hr className='d-none d-sm-block'/>
						</div>
					</div>
					{this.state.xhrFailed !== null &&
					<div className='alert alert-danger alert-dismissible fade show' role='alert'>
						There was a problem loading the schedules. ({this.state.xhrFailed})
						<button type='button' className='close' data-dismiss='alert' aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					}
					<Schedules schedules={this.state.schedules} isEditable={false}/>
					<hr/>
					<Registration/>
				</div>
			</main>
		);
	}

	requestActiveSchedules() {
		this.setSchedules(null);
		this.setError(null);

		getJSON(ACTIVE_SCHEDULES_API_URL)
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

	setSchedules(schedules) {
		this.setState({schedules: schedules})
	}

	setError(error) {
		this.setState({xhrFailed: error})
	}
}