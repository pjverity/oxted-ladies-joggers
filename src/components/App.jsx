import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {FACEBOOK_URL, SITE_EMAIL_ADDRESS, TWITTER_URL} from '../site-constants';
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";

import TokenClaimFailed from "./TokenClaimFailed.jsx";
import TokenClaimOk from "./TokenClaimOk.jsx";

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header showLogo={location.pathname === '/'}
				        emailAddress={SITE_EMAIL_ADDRESS}
				        facebookUrl={FACEBOOK_URL}/>
				<Router>
					<Switch>
						<Route exact path="/" component={Main}/>
						<Route path="/token-claim-failed" component={TokenClaimFailed}/>
						<Route path="/token-claim-ok" component={TokenClaimOk}/>
					</Switch>
				</Router>
				<Footer/>
			</div>
		);
	}
}