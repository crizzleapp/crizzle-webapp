import React from "react"
import {Link} from "react-router-dom"
import Image from "react-bootstrap/Image"
// import Button from "react-bootstrap/Button"
import Button from "@material-ui/core/Button"

const logoPath = `${process.env.PUBLIC_URL}/logo-primary.png`;

function Dashboard() {
    return (
        <div>
            <h1>Under Construction</h1>
            <p className="lead"><Image alt="Crizzle logo" src={logoPath} style={{height: "1.2em"}}/><code> is a work in progress.</code></p>
            <Button component={Link} to="/about" variant="contained" color="primary" size="large">About Crizzle</Button>
        </div>
    );
}

export default Dashboard
