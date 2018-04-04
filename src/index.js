import { h, render, Component } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */


import App from './components/App.jsx';

render(<App/>, document.body);
