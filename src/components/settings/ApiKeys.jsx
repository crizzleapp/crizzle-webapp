import React, {useState, useEffect, useCallback} from "react"
import {useAuth0} from "../auth/Auth"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa"
import {CodeBlock, dracula} from 'react-code-blocks'

function ApiKeyRow(props) {
    let {data} = props;
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const openViewModal = () => setViewModalOpen(true);
    const closeViewModal = () => setViewModalOpen(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const openDeleteModal = () => setDeleteModalOpen(true);
    const closeDeleteModal = () => setDeleteModalOpen(false);

    return (
        <>
            <tr>
                <td className="align-middle text-left">{data.service}</td>
                <td className="align-middle text-left">{data.name}</td>
                <td className="align-middle text-left">
                    <CodeBlock
                        text={JSON.stringify(data.key, null, 2)}
                        language="javascript"
                        theme={dracula}
                        wrapLines
                        showLineNumbers
                    />
                </td>
                <td className="align-middle text-right">
                    <Button variant="outline-success" className="mr-2" onClick={openViewModal}>
                        <FaEye style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-warning" className="mr-2" onClick={openEditModal}>
                        <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-danger" className="mr-2" onClick={openDeleteModal}>
                        <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                </td>
            </tr>
            <Modal show={viewModalOpen} onHide={closeViewModal}>
                <Modal.Header closeButton><h4>{data.name}</h4></Modal.Header>
                <Modal.Body><p>View API Key</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={openEditModal}>Edit</Button>
                    <Button variant="success" onClick={closeViewModal}>OK</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={editModalOpen} onHide={closeEditModal}>
                <Modal.Header closeButton><h4>{data.name}</h4></Modal.Header>
                <Modal.Body><p>Edit API Key</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={closeEditModal}>Cancel</Button>
                    <Button variant="warning" onClick={() => {
                    }}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteModalOpen} onHide={closeDeleteModal}>
                <Modal.Header closeButton><h4>{data.name}</h4></Modal.Header>
                <Modal.Body><p>Edit API Key</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={() => {
                    }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function ApiKeys() {
    const {user, managementRequest} = useAuth0();
    const [apiKeys, setApiKeys] = useState([]);
    const [apiKeysChanged, setApiKeysChanged] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const fetchApiKeys = useCallback(() => {
        return managementRequest({
            endpoint: `users/${user.sub}`,
            method: "GET"
        }).then((data) => {
            let keys = data.user_metadata["apiKeys"];
            setApiKeys(keys);
            setApiKeysChanged(false);
            return keys
        })
    }, [managementRequest, user]);
    useEffect(() => {
        if (apiKeysChanged) {
            fetchApiKeys()
        }
    }, [apiKeysChanged, fetchApiKeys]);

    return (
        <>
            <Table hover striped variant="dark">
                <thead>
                <tr>
                    <th className="text-left">Service</th>
                    <th className="text-left">Name</th>
                    <th className="text-center">Value</th>
                    <th className="text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    apiKeys.map((apiKey, idx) => {
                        return <ApiKeyRow data={apiKey} key={idx}/>
                    })
                }
                </tbody>
            </Table>
            <Button variant="outline-success" onClick={openModal}>Add API Key</Button>
            <Modal show={modalOpen} onHide={closeModal}>
                <Modal.Header closeButton><h4>New API Key</h4></Modal.Header>
                <Modal.Body><p>Add API Key</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>Cancel</Button>
                    <Button variant="success">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ApiKeys;