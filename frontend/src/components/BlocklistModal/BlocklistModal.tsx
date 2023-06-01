import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Blocklist } from "../../models/blocklist";
import { useForm } from "react-hook-form";
import { BlocklistInput } from "../../utilities/blocklists-api";
import * as BlocklistAPI from "../../utilities/blocklists-api";

interface BlocklistModalProps {
    onDimiss: () => void,
    onBlocklistSaved: (blocklist: Blocklist) => void,
}

const BlocklistModal = ({onDimiss, onBlocklistSaved}: BlocklistModalProps) => {
    const [inputURLCount, setInputURLCount] = useState<string[]>([]);
    const handleAddInput = () => {
        setInputURLCount([...inputURLCount,'']);
        console.log(inputURLCount);
    }

    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<BlocklistInput>();

    async function onSubmit(input: BlocklistInput) {
        try {
            // const blocklistResponse = await BlocklistAPI.createBlocklist(input)
            console.log(input)
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return ( 
        <Modal show onHide={onDimiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Blocklist
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="blocklistForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="text"
                        placeholder="Name"
                        isInvalid={!!errors.name}
                        {...register("name", { required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL</Form.Label>
                        <Form.Control
                            // as="input"
                            type="URL"
                            placeholder="URL"
                            // key={0}
                            {...register("listOfURL")}
                            />
                            <br />
                        {/* { inputURLCount.map((URL, index) => (
                            <>
                                <Form.Control
                                as="input"
                                type="text"
                                placeholder="URL"
                                key={index}
                                {...register("listOfURL")}
                                />
                                <br />
                            </>
                        ))

                        } */}

                    </Form.Group>
                    <Button onClick={handleAddInput}>+</Button>
                </Form>
                <Modal.Footer>
                    <Button
                    type="submit"
                    form="blocklistForm"
                    disabled={isSubmitting}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
     );
}
 
export default BlocklistModal;