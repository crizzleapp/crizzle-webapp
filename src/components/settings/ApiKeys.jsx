import React, {useState, useEffect} from "react"
import update from 'immutability-helper'
import {useAuth0} from "../auth/Auth"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Spinner from "react-bootstrap/Spinner"
import Table from "react-bootstrap/Table"
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa"

import { CodeBlock, dracula } from 'react-code-blocks'

function ApiKeyRow(props) {
    let {data} = props;
    console.log(data);
    return (
        <tr>
            <td className="text-left">{data.service}</td>
            <td className="text-left">{data.name}</td>
            <td className="text-left">
                <CodeBlock
                    text={JSON.stringify(data.key, null, 2)}
                    language="javascript"
                    theme={dracula}
                    wrapLines
                    showLineNumbers
                />
            </td>
            <td className="text-right">
                <ButtonGroup size="sm">
                    <Button variant="outline-warning">
                        <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-danger">
                        <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}

function ApiKeys() {
    const {loading, user, managementRequest} = useAuth0();
    const [modalOpen, setModalOpen] = useState(false);
    const [apiKeys, setApiKeys] = useState([]);
    const [apiKeysChanged, setApiKeysChanged] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    function dummyPatchApiKey() {
        return managementRequest({
            endpoint: `users/${user.sub}`,
            method: "PATCH",
            data: {
                "user_metadata": {
                    apiKeys: [
                        {
                            service: "Binance",
                            name: "Binance (Read Only)",
                            key: {
                                key: "867o4t3fd78not4f35no873tf4a5o783t",
                                secret: "b796325v497b6234f7vhg8sfd76vh8sdf7h6bg"
                            }
                        }
                    ]
                }
            }
        }).then((data) => {
            setApiKeysChanged(true);
            return data.user_metadata
        })
    }

    useEffect(() => {
        if (!loading && user) {
            dummyPatchApiKey()
        }
    }, []);

    const fetchApiKeys = async () => {
        return managementRequest({
            endpoint: `users/${user.sub}`,
            method: "GET"
        }).then((data) => {
            let keys = data.user_metadata.apiKeys;
            setApiKeys(keys);
            setApiKeysChanged(false);
            return keys
        })
    };
    useEffect(() => {
        if (apiKeysChanged) {
            fetchApiKeys().then((keys) => {
                console.log(keys)
            })
        }
    }, [apiKeysChanged]);

    return (
        <>
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
                {
                    apiKeys.map((apiKey, idx) => {
                        return <ApiKeyRow data={apiKey} key={idx}/>
                    })
                }
                </tbody>
            </Table>
            <Button variant="outline-success" onClick={openModal}>Add API Key</Button>
            <Modal show={modalOpen} onHide={closeModal}>
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