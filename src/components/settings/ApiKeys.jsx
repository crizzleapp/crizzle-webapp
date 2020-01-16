import React, {useState, useEffect} from "react"
import {useAuth0} from "../auth/Auth"
import {useApiKeyManager} from "../helpers/ApiKeyManager"
import useUndo from "use-undo"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa"
import ReactJson from 'react-json-view'

function ApiKeyRow({name, apiKey}) {
    const {user, managementRequest} = useAuth0();
    const {updateApiKey, deleteApiKey} = useApiKeyManager();
    const [{present}, {set, reset, undo, redo}] = useUndo(apiKey);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const openViewModal = () => setViewModalOpen(true);
    const closeViewModal = () => setViewModalOpen(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const startEdit = () => {
        setEditModalOpen(true);
    };
    const onLocalChange = ({updated_src}) => {
        apiKey.data = updated_src;
        console.log("Local update!");
        console.log(apiKey);
    };
    const confirmEdit = () => {
        updateApiKey(name, apiKey);
        setEditModalOpen(false);
    };
    const cancelEdit = () => {
        setEditModalOpen(false);
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const startDelete = () => {
        setDeleteModalOpen(true);
    };
    const confirmDelete = () => {
        deleteApiKey(name);
        setDeleteModalOpen(false);
    };
    const cancelDelete = () => {
        setDeleteModalOpen(false);
    };

    return (
        <>
            <tr>
                <td className="align-middle text-left">{name}</td>
                <td className="align-middle text-left">{apiKey.service}</td>
                <td className="align-middle text-left">
                    <ReactJson src={apiKey.data} theme="monokai" collapsed={true} name={null} displayDataTypes={false}/>
                </td>
                <td className="align-middle text-right">
                    <Button variant="outline-success" className="mr-2" onClick={openViewModal}>
                        <FaEye style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-warning" className="mr-2" onClick={startEdit}>
                        <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-danger" className="mr-2" onClick={startDelete}>
                        <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                </td>
            </tr>
            <Modal show={viewModalOpen} onHide={closeViewModal}>
                <Modal.Header closeButton><h4>{name}</h4></Modal.Header>
                <Modal.Body>
                    <ReactJson src={apiKey.data} theme="monokai" name={null} displayDataTypes={false}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={closeViewModal}>Close</Button>
                    <Button variant="warning" onClick={startEdit}>Edit</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={editModalOpen} onHide={cancelEdit}>
                <Modal.Header closeButton><h4>Edit API Key - "{name}"</h4></Modal.Header>
                <Modal.Body>
                    <ReactJson
                        src={apiKey.data}
                        theme="monokai"
                        name={null}
                        displayDataTypes={false}
                        onEdit={onLocalChange}
                        onAdd={onLocalChange}
                        onDelete={onLocalChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={cancelEdit}>Cancel</Button>
                    <Button variant="success" onClick={confirmEdit}>Save</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteModalOpen} onHide={cancelDelete}>
                <Modal.Header closeButton><h4>You are about to delete "{name}"</h4></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>To proceed, type the name of the API Key (exactly) below:</Form.Label>
                            <Form.Control role="text"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={cancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ApiKeys() {
    const {user, loading} = useAuth0();
    const {apiKeys} = useApiKeyManager();
    const [services, setServices] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const startAdd = () => {
        setModalOpen(true);
    };
    const confirmAdd = () => {
        setModalOpen(false);
    };
    const cancelAdd = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setServices([
            "Binance",
            "Poloniex",
            "Twitter",
        ]);
    }, []);

    return (
        <>
            <Table hover striped variant="dark">
                <thead>
                <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Service</th>
                    <th className="text-center">Value</th>
                    <th className="text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(apiKeys).map(([name, data]) => {
                        return (<ApiKeyRow apiKey={data} name={name} key={name}/>)
                    })
                }
                </tbody>
            </Table>
            <Button variant="outline-success" onClick={startAdd}>Add API Key</Button>
            <Modal show={modalOpen} onHide={cancelAdd}>
                <Modal.Header closeButton><h4>New API Key</h4></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control/>
                            <Form.Text>A name for your new API Key</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Service</Form.Label>
                            <Form.Control as="select" multiple>
                                {
                                    services.map((service, i) => (
                                        <option key={i}>{service}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Text>The service that this API Key belongs to</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={cancelAdd}>Cancel</Button>
                    <Button variant="success" onClick={confirmAdd}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ApiKeys;