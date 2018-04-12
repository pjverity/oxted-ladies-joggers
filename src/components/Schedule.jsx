import { h, render, Component } from 'preact';

export default class Schedule extends Component {

	render(props, state) {
		return (
			<tr key={props.schedule.name}>
				<th scope="row">{new Date(props.schedule.commences + 'T' + props.schedule.time).toLocaleDateString('en-GB', {
					weekday: 'long',
					hour: '2-digit',
					minute: '2-digit'
				})}</th>
				<td>{props.schedule.duration}</td>
				<td>{props.schedule.name}</td>
				<td>{props.schedule.location}</td>
			</tr>
		)
	}

}