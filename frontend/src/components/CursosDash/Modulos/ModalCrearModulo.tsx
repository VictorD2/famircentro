/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Modulo } from './Modulo';
import * as moduloServices from './ModuloService';

interface Params {
    id: string;
}
interface Props {
    load: (id: string) => void;
    modulo: Modulo;
}
const initialState = {
    titulo: ""
}
const ModalCrearModulo = (props: Props) => {
    const params = useParams<Params>();
    const [modulo, setModulo] = useState<Modulo>(initialState);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setModulo({ ...modulo, [e.target.name]: e.target.value });
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!props.modulo.id_modulo) {
            const res = await moduloServices.crearModulo(modulo, params.id);
            if (res.data.message === 'success') {
                toast.success('Módulo creado correctamente');
                props.load(params.id);
                return;
            }
            return toast.error('Ocurrió un error');
        }
        const res = await moduloServices.actualizarModulo(modulo);
        if (res.data.message === 'success') {
            toast.success('Módulo modificado correctamente');
            props.load(params.id);
            return;
        }
        return toast.error('Ocurrió un error');

    }
    useEffect(() => {
        setModulo(props.modulo);
        return () => setModulo(initialState);
    }, [props.modulo])

    return (
        <div className="modal fade" id="crearModulo" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {props.modulo.id_modulo ? (<>
                        <div className="modal-header btn-warning">
                            <h5 className="modal-title" id="exampleModalLabel"> <FaEdit className="mb-1" /> Modificar Modulo</h5>
                            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </>) : (<>
                        <div className="modal-header btn__blue">
                            <h5 className="modal-title" id="exampleModalLabel"> <FaPlus className="mb-1" /> Crear Modulo</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </>)}
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input onChange={handleInputChange} id="floatingInputTitulo" className="form-control" type="text" placeholder="Título" name="titulo" required value={modulo.titulo} />
                                <label htmlFor="floatingInputTitulo">Título del módulo</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            {props.modulo.id_modulo ? (<>
                                <button type="submit" className="btn btn__amarillo"><FaEdit className="mb-1" /> Modificar</button>
                            </>) : (<>
                                <button type="submit" className="btn btn__blue"><FaPlus className="mb-1" /> Crear</button>
                            </>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalCrearModulo
