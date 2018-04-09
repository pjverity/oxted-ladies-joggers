import { h, render, Component } from 'preact';
import Router from 'preact-router';
import Match from 'preact-router/match';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

import {FACEBOOK_URL, SITE_EMAIL_ADDRESS} from '../site-constants';

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import TokenClaimFailed from "./TokenClaimFailed.jsx";
import TokenClaimOk from "./TokenClaimOk.jsx";

export default class App extends Component {
	render(props, state) {
		return (
			<div>
				<Match path="/">
					{ ({ matches, path, url }) => (
						<Header showLogo={path === '/'}
						        emailAddress={SITE_EMAIL_ADDRESS}
						        facebookUrl={FACEBOOK_URL}/>
					) }
				</Match>
				<Router>
					<Main exact path="/"/>
					<TokenClaimFailed path="/token-claim-failed"/>
					<TokenClaimOk path="/token-claim-ok"/>
				</Router>
				<Footer/>
			</div>
		);
	}
}