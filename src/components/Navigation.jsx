import React from "react";
import {Link, NavLink, withRouter} from "react-router-dom";

import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import AccountButton from "./AccountButton";

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function Navigation(props) {
    return (
        <Navbar fixed expand="lg" className="navbar-dark">
            <Navbar.Brand as={Link} to="/">
                <Image style={{height: "2em"}} src={logoPath} alt="Crizzle logo"/>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                    <Nav.Link as={NavLink} to="/questions">Questions</Nav.Link>
                </Nav>
                <Nav>
                    <AccountButton/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Navigation);
