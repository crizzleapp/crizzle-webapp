import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const logo = require("../assets/crizzle_logo.png");

function About() {
    return (
        <div>
            <Image src={logo}/>
            <p className="lead">Is an algorithmic trading bot service.</p>
            <Link to="/"><Button size="lg">Go Home</Button></Link>
        </div>
    );
}

export default About;
