import React, {createRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { VideoClient } from './components/VideoClient';
import './components/sass/App.scss';

const App = ({}) => {
	
	return (<Switch>
			<Route path="/" exact render={() => <LandingPage/>}/>
			<Route path="/vclient" render={() => <VideoClient/>}/>
		</Switch>);
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
