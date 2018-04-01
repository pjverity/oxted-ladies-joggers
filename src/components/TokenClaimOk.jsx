import React from 'react';

export default class TokenClaimOk extends React.Component {
	render() {
		return (
			<main>
				<div className="container">

					<h1 className="p-4 m-4 text-center"><i className="text-success fa fa-fw fa-check-circle"/> Successfully Credited Your Free Token!</h1>
					<p className="text-center">
						You're all set to go. We look forward to seeing you!
					</p>
					<p className="pb-4 mb-4 text-center">
						<a href="/"><i className="fa fa-fw fa-reply mr-1"/>Return to Home Page</a>
					</p>
				</div>
			</main>
		);
	}
}