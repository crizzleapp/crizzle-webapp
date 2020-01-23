import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function UnderConstruction() {
    return (
        <div>
            <h1>Under Construction</h1>
            <p className="lead"><Image alt="Crizzle logo" src={logoPath} style={{height: "1.2em"}}/><code> is a work in progress.</code></p>
            <Link to="/about"><Button size="lg">About Crizzle</Button></Link>
        </div>
    );
}

export default UnderConstruction;
