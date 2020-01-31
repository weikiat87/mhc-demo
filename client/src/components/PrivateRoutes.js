import React from 'react';
import { Redirect } from "react-router-dom";
import { useUser } from '../contexts/UserContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    // if user exist in UserContext then we show component else redirect to login
    const { user } = useUser()
    if(!user)
        return <Redirect to='/' />
    if(user._type === props.type)
        return <Component {...props} />
    else 
        return <Redirect to='/' />
}

export default PrivateRoute