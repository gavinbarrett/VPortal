import React, { useEffect } from 'react';
import './sass/VideoClient.scss';

const VideoClient = () => {

	const constraints = {
		audio: true,
		video: true
	};
	
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
	}, []);

	return (<div className="container">
		<video id="videoplayer" playsInline={true} autoPlay={true}>
		</video>
	</div>);
}

export {
	VideoClient
}
