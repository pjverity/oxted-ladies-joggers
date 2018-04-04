import { h, render, Component } from 'preact';

export default class TokenClaimFailed extends Component {
	render(props, state) {
		return (
			<main>
				<div class="container">

					<h1 class="p-4 m-4 text-center"><i class="text-danger fa fa-fw fa-times-circle"/> Failed to Credit Token</h1>
					<p class="text-center">
						Apologies, but something has gone wrong. Please contact us directly using one of the contacts listed above and we'll resolve your issue...
					</p>
					<p class="pb-4 mb-4 text-center">
						<a href="/"><i class="fa fa-fw fa-reply mr-1"/>Return to Home Page</a>
					</p>
				</div>
			</main>
		);
	}
}