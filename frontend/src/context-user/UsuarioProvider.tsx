import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Usuario from "../interfaces/Usuario";
const initialState: Usuario = {
  id_usuario: "",
  nombre: "",
  apellido: "",
  profesion: "",
  correo: "",
  telefono: "",
  habilitado: 1,
  rut: "",
  id_rango: 2,
  url_foto_usuario: "",
  authenticate: false,
};
const UsuarioContext = React.createContext({
  usuario: initialState,
  loadUser: false
});

export function UsuarioProvider(props: any) {
  const [usuario, setUsuario] = useState<Usuario>(initialState);
  const [loadUser, setLoadUser] = useState(true);

  useEffect(() => {
    async function cargarUsuario() {
      const datos = await axios.get("http://localhost:4000/api/usuarios/whoami");
      if(datos.data.user) {
        setUsuario(datos.data.user);
        setLoadUser(true);
      }
    }
    cargarUsuario();
  }, []);

  const value = useMemo(() => {
    return {
      usuario,
      loadUser
    };
  }, [usuario, loadUser]);

  return <UsuarioContext.Provider value={value} {...props} />;
}

export function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error(
      "useUsuario debe estar dentro del proveedor usuario context"
    );
  }
  return context;
}
