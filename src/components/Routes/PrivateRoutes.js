import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

//creating a wrapper for our current route
//we are taking in the component from the route which we pass into PrivateRoutes
function PrivateRoutes({ component: Component, ...rest}) {

    const { currentUser } = useAuth()

    //The route we are returning will take in the normal props from react-router as
    //if our route was being passed with Route not PrivateRoute
    //we define our own render method
    //we check to see if we have a currennt user, then we render out a component that was normally passed, otherwise we dont want to render a component associated with user so we redirect them to login
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >

        </Route>
    )
}

export default PrivateRoutes
