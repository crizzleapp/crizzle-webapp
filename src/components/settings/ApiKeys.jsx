import React, {useState, useEffect, useRef} from "react"

import {useAuth0} from "../auth/Auth"
import {useApiKeyManager} from "../helpers/ApiKeyManager"
import {Breakpoint} from 'react-socks'

import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Table from "react-bootstrap/Table"

import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa"
import {Formik} from 'formik'
import * as yup from 'yup'
import ReactJson from 'react-json-view'

function ApiKeyRow({name, apiKey}) {
    const {user, managementRequest} = useAuth0();
    const {updateApiKey, deleteApiKey} = useApiKeyManager();
    const [{name: originalName, apiKey: originalApiKey}, setOriginalApiKey] = useState({name, apiKey});
    const [{name: localName, apiKey: localApiKey}, setLocalApiKey] = useState({name, apiKey});

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const openViewModal = () => setViewModalOpen(true);
    const closeViewModal = () => setViewModalOpen(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const startEdit = () => {
        setEditModalOpen(true);
        console.log("Starting edit");
    };
    const onLocalChange = ({updated_src}) => {
        apiKey.data = updated_src;
        console.log("Updated local");
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
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
    const startDelete = () => {
        setDeleteModalOpen(true);
    };
    const confirmDelete = () => {
        deleteApiKey(name);
        setDeleteModalOpen(false);
    };
    const handleDeleteFormChange = (event) => {
        setDeleteButtonDisabled(event.target.value !== name);
    };
    const cancelDelete = () => {
        setDeleteModalOpen(false);
    };

    const topLevelKeys = Object.keys(apiKey.data);

    return (
        <>
            <tr>
                <td className="align-middle text-left">{name}</td>
                <td className="align-middle text-left">{apiKey.service}</td>
                <td className="align-middle text-center">
                    {
                        topLevelKeys.map((key, i) => (
                            <Badge pill variant="light" className="mx-1" key={key}>{key}</Badge>
                        ))
                    }
                </td>
                <td className="align-middle text-right">
                    <ButtonGroup>
                        <Button variant="outline-success" className="mr-2" onClick={openViewModal}>
                            <FaEye style={{verticalAlign: "baseline"}}/>
                        </Button>
                        <Button variant="outline-warning" className="mr-2" onClick={startEdit}>
                            <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                        </Button>
                        <Button variant="outline-danger" className="mr-2" onClick={startDelete}>
                            <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                        </Button>
                    </ButtonGroup>
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
                            <Form.Control onChange={handleDeleteFormChange} role="text"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={cancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete} disabled={deleteButtonDisabled}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ApiKeys() {
    const {user, loading} = useAuth0();
    const {apiKeys, startAdd, cancelAdd, confirmAdd} = useApiKeyManager();
    const [services, setServices] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const startAddApiKey = () => {
        setModalOpen(true);
        startAdd();
    };
    const confirmAddApiKey = ({name, service}) => {
        confirmAdd(name, {service, data: {}});
        setModalOpen(false);
    };
    const cancelAddApiKey = () => {
        cancelAdd();
        setModalOpen(false);
    };
    const schema = yup.object().shape({
        name: yup.string().required().min(3).max(64),
        service: yup.string().required()
    });

    useEffect(() => {
        setServices([
            "Binance",
            "Poloniex",
            "Twitter",
        ]);
    }, []);

    return (
        <>
            <Table responsive hover striped variant="dark">
                <thead>
                <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Service</th>
                    <th className="text-center">Top-Level Keys</th>
                    <th className="text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(apiKeys).map(([name, apiKey]) => {
                        return (<ApiKeyRow apiKey={apiKey} name={name} key={name}/>)
                    })
                }
                </tbody>
            </Table>
            <Button variant="outline-success" onClick={startAddApiKey}>Add API Key</Button>
            <Modal show={modalOpen} onHide={cancelAddApiKey}>
                <Modal.Header closeButton><h4>New API Key</h4></Modal.Header>
                <Formik
                    onSubmit={confirmAddApiKey}
                    initialValues={{name: '', service: services[0]}}
                    validationSchema={schema}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group controlId="newApiKeyName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        isValid={touched.name && !errors.name}
                                    />
                                    <Form.Control.Feedback>Good to go!</Form.Control.Feedback>
                                    {/*<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>*/}
                                    <Form.Text>A name for your new API Key</Form.Text>
                                </Form.Group>
                                <Form.Group controlId="newApiKeyService">
                                    <Form.Label>Service</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="service"
                                        value={values.service}
                                        onChange={handleChange}
                                        // isValid={!errors.service}
                                    >
                                        {
                                            services.map((service, i) => (
                                                <option key={i}>{service}</option>
                                            ))
                                        }
                                    </Form.Control>
                                    <Form.Text>The service that this API Key belongs to</Form.Text>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={cancelAddApiKey}>Cancel</Button>
                                <Button variant="success" type="submit">Submit</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

export default ApiKeys;