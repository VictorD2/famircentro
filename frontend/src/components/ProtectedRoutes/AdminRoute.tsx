import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useUsuario } from '../../context-user/UsuarioProvider';
interface PrivateRouteProps {
    component: any;
    exact: boolean;
    path: string;
    rango?: number;
    authenticate?: boolean;
}
const AdminRoute = (props: PrivateRouteProps) => {
    const { usuario } = useUsuario();
    const { component: Component, rango, authenticate, exact, path, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (usuario.id_rango === 1 && usuario.authenticate) {
                    console.log(usuario.id_rango);
                    console.log(usuario.authenticate);
                    console.log("Adminis");
                    return <Component {...props} />
                } else {
                    console.log(usuario.id_rango);
                    console.log(usuario.authenticate);
                    console.log("nel");
                    return (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                }
            }}
        />
    )
}

export default AdminRoute
