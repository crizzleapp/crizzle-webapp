import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import {Auth0Provider} from "./components/Auth";


// A function that routes the user to the right place after login.
function onRedirectCallback(appState) {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
}


ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        client_id={process.env.REACT_APP_AUTH0_CLIENTID}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <App/>
    </Auth0Provider>,
    document.getElementById("root"));


serviceWorker.unregister();
