import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { VPortalSVG } from './VPortalSVG';
import { Bottom } from './Bottom';
import './sass/LandingPage.scss';

const ClientDownload = () => {
	const download = () => {
		console.log('downloading');
	}
	return (<div className="downloadwrapper">
	<button className="clientdownload" onClick={download}>
		{"Download Client"}
	</button>
	</div>);
}

const PortalTitle = () => {
	return (<div className="portaltitle">
		<div className="title">{"VPortal"}</div>
		<div className="desc">{"Simple, Secure, and Cross-Platform"}</div>
		<ClientDownload/>
	</div>);
}

const PortalImage = () => {
	return (<div className="portalimage">
		<VPortalSVG/>
	</div>);
}

const PortalPage = () => {
	return (<div className="portalpage">
		<PortalTitle/>
		<PortalImage/>
	</div>);
}

const LandingPage = () => {
	return (<div className="landing">
		<Navigation/>
		<PortalPage/>
		<Bottom/>
	</div>);
}

export {
	LandingPage
}
