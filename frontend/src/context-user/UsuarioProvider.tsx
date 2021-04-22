import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Usuario from "../interfaces/Usuario";
const initialState = {
  id: "",
  nombre: "",
  apellidos: "",
  correo: "",
  url_foto: "",
  isAdmin: false,
  isAuth: false,
};
const UsuarioContext = React.createContext({
  usuario: initialState,
});

export function UsuarioProvider(props: any) {
  const [usuario] = useState<Usuario>(initialState);

  useEffect(() => {
    async function cargarUsuario() {
      if (usuario.isAuth) {
        return;
      }
      const datos = await axios.get(
        "http://localhost:4000/api/usuarios/whoami"
      );
      if (datos.data.message) {
        if (datos.data.message === "failed") return;
      }
      usuario.isAuth = datos.data.authenticate;
      usuario.id = datos.data.user.Codigo_Usuario;
      usuario.nombre = datos.data.user.Nombres;
      usuario.apellidos = datos.data.user.Apellidos;
      usuario.correo = datos.data.user.Correo;
      if (datos.data.user.Rango !== "user") usuario.isAdmin = true;
      usuario.url_foto = datos.data.user.Url_Foto;
    }
    cargarUsuario();
  });

  const value = useMemo(() => {
    return {
      usuario,
    };
  }, [usuario]);

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
