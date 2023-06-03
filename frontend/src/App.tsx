import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Blocklist from './components/Blocklist/Blocklist';
import ViewEditBlocklist from './components/ViewEditBlocklist/ViewEditBlocklist';
import NavBar from './components/NavBar/NavBar';
import AuthPage from './pages/AuthPage/AuthPage';
import { getUser } from './utilities/users-service';
import { User } from './models/user';


function App() {
	const [user, setUser] = useState<User | null>(getUser());
	
	// console.log(user);

	return (
		<>
			<NavBar setUser={setUser} user={user}/>
			{
				user ?
					<div>
						<Routes>
							<Route path="/" element={<Blocklist />} />
							<Route path="/:blocklistId" element={<ViewEditBlocklist />} />
						</Routes>
					</div>
					:
					<AuthPage setUser={setUser} />
			}
		</>
	);
}

export default App;
