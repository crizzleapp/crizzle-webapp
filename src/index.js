import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import {Auth0Provider} from "./components/auth/Auth";
import {ApiKeyProvider} from "./components/helpers/ApiKeyManager";

ReactDOM.render(
    <Auth0Provider>
        <ApiKeyProvider>
            <App/>
        </ApiKeyProvider>
    </Auth0Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
