import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blocklist from './components/Blocklist/Blocklist';
import ViewEditBlocklist from './components/ViewEditBlocklist/ViewEditBlocklist';

function App() {


	return (
		<Routes>
			<Route path="/" element={<Blocklist />}	/>
			<Route path="/:blocklistId" element={<ViewEditBlocklist />} />
		</Routes>
	);
}

export default App;
