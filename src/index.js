import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import {Auth0Provider} from "./components/auth/Auth";

ReactDOM.render(
    <Auth0Provider>
        <App/>
    </Auth0Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
