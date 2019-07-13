import React from "react";
import {useAuth0} from "../react-auth0-wrapper";
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-primary ">
            <Link className="navbar-brand" to="/">Crizzle</Link>
        </nav>
    );
}

export default NavBar;
