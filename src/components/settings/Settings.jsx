import React from "react"
import {useAuth0} from "../auth/Auth"
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

import Profile from "./Profile"
import ApiKeys from "./ApiKeys"

function Settings() {
    const tabs = [
        {name: "Profile", component: <Profile/>},
        {name: "API Keys", component: <ApiKeys/>},
    ];

    return (
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="Profile">
                <Row className="mb-4">
                    <Col>
                        <Nav.Item><h3>Settings</h3></Nav.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Nav justify variant="pills" className="flex-row">
                            {tabs.map(({name: tabName}) => (
                                <Nav.Item><Nav.Link eventKey={tabName}>{tabName}</Nav.Link></Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            {tabs.map(({name: tabName, component: tabComponent}) => (
                                <Tab.Pane eventKey={tabName} title={tabName}>{tabComponent}</Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default Settings;
