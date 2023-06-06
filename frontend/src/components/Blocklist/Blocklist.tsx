import React, { useEffect, useState } from 'react';
import { Blocklist as BlocklistModel } from '../../models/blocklist';
import BlocklistCard from '../BlocklistCard/BlocklistCard';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "../../pages/BlocklistPage/BlocklistPage.module.css"
import * as BlocklistsAPI from "../../utilities/blocklists-api";
import AddBlocklist from '../AddBlocklist/AddBlocklist';
import { Link } from 'react-router-dom';
import * as usersService from "../../utilities/users-service";
import { User } from '../../models/user';

interface BlocklistProps {
    user: User
}

const Blocklist = ({ user }: BlocklistProps) => {
const [blocklists, setBlocklists] = useState<BlocklistModel[]>([]);

useEffect(() => {
    async function loadBlocklists() {
        try {
            const blocklists = await BlocklistsAPI.fetchBlocklist(user._id);
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
                        <Link className={styles.link} to={`/${blocklist._id}`}>
                            <BlocklistCard blocklist={blocklist} className={styles.blocklist}/>
                        </Link>
				</Col>
			))}
			</Row>
			<AddBlocklist user={user}/>
            {/* <button onClick={handleCheckToken}>Check when my login expires</button> */}
		</Container>
)
}

export default Blocklist;