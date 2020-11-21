import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { VideoClient } from './VideoClient';
import './sass/UserInterface.scss';

const SettingsButton = () => {
	return (<div className="modebutton">
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
  <circle cx="12" cy="12" r="3" />
</svg>
</div>);
}

const FriendsButton = () => {
	return (<div className="modebutton">
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="9" cy="7" r="4" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
</svg>
</div>);
}

const TextChatButton = () => {
	return (<div className="modebutton">
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
  <line x1="12" y1="12" x2="12" y2="12.01" />
  <line x1="8" y1="12" x2="8" y2="12.01" />
  <line x1="16" y1="12" x2="16" y2="12.01" />
</svg>
</div>);
}

const VideoChatButton = () => {
	return (<div className="modebutton">
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-video" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
  <rect x="3" y="6" width="12" height="12" rx="2" />
</svg>
</div>);
}

const ModeSelector = () => {
	return (<div className="modeselector">
		<VideoChatButton/>
		<TextChatButton/>
		<FriendsButton/>
		<SettingsButton/>
	</div>);
}

const UserInterface = () => {
	
	const [page, updatePage] = useState(<VideoClient/>);

	return (<div className="userinterface">
		<ModeSelector/>
		{page}
	</div>);
}

export {
	UserInterface
}
