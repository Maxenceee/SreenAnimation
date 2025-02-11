import { scan } from 'react-scan';

scan({
	log: false,
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AprilFool } from './AprilFool';

const App = () => {
	return (
		<AprilFool />
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
