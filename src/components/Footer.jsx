import { h, render, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Footer extends Component {
	render(props, state) {
		return (
			<footer class="mt-3" style={{fontSize: '.75em'}}>
				<div class="container-fluid bg-light text-secondary">
					<div class="row pt-3 text-center justify-content-center">
						<div class="col-4 col-sm-2">
							Mens
							<ul class="list-unstyled">
								<li><a href="http://www.reigatemensjoggers.co.uk">Reigate</a></li>
							</ul>
						</div>
						<div class="col-auto">
							Ladies
							<ul class="list-unstyled">
								<li><a href="http://www.reigateladiesjoggers.co.uk">Reigate</a></li>
								<li><a href="http://www.caterhamladiesjoggers.co.uk">Caterham</a></li>
								<li><a href="http://www.dorkingladiesjoggers.co.uk">Dorking</a></li>
								<li><a href="http://www.horshamladiesjoggers.co.uk">Horsham</a></li>
							</ul>
§							<Link activeClassName={'visible'} href={'/privacy-policy'}>Our Privacy Policy</Link>
						</div>
						<div class="col-4 col-sm-2">
							Juniors
							<ul class="list-unstyled">
								<li><a href="http://www.reigatejuniorjoggers.co.uk">Reigate</a></li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

