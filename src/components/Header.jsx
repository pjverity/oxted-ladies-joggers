import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<div className="container-fluid">
					<div className="row p-2 bg-light justify-content-center sticky-top">
						<div className="col-auto">
							<i className="fa fa-phone align-middle text-primary"/><span itemProp="telephone"> <a href="tel:+447555384810">07555 384 810</a></span>
						</div>
						<div className="col-auto">
							<i className="fa fa-envelope align-middle text-primary"/> <a href={'mailto:' + this.props.emailAddress}>{this.props.emailAddress}</a>
						</div>
						<div className={this.props.facebookUrl !== undefined ? 'col-auto' : 'd-none'}>
							<i className="fa fa-facebook-official align-middle text-primary"/> <a href={'https://www.facebook.com' + this.props.facebookUrl}> {'facebook.com' + this.props.facebookUrl}</a>
						</div>
						<div className={this.props.twitterUrl !== undefined ? 'col-auto' : 'd-none'}>
							<i className="fa fa-twitter align-middle text-primary"/> <a href={'https://twitter.com' + this.props.twitterUrl}> {'twitter.com' + this.props.twitterUrl}</a>
						</div>
					</div>

					<div className={this.props.showLogo ? 'row m-4 justify-content-center' : 'd-none'}>
						<img className="img-fluid" src="images/logo.svg"/>
					</div>
				</div>
			</header>
		);
	}
}

