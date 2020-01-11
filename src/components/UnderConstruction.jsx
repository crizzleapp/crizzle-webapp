import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const logo = require("../assets/crizzle_logo.png");

function UnderConstruction() {
    return (
        <div>
            <h1>Under Construction</h1>
            <p className="lead"><Image src={logo} style={{height: "1.2em"}}/><code> is a work in progress.</code></p>
            <Link to="/about"><Button size="lg">Learn more</Button></Link>
        </div>
    );
}

export default UnderConstruction;
