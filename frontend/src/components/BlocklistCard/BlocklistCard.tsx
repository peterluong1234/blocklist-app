import styles from "../BlocklistCard/BlocklistCard.module.css";
import { Card } from "react-bootstrap";
import { Blocklist as BlocklistModel} from "../../models/blocklist";

interface BlocklistProps {
    blocklist: BlocklistModel,
    className?: string,
}

const BlocklistCard = ({ blocklist, className }: BlocklistProps) => {
    const {
        name,
        listOfURL,
        createdAt,
        updatedAt,
    } = blocklist;
    return(
        <Card className={`${styles.blocklist} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {blocklist.name}
                </Card.Title>
                {
                        listOfURL?.map((URL, idx) => (
                            <Card.Text key={idx}>
                                {URL}
                            </Card.Text>
                        ))
                }
            </Card.Body>
        </Card>
    )
}

export default BlocklistCard;