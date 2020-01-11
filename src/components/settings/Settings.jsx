import React from "react";
import {useAuth0} from "../auth/Auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa";

function Settings() {
    const {user} = useAuth0();

    return (
        <>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                    <Card/>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <Card/>
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    <Card/>
                </Tab>
            </Tabs>
        </>
    );
}

export default Settings;
