import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function About() {
    return (
        <div>
            <Image src={logoPath}/>
            <p className="lead">Is an algorithmic trading bot service.</p>
            <Link to="/"><Button size="lg">Go Home</Button></Link>
        </div>
    );
}

export default About;
