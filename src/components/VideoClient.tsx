import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './sass/VideoClient.scss';

const DisplayVideo = ({updateHidden, toggleHidden}) => {
	
	const toggleVideo = async () => {
		await updateHidden(true);
		await toggleHidden();
	}

	return (<div className="videobutton" onClick={toggleVideo}>
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-video" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
  <rect x="3" y="6" width="12" height="12" rx="2" />
</svg>
</div>);
}

const HideVideo = ({updateHidden, toggleHidden}) => {
	
	const toggleVideo = async () => {
		await updateHidden(false);
		await toggleHidden();
	}

	return (<div className="videobutton" onClick={toggleVideo}>
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-video-off" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="3" y1="3" x2="21" y2="21" />
  <path d="M15 11v-1l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -.675 .946" />
  <path d="M10 6h3a2 2 0 0 1 2 2v3m0 4v1a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h1" />
</svg>
</div>);
}

const Muted = ({updateMuted, toggleMute}) => {
	
	const toggleSound = async () => {
		await updateMuted(false);
		await toggleMute();
	}

	return (<div className="soundbutton" onClick={toggleSound}>
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume-3" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
  <path d="M16 10l4 4m0 -4l-4 4" />
</svg>
</div>);
}

const Unmuted = ({updateMuted, toggleMute}) => {
	
	const toggleSound = async () => {
		await updateMuted(true);
		await toggleMute();
	}

	return(<div className="soundbutton" onClick={toggleSound}>
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 8a5 5 0 0 1 0 8" />
  <path d="M17.7 5a9 9 0 0 1 0 14" />
  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
</svg>
</div>);
}

const VideoController = ({constraints, updateConstraints}) => {
	
	const [muted, updateMuted] = useState(false);
	const [hidden, updateHidden] = useState(false);

	const toggleMute = async () => {
		constraints["audio"] ? await updateConstraints({audio: false, video: !hidden}) : await updateConstraints({audio: true, video: !hidden});
	}

	const toggleHidden = async () => {
		constraints["video"] ? await updateConstraints({audio: !muted, video: false}) : await updateConstraints({audio: !muted, video: true});
	}

	return (<div className="videocontroller">
		{muted ? <Muted updateMuted={updateMuted} toggleMute={toggleMute}/> : <Unmuted updateMuted={updateMuted} toggleMute={toggleMute}/>}
		{hidden ? <HideVideo updateHidden={updateHidden} toggleHidden={toggleHidden}/> : <DisplayVideo updateHidden={updateHidden} toggleHidden={toggleHidden}/>}
	</div>);
}

const VideoClient = () => {

	const [socket, updateSocket] = useState(io());
	const [localConnection, updateLocalConnection] = useState(null);
	const [dataChannel, updateDataChannel] = useState(null);
	const [serverConfig, updateServerConfig] = useState(null);
	const [constraints, updateConstraints] = useState({audio: true, video: true});
	
	useEffect(() => {
		// grab video element
		const video = document.getElementById('videoplayer');
		// display local video stream
		navigator.mediaDevices.getUserMedia(constraints).then((stream) => displayLocalFeed(stream, video)).catch(handleError);
		// return list of Twilio STUN/TURN servers for establishing RTC Peer Connections
		configureServer();
	}, [constraints]);

	const configureServer = async () => {
		const t = await fetch('/gettoken', {method: 'GET', headers: {'Content-Type': 'json/application'}});
		const data = await t.json();
		console.log(data.iceServers);
		updateServerConfig(data.iceServers);
		console.log('Ice candidates updated.');
		updateLocalConnection(new RTCPeerConnection({iceServers: [data.iceServers[0]]}));
	}

	const connectPeer = async () => {
		// FIXME: send with socket io to server
		// create an SDP offer
		const offer = await localConnection.createOffer();
		// set local description
		await localConnection.setLocalDescription(offer);
		console.log('Emitting');
		socket.connect('http://192.168.1.46:5555');
		socket.on('answer', data => {
			console.log(data);
		});
		socket.emit('offer', { offer });
	}

	const displayLocalFeed = async (stream, video) => {
		// insert stream into video tag
		video.srcObject = stream;
		// console.log(stream.getTracks());
	}

	const handleError = (error) => {
		console.log(`Error: ${error.message}, ${error.name}`);
	}

	const dataChannelOpen = () => {
		console.log('channel opened');
	}

	const dataChannelClose = () => {
		console.log('channel closed');
	}

	const send = () => {
		connectPeer();
	}
	
	const dat = () => {
		console.log(dataChannel);
		dataChannel.send(JSON.stringify({"hello":"there"}));
	}

	//socket.on('broadcast', n => {
	//	console.log(n);
	//});

	return (<div className="container">
		<video id="videoplayer" playsInline={true} autoPlay={true}></video>
		<VideoController constraints={constraints} updateConstraints={updateConstraints}/>
		<button onClick={send}>Open Local Connection</button>
		<button onClick={dat}>Send Over Channel</button>
	</div>);
}

export {
	VideoClient
}
