import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import './index.css';
import {BrowserRouter} from "react-router-dom";

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
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , document.getElementById("root"));

serviceWorker.unregister();
