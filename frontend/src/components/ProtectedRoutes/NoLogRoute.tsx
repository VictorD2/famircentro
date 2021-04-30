import React from 'react'
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
    component: any;
    isSignedIn: boolean;
    exact: boolean;
    path: string;
}


const LogRoute = (props: PrivateRouteProps) => {
    const { component: Component, isSignedIn, exact, path, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isSignedIn) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                }
            }}
        />
    )
}

export default LogRoute
