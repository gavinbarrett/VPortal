import React from 'react';
import { Navigation } from './Navigation';
import './sass/SignIn.scss';

const UserAuthenticator = () => {
	return (<div className="userauth">
		auth
	</div>);
}

const SignIn = () => {
	return (<div className="signincontainer">
		<Navigation/>
		<UserAuthenticator/>
	</div>);
}

export {
	SignIn
}
