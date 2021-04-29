import React from 'react'

import { Route, Redirect } from 'react-router-dom';
interface PrivateRouteProps {
    rango: string;
    component: any;
    isSignedIn: boolean;
    exact: boolean;
    path: string;
}
const AdminRoute = (props: PrivateRouteProps) => {
    const { component: Component, isSignedIn, exact, path, rango, ...rest } = props;
    console.log(rango);
    console.log(isSignedIn);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (rango === "admin" && isSignedIn) {
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

export default AdminRoute
