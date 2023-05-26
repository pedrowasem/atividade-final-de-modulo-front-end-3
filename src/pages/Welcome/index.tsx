import React from 'react';

import reactLogo from '/assets/react.svg';
import viteLogo from '/assets/vite.svg';

const Welcome: React.FC = () => {
	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Template app react com Typescript e React Router Dom</h1>
		</div>
	);
};

export default Welcome;
