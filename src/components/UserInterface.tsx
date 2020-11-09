import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { VideoClient } from './VideoClient';
import './sass/UserInterface.scss';

const ModeSelector = () => {
	return (<div className="modeselector">
		{"mode selector"}
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
