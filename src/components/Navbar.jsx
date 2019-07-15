import React from "react";
import {Link, withRouter} from "react-router-dom";
import auth0Client from './Auth';

function NavBar(props) {
    function signOut() {
        auth0Client.signOut();
        props.history.replace('/');
    }

    return (
        <nav className="navbar navbar-fixed-top navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">Crizzle</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLinks"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarLinks">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/questions">Questions</Link>
                    </li>
                </ul>
                {
                    !auth0Client.isAuthenticated() &&
                    <button className="btn btn-outline-light" onClick={auth0Client.signIn}>Sign In</button>
                }
                {
                    auth0Client.isAuthenticated() &&
                    <div>
                        <label className="mr-2">{auth0Client.getProfile().name}</label>
                        <button className="btn btn-outline-light" onClick={signOut}>Sign Out</button>
                    </div>
                }
            </div>
        </nav>
    );
}

export default withRouter(NavBar);
