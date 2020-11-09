import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { useHistory } from 'react-router-dom';
import './sass/SignIn.scss';

const UserAuthenticator = () => {

	const [username, updateUsername] = useState('');
	const [password, updatePassword] = useState('');
	const history = useHistory();

	const changeUsername = async (event) => {
		await updateUsername(event.target.value);
	}

	const changePassword = async (event) => {
		await updatePassword(event.target.value);
	}

	const authenticate = async () => {
		const resp = await fetch('/signin', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"user": username, "pass": password})});

		const res = await resp.json();
		console.log(res);
		history.push('/user');
	}

	return (<div className="userauth">
		<div className="authbox">
			<input type="text" onChange={changeUsername}/>
			<input type="password" onChange={changePassword}/>
			<button onClick={authenticate}>Sign In</button>
		</div>
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
