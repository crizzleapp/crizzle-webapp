import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";

const logo = require("../assets/crizzle_logo.png");

function About() {
    return (
        <div>
            <Image src={logo}/>
            <p className="lead">Is an algorithmic trading bot service.</p>
            <Link to="/" className="btn btn-lg btn-dark btn-outline-light text-white">Go Home</Link>
        </div>
    );
}

export default About;
