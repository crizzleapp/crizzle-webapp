import auth0 from 'auth0-js';
import React, {useState, useEffect, useContext} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({children, onRedirectCallback = DEFAULT_REDIRECT_CALLBACK, ...initOptions}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
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

// class Auth {
//     constructor() {
//         this.auth0 = new auth0.WebAuth({
//             domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
//             audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
//             clientID: `${process.env.REACT_APP_AUTH0_CLIENTID}`,
//             redirectUri: `${process.env.REACT_APP_APP_URL}/logincallback`,
//             responseType: "token id_token",
//             scope: "openid settings email read:current_user",
//         });
//
//         this.getProfile = this.getProfile.bind(this);
//         this.handleAuthentication = this.handleAuthentication.bind(this);
//         this.isAuthenticated = this.isAuthenticated.bind(this);
//         this.signIn = this.signIn.bind(this);
//         this.signOut = this.signOut.bind(this);
//     }
//
//     getProfile() {
//         return this.profile;
//     }
//
//     getIdToken() {
//         return this.idToken;
//     }
//
//     isAuthenticated() {
//         return new Date().getTime() < this.expiresAt;
//     }
//
//     signIn(from) {
//         this.auth0.authorize();
//     }
//
//     handleAuthentication() {
//         return new Promise((resolve, reject) => {
//             this.auth0.parseHash((err, authResult) => {
//                 if (err) return reject(err);
//                 if (!authResult || !authResult.idToken) {
//                     return reject(err);
//                 }
//                 this.setSession(authResult);  //  Enables persistent login
//                 resolve();
//             });
//         });
//     }
//
//     setSession(authResult) {
//         console.log(authResult);
//         this.idToken = authResult.idToken;
//         this.profile = authResult.idTokenPayload;
//         this.expiresAt = authResult.idTokenPayload.exp * 1000;
//     }
//
//     signOut() {
//         // Send logout request to Auth0
//         this.auth0.logout({
//             returnTo: `${process.env.REACT_APP_APP_URL}`,
//             clientID: `${process.env.REACT_APP_AUTH0_CLIENTID}`,
//         });
//     }
//
//     silentAuth() {
//         return new Promise((resolve, reject) => {
//             this.auth0.checkSession({}, (err, authResult) => {
//                 if (err) return reject(err);
//                 this.setSession(authResult);
//                 resolve();
//             });
//         });
//     }
// }
//
// export const auth0Client = new Auth();
