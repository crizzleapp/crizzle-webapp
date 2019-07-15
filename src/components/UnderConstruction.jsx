import React from "react";
import {Link} from "react-router-dom";

function UnderConstruction() {
    return (
        <div>
            <h1>Under Construction</h1>
            <p className="lead"><code>Crizzle is a work in progress.</code></p>
            <Link to="/" className="btn btn-lg btn-dark btn-outline-light text-white">Learn more</Link>
        </div>
    );
}

export default UnderConstruction;
