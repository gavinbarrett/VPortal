import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './sass/VideoClient.scss';

const VideoController = ({constraints, updateConstraints}) => {
	
	const toggleMute = async () => {
		constraints["audio"] ? await updateConstraints({audio: false, video: true}) : await updateConstraints({audio: true, video: true});
	}

	return (<div className="videocontroller">
		<button onClick={toggleMute}>Mute</button>
	</div>);
}

const VideoClient = () => {

	const endpoint = 'http://localhost:3000';
	const [socket, updateSocket] = useState(io());
	const [constraints, updateConstraints] = useState({audio: true, video: true});

	const handleSuccess = (stream, video) => {
		// insert stream into video tag
		video.srcObject = stream;
	}

	const handleError = (error) => {
		console.log(`Error: ${error.message}, ${error.name}`);
	}

	useEffect(() => {
		const video = document.getElementById('videoplayer');
		navigator.mediaDevices.getUserMedia(constraints).then((stream) => handleSuccess(stream, video)).catch(handleError);
		socket.connect(endpoint);
	}, [constraints]);

	socket.on('greeting', (data) => {
		console.log(data);
	});

	return (<div className="container">
		<video id="videoplayer" playsInline={true} autoPlay={true}></video>
		<VideoController constraints={constraints} updateConstraints={updateConstraints}/>
	</div>);
}

export {
	VideoClient
}
