import React, {useState, useEffect, useRef} from "react"
import {useApiKeyManager} from "../helpers/ApiKeyManager"

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

const noop = () => {
};

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const AddApiKeyModal = ({show, onCancel = noop, onConfirm = noop}) => {
    const {updateApiKey} = useApiKeyManager();
    const [services, setServices] = useState([]);
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
    const cancelAdd = () => {
        onCancel();
    };
    const confirmAdd = ({name, service}) => {
        updateApiKey(name, {service, data: {}});
        onConfirm();
    };
    return (
        <Modal show={show} onHide={cancelAdd}>
            <Modal.Header closeButton><h4>New API Key</h4></Modal.Header>
            <Formik
                onSubmit={confirmAdd}
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
                            <Button variant="outline-danger" onClick={cancelAdd}>Cancel</Button>
                            <Button variant="success" type="submit">Submit</Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
};

const ViewApiKeyModal = ({name, apiKey, show, onCancel = noop}) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton><h4>{name}</h4></Modal.Header>
            <Modal.Body>
                <ReactJson src={apiKey.data} theme="monokai" name={null} displayDataTypes={false}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onCancel}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

const EditApiKeyModal = ({name, apiKey, show, onStart = noop, onCancel = noop, onChange = noop, onConfirm = noop}) => {
    const {updateApiKey} = useApiKeyManager();
    const previousShow = usePrevious(show);
    // startEdit
    useEffect(() => {
        if (!previousShow && show) {
            onStart();
            // TODO: startEdit here
        }
    }, [previousShow, show, onStart]);
    const handleFormChange = ({updated_src}) => {
        apiKey.data = updated_src;
        onChange();
    };
    const cancelEdit = () => {
        onCancel();
    };
    const confirmEdit = () => {
        updateApiKey(name, apiKey);
        onConfirm();
    };
    return (
        <Modal show={show} onHide={cancelEdit}>
            <Modal.Header closeButton><h4>Edit API Key - "{name}"</h4></Modal.Header>
            <Modal.Body>
                <ReactJson
                    src={apiKey.data}
                    theme="monokai"
                    name={null}
                    displayDataTypes={false}
                    onEdit={handleFormChange}
                    onAdd={handleFormChange}
                    onDelete={handleFormChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={cancelEdit}>Cancel</Button>
                <Button variant="success" onClick={confirmEdit}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
};

const DeleteApiKeyModal = ({name, show, onCancel = noop, onConfirm = noop}) => {
    const {deleteApiKey} = useApiKeyManager();
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
    const handleFormChange = (event) => {
        setDeleteButtonDisabled(event.target.value !== name);
    };
    const cancelDelete = () => {
        onCancel();
    };
    const confirmDelete = () => {
        deleteApiKey(name);
        onConfirm();
    };
    return (
        <Modal show={show} onHide={cancelDelete}>
            <Modal.Header closeButton><h4>You are about to delete "{name}"</h4></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>To proceed, type the name of the API Key (exactly) below:</Form.Label>
                        <Form.Control onChange={handleFormChange} role="text"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={cancelDelete}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete} disabled={deleteButtonDisabled}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
};

function ApiKeyRow({name, apiKey}) {
    const topLevelKeys = Object.keys(apiKey.data);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const openViewModal = () => setViewModalOpen(true);
    const closeViewModal = () => setViewModalOpen(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const openEditModal = () => {
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

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
                        <Button variant="outline-success" className="mr-2" onClick={openViewModal} aria-label={`view ${name}`}>
                            <FaEye style={{verticalAlign: "baseline"}}/>
                        </Button>
                        <Button variant="outline-warning" className="mr-2" onClick={openEditModal} aria-label={`edit ${name}`}>
                            <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                        </Button>
                        <Button variant="outline-danger" className="mr-2" onClick={openDeleteModal} aria-label={`delete ${name}`}>
                            <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
            <ViewApiKeyModal
                name={name}
                apiKey={apiKey}
                show={viewModalOpen}
                onCancel={closeViewModal}
            />
            <EditApiKeyModal
                name={name}
                apiKey={apiKey}
                show={editModalOpen}
                onCancel={closeEditModal}
                onConfirm={closeEditModal}
            />
            <DeleteApiKeyModal
                name={name}
                apiKey={apiKey}
                show={deleteModalOpen}
                onCancel={closeDeleteModal}
                onConfirm={closeDeleteModal}
            />
        </>
    );
}

function ApiKeys() {
    const {apiKeys} = useApiKeyManager();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
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
            <Button variant="outline-success" onClick={openModal}>Add API Key</Button>
            <AddApiKeyModal show={modalOpen} onCancel={closeModal} onConfirm={closeModal}/>
        </>
    )
}

export default ApiKeys;