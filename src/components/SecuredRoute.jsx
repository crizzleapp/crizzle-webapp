import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from './Auth';
import Spinner from 'react-bootstrap/Spinner';

function SecuredRoute(props) {
    const {component: Component, path, checkingSession, ...rest} = props;
    const loadingAnimation = (
        <Spinner animation="grow"/>
    );
    return (
        <Route {...rest} path={path} render={properties => {
            if (checkingSession) return loadingAnimation;
            if (!auth0Client.isAuthenticated()) {
                auth0Client.signIn();
                return <div/>;
            }
            return <Component {...properties}/>
        }}/>
    );
}

export default SecuredRoute;
