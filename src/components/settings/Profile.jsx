import React from "react";
import {useAuth0} from "../auth/Auth";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa";

const FIELDS = [
    {key: "name", name: "Name", readOnly: true},
    {key: "email", name: "E-mail Address", readOnly: false},
];


function Profile() {
    const {user} = useAuth0();
    const profileRows = (user === null) ? (
        <tr>
            <td>Loading...</td>
        </tr>
    ) : (
        FIELDS.map(function (row, idx) {
            let editable = !row.readOnly;
            return (
                <tr key={idx}>
                    <td className="text-left">{row.name}</td>
                    <td className="text-right">{user[row.key]}</td>
                    <td className="text-right">
                        <ButtonGroup size="sm">
                            <Button variant="warning" disabled={!editable}><FaPencilAlt
                                style={{verticalAlign: "baseline"}}/></Button>
                            <Button variant="danger" disabled={!editable}><FaTrashAlt
                                style={{verticalAlign: "baseline"}}/></Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        }));

    return (
        <Container fluid>
            <h1>User Profile</h1>
            <Table>
                <thead>
                <tr>
                    <th className="text-left">Property</th>
                    <th className="text-right">Value</th>
                    <th className="text-right">Actions</th>
                </tr>
                </thead>

                <tbody>
                {profileRows}
                </tbody>
            </Table>
        </Container>
    );
}

export default Profile;
