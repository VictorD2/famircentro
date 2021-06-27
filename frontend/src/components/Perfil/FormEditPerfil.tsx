/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import Usuario from '../../interfaces/Usuario';
import { useUsuario } from '../../context-user/UsuarioProvider';

const initialState: Usuario = {
    id_usuario: "",
    nombre: "",
    id_pais: "1",
    apellido: "",
    profesion: "",
    correo: "",
    telefono: "",
    habilitado_u: 1,
    rut: "",
    id_rango: 2,
    url_foto_usuario: "",
    authenticate: false,
};
const FormEditPerfil = () => {
    const { setUsuario } = useUsuario();

    const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario>(initialState);
    useEffect(() => {
        getDatos();
        return () => setUsuarioPerfil(initialState);
    }, [])

    const getDatos = async () => {
        const datos = await axios.get("http://localhost:4000/api/usuarios/whoami");
        if (datos.data.user) setUsuarioPerfil(datos.data.user);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUsuarioPerfil({ ...usuarioPerfil, [e.target.name]: e.target.value });
    }

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.put(`http://localhost:4000/api/usuarios/${usuarioPerfil.id_usuario}`, usuarioPerfil);
        if (res.data.success) {
            swal({
                title: '¡Hecho!',
                text: res.data.success,
                icon: 'success'
            });
            if (res.data.usuario) {
                setUsuarioPerfil(res.data.usuario);
                setUsuario(res.data.usuario);
            }
            // window.location.href = '/Perfil/Editar'
        }
        if (res.data.error) {
            return swal({
                title: 'Ups!',
                text: res.data.error,
                icon: 'error'
            });
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="fw-bold m-0 p-1">Tus Datos</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmitForm} >
                    <div className="row">
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="nombre">Nombres</label>
                            <input onChange={handleInputChange} type="text" id="nombre" name="nombre" className="form-control rgt__form-control" value={usuarioPerfil.nombre} />
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="correo">Correo</label>
                            <input onChange={handleInputChange} type="text" id="correo" name="correo" className="form-control rgt__form-control" value={usuarioPerfil.correo} />
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="apellido">Apellidos</label>
                            <input onChange={handleInputChange} type="text" id="apellido" name="apellido" className="form-control rgt__form-control" value={usuarioPerfil.apellido} />
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="id_pais">País</label>
                            <select onChange={handleInputChange} className="form-control rgt__form-control" id="id_pais" name="id_pais" value={usuarioPerfil.id_pais} >
                                <option value="1">Perú</option>
                                <option value="2" >Chile</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-12 mb-3">
                            <label htmlFor="profesion">Profesión</label>
                            <input onChange={handleInputChange} type="text" id="profesion" name="profesion" className="form-control rgt__form-control" value={usuarioPerfil.profesion} />
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="telefono">Teléfono Móvil</label>
                            <input onChange={handleInputChange} type="text" id="telefono" name="telefono" className="form-control rgt__form-control" value={usuarioPerfil.telefono} />
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                            <label htmlFor="rut">RUT</label>
                            <input onChange={handleInputChange} type="text" id="rut" name="rut" className="form-control rgt__form-control" value={usuarioPerfil.rut} />
                        </div>
                        <button type="submit" className="btn btn__more w-50 mx-auto mt-5" style={{ padding: "0.4rem", textTransform: "none" }}> Guardar cambios </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormEditPerfil;