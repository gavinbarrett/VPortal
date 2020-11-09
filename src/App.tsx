import React, {createRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { About } from './components/About';
import { SignIn } from './components/SignIn';
import { UserInterface } from './components/UserInterface';
import { VideoClient } from './components/VideoClient';
import './components/sass/App.scss';

const App = ({}) => {
	
	return (<Switch>
		<Route path="/" exact render={() => <LandingPage/>}/>
		<Route path="/about" render={() => <About/>}/>
		<Route path="/signin" render={() => <SignIn/>}/>
		<Route path="/user" render={() => <UserInterface/>}/>
		<Route path="/vclient" render={() => <VideoClient/>}/>
		</Switch>);
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
