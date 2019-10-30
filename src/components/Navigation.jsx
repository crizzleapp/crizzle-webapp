import React from "react";
import {Link, withRouter} from "react-router-dom";
import auth0Client from './Auth';
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const logo = require("../assets/crizzle_logo.png");

function Navigation(props) {
    function signOut() {
        auth0Client.signOut();
        props.history.replace('/');
    }

    return (
        <Navbar expand="sm">
            <Navbar.Brand href="/">
                <Image style={{height: '2em'}} src={logo}/>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/questions">Questions</Nav.Link>
                </Nav>
                {
                    !auth0Client.isAuthenticated() &&
                    <Nav>
                        <Button variant="dark" onClick={auth0Client.signIn}>Sign In</Button>
                    </Nav>
                }
                {
                    auth0Client.isAuthenticated() &&
                    <Nav>
                        <Nav.Link href="/profile">{auth0Client.getProfile().name}</Nav.Link>
                        <Button variant="dark" onClick={signOut}>Sign Out</Button>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Navigation);
