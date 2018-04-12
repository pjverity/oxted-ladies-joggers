import { h, render, Component } from 'preact';

export default class Header extends Component {
	render(props, state) {
		return (
			<header>
				<div class="container-fluid">
					<div class="row p-2 bg-light justify-content-center sticky-top">
						<div class="col-auto">
							<i class="fa fa-phone align-middle text-primary"/><span itemProp="telephone"> <a href="tel:+447555384810">07555 384 810</a></span>
						</div>
						<div class="col-auto">
							<i class="fa fa-envelope align-middle text-primary"/> <a href={'mailto:' + props.emailAddress}>{props.emailAddress}</a>
						</div>
						<div class={props.facebookUrl !== undefined ? 'col-auto' : 'd-none'}>
							<i class="fa fa-facebook-official align-middle text-primary"/> <a href={'https://www.facebook.com' + props.facebookUrl}> {'facebook.com' + props.facebookUrl}</a>
						</div>
						<div class={props.twitterUrl !== undefined ? 'col-auto' : 'd-none'}>
							<i class="fa fa-twitter align-middle text-primary"/> <a href={'https://twitter.com' + props.twitterUrl}> {'twitter.com' + props.twitterUrl}</a>
						</div>
					</div>

					<div class={props.showLogo ? 'row m-4 justify-content-center' : 'd-none'}>
						<img class="img-fluid" src="images/logo.svg"/>
					</div>
				</div>
			</header>
		);
	}
}

