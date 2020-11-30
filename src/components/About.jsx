import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function About() {
    return (
        <div>
            <Image src={logoPath}/>
            <p className="lead">Is under construction, with an undefined timeline. Check back in a few months or decades maybe?</p>
            <Link to="/"><Button size="lg">Go Home</Button></Link>
        </div>
    );
}

export default About;
