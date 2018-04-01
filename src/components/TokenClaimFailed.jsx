import React from 'react';

export default class TokenClaimFailed extends React.Component {
	render() {
		return (
			<main>
				<div className="container">

					<h1 className="p-4 m-4 text-center"><i className="text-danger fa fa-fw fa-times-circle"/> Failed to Credit Token</h1>
					<p className="text-center">
						Apologies, but something has gone wrong. Please contact us directly using one of the contacts listed above and we'll resolve your issue...
					</p>
					<p className="pb-4 mb-4 text-center">
						<a href="/"><i className="fa fa-fw fa-reply mr-1"/>Return to Home Page</a>
					</p>
				</div>
			</main>
		);
	}
}