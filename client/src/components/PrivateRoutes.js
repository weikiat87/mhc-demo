import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useUser } from '../contexts/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {isUser} = useUser()
    return (
        <Route {...rest} render={
            (props) =>
                isUser ? (<Component {...props} />) :
                         (<Redirect to='/' />)
        } />
    );
}

export default PrivateRoute