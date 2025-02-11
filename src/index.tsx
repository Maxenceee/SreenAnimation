import { scan } from 'react-scan';

scan({
	log: false,
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AprilFool } from './components/AprilFool';
import { Snowfall } from './components/Snowfall';

const App = () => {
	return (
		<AprilFool />
		// <Snowfall />
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
