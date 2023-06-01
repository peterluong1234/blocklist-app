import React, { useEffect, useState } from 'react';
import './App.css';
import { Blocklist as BlocklistModel } from './models/blocklist';
import Blocklist from './components/Blocklist/Blocklist';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./pages/BlocklistPage/BlocklistPage.module.css";
import * as BlocklistsAPI from "./utilities/blocklists-api";
import BlocklistModal from './components/BlocklistModal/BlocklistModal';
import AddBlocklist from './components/AddBlocklist/AddBlocklist';

function App() {
	const [blocklists, setBlocklists] = useState<BlocklistModel[]>([]);
	const [showBlocklistModal, setShowBlocklistModal] = useState(false);

	useEffect(() => {
		async function loadBlocklists() {
			try {
				const blocklists = await BlocklistsAPI.fetchBlocklist();
				setBlocklists(blocklists);
			} catch (error) {
				console.error(error);
				alert(error);
			}
		}
		loadBlocklists();
	}, []);

	return (
		<Container>
			<Row xs={1} md={2} xl={3} className="g-4">
			{blocklists.map(blocklist => (
				<Col key={blocklist._id}>
				 <Blocklist blocklist={blocklist} className={styles.blocklist}/>
				</Col>
			))}
			</Row>
			<AddBlocklist />
			{/* {
				showBlocklistModal &&
				<BlocklistModal 
					onDimiss={() => setShowBlocklistModal(false)}
					onBlocklistSaved={() => {}}
				/>
			} */}
		</Container>
	);
}

export default App;
