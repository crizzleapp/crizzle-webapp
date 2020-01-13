import React from "react"
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab"

import Profile from "./Profile"
import ApiKeys from "./ApiKeys"

function Settings(props) {
    const tabs = [
        {name: "API Keys", component: <ApiKeys/>},
        {name: "Profile", component: <Profile/>},
    ];

    const onTabChange = (route) => {
        // props.history.push(route)
    };

    return (
        <Container>
            <Tabs justify variant="pills" defaultActiveKey={tabs[0].key} onSelect={onTabChange}>
                {
                    tabs.map((tab, i) => (
                        <Tab eventKey={i} key={i} title={tab.name}>
                            {tab.component}
                        </Tab>
                    ))
                }
            </Tabs>
        </Container>
    );
}

export default Settings;
