import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import auth from "../../context-user/auth";
interface PrivateRouteProps {
    component: any;
    exact: boolean;
    path: string;
}
const AdminRoute = (props: PrivateRouteProps) => {
    const { component: Component, exact, path, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.getRango() === 1) {
                    return <Component {...props} />
                }
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }}
        />
    )
}

export default AdminRoute
