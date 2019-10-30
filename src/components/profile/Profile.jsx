import React, {Component} from 'react';
import auth0Client from '../Auth';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
        };
        this.details = [
            {key: 'name', name: 'Name', readOnly: true},
            {key: 'email', name: "E-mail Address", readOnly: false},]
        ;
    }

    async componentDidMount() {
        this.setState({profile: auth0Client.getProfile()});
    }

    render() {
        let {profile} = this.state;
        let profileRows;

        if (profile === null) {
            profileRows = <tr>
                <td>Loading...</td>
            </tr>;
        } else {
            console.log(profile);
            profileRows = this.details.map(function (row, idx) {
                let editable = !row.readOnly;
                return (
                    <tr key={idx}>
                        <td>{row.name}</td>
                        <td>{profile[row.key]}</td>
                        <td>
                            <ButtonGroup>
                                <Button variant="dark" size="sm" disabled={!editable}>Edit</Button>
                                <Button variant="danger" size="sm" disabled={!editable}>Delete</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            });
        }

        return (
            <Container>
                <h1>User Profile</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {profileRows}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Profile;
