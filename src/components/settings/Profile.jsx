import React from "react";
import {useAuth0} from "../auth/Auth";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa";


function ProfileRow({name: displayName, value, readOnly = true}) {
    const {loading} = useAuth0();
    const spinner = <Spinner animation="border" size="sm"/>;
    const loadingAnimation = (
        <tr>
            <td className="text-left">{spinner}</td>
            <td className="text-right">{spinner}</td>
            <td className="text-right">{spinner}</td>
        </tr>
    );
    return loading ? loadingAnimation : (
        <tr>
            <td className="text-left">
                {displayName}
            </td>
            <td className="text-right">
                {value}
            </td>
            <td className="text-right">
                <ButtonGroup size="sm">
                    <Button variant="outline-warning" disabled={readOnly}>
                        <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-danger" disabled={readOnly}>
                        <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
}


function Profile() {
    const {user} = useAuth0();

    return (
        <Table hover striped variant="dark">
            <thead>
            <tr>
                <th className="text-left"/>
                <th className="text-right"/>
                <th className="text-right">Actions</th>
            </tr>
            </thead>

            <tbody>
            {
                user &&
                <>
                    <ProfileRow name="Name" value={user.name} readOnly/>
                    <ProfileRow name="E-mail Address" value={user.email} readOnly/>
                </>
            }
            </tbody>
        </Table>
    );
}

export default Profile;
