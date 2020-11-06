import React, {createRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './components/styling/App.scss';

const App = ({}) => {
	
	const constraints = {
		audio: false,
		video: true
	};
	
	const handleSuccess = (stream, video) => {
		//window.URL.createObjectURL(stream);
		//video.srcObject = stream;
		console.log(stream);
		video.srcObject = stream;
	}

	const handleError = (error) => {
		console.log(`Error: ${error.message}, ${error.name}`);
	}

	useEffect(() => {
		const video = document.getElementById('videoplayer');
		navigator.mediaDevices.getUserMedia(constraints).then((stream) => handleSuccess(stream, video)).catch(handleError);
	}, []);

	return (<div className="container">
		<video id="videoplayer" playsInline={true} autoPlay={true}>
		</video>
	</div>);
}

ReactDOM.render(<App/>, document.getElementById('root'));
