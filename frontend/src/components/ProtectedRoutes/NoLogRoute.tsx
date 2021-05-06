import React from 'react'
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
    component: any;
    exact: boolean;
    path: string;
    authenticate?: boolean;
}


const LogRoute = (props: PrivateRouteProps) => {
    const { component: Component, exact,authenticate, path, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!authenticate) {
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
