import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blocklist from './components/Blocklist/Blocklist';
import ViewEditBlocklist from './components/ViewEditBlocklist/ViewEditBlocklist';
import NavBar from './components/NavBar/NavBar';

function App() {
	const [user, setUser] = useState({
		userName: 'pl1234',
		email: 'pl@gmail.com',
	});

	return (
		<>
			<NavBar />
			<div>
				<Routes>
					<Route path="/" element={<Blocklist />} />
					<Route path="/:blocklistId" element={<ViewEditBlocklist />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
