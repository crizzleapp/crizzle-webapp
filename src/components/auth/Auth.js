import React, {useState, useEffect, useContext, createContext} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import authConfig from "../../authConfig";

// A function that routes the user to the right place after login.
export const DEFAULT_REDIRECT_CALLBACK = (appState) => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
};
export const DEFAULT_SCOPES = "openid profile email read:current_user update:current_user_metadata create:current_user_metadata delete:current_user_metadata";
export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

// TODO: Is using the Management Identifier as `audience` secure?
export const Auth0Provider = ({
                                  children,
                                  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                                  domain = authConfig.domain,
                                  client_id = authConfig.clientId,
                                  redirect_uri = window.location.origin,
                                  audience = authConfig.managementAudience,
                                  scope = DEFAULT_SCOPES,
                                  ...initOptions
                              }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(Object.assign(initOptions, {
                domain,
                client_id,
                redirect_uri,
                audience,
                scope
            }));
            setAuth0(auth0FromHook);

            if (window.location.search.includes("code=")) {
                const {appState} = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(user);
    };

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};
