import React from 'react';
import {Route} from 'react-router-dom';
import {useAuth0} from './Auth';
import Spinner from 'react-bootstrap/Spinner';

function SecuredRoute(props) {
    const {isAuthenticated, loginWithRedirect, loading} = useAuth0();
    const {component: Component, path, ...rest} = props;

    const loadingAnimation = (
        <Spinner animation="grow"/>
    );
    return (
        <Route {...rest} path={path} render={properties => {
            if (loading) return loadingAnimation;
            if (!isAuthenticated) {
                loginWithRedirect({});
                return <div/>;
            }
            return <Component {...properties}/>
        }}/>
    );
}

export default SecuredRoute;
