import { h, render, Component } from 'preact';

export default class TokenClaimOk extends Component {
	render(props, state) {
		return (
			<main>
				<div class="container">

					<h1 class="p-4 m-4 text-center"><i class="text-success fa fa-fw fa-check-circle"/> Successfully Credited Your Free Token!</h1>
					<p class="text-center">
						You're all set to go. We look forward to seeing you!
					</p>
					<p class="pb-4 mb-4 text-center">
						<a href="/"><i class="fa fa-fw fa-reply mr-1"/>Return to Home Page</a>
					</p>
				</div>
			</main>
		);
	}
}