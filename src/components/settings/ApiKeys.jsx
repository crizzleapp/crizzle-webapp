import React, {useState} from "react";
import {useAuth0} from "../auth/Auth";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa";

function ApiKeyRow() {
    return (
        <tr>
        </tr>
    )
}

function ApiKeys() {
    const {loading, user, managementRequest} = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    if (!loading && user) {
        managementRequest({
            endpoint: `users/${user.sub}`,
            method: "PATCH",
            data: {
                "user_metadata": {
                    apiKeys: [
                        {service: "Binance", key: "867o4t3fd78not4f35no873tf4a5o783t"}
                    ]
                }
            }
        });
    }

    return (
        <>
            <h1>API Keys</h1>
            <Table hover striped variant="dark">
                <thead>
                <tr>
                    <th className="text-left">Service</th>
                    <th className="text-left">Name</th>
                    <th className="text-right">Value</th>
                    <th className="text-right">Actions</th>
                </tr>
                </thead>

                <tbody>

                </tbody>
            </Table>
            <Button variant="outline-success" onClick={openModal}>Add API Key</Button>
            <Modal centered show={modalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <h4>New API Key</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>Cancel</Button>
                    <Button variant="success">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ApiKeys;