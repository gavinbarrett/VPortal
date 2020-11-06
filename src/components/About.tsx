import React from 'react';
import { Navigation } from './Navigation';
import './sass/About.scss';

const AboutApp = () => {
	return (<div className="aboutapp">
	</div>);
}

const About = () => {
	return (<div className="aboutwrapper">
		<Navigation/>
		<AboutApp/>
	</div>);
}

export {
	About
}
