import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Icons
import { FaEdit, FaPlus } from 'react-icons/fa'

// Toastify
import { toast } from 'react-toastify'

// Interfaces
import { Modulo } from '../Modulos/Modulo'
import { Tema } from './Tema'

const initialState = {
    titulo: "",
    descripcion: "",
    video: [new File([""], "filename")],
}

interface Props {
    count: number;
    setcount: (count: number) => void
    moduloModal: Modulo;
    temaModal: Tema;
    load: (id: string) => void;
}

const ModalTema = (props: Props) => {

    const progressBar = document.getElementById('progressBar');
    const [tema, setTema] = useState<Tema>(initialState)

    //Submit
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append('titulo', tema.titulo);
        form.append('descripcion', tema.descripcion);
        form.append('id_modulo', "" + props.moduloModal.id_modulo);

        if (tema.video) form.append('video', tema.video[0]);
        if (!props.temaModal.id_tema) {//Por si no hay tema se pone en crear
            const res = await axios.post('http://localhost:4000/api/tema', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress(e) {
                    let progress = Math.round((e.loaded * 100.0) / e.total);
                    if (progressBar != null) {
                        progressBar.innerHTML = `${progress}%`;
                        progressBar.style.width = `${progress}%`;
                    }
                }
            });
            props.setcount(props.count + 1);
            if (res.data.success) return toast.success(res.data.success);
            if (res.data.error) return toast.error(res.data.error);
            return;
        }//Editar
        form.append('id_tema', "" + tema.id_tema);
        const res = await axios.put(`http://localhost:4000/api/tema/${props.temaModal.id_tema}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(e) {
                let progress = Math.round((e.loaded * 100.0) / e.total);
                if (progressBar != null) {
                    progressBar.innerHTML = `${progress}%`;
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
        props.setcount(props.count + 1);
        if (res.data.success) return toast.success(res.data.success);
        if (res.data.error) return toast.error(res.data.error);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTema({ ...tema, [e.target.name]: e.target.value });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setTema({ ...tema, [e.target.name]: e.target.files });
    };
    
    useEffect(() => {
        setTema(props.temaModal);
        return () => {
        }
    }, [props.temaModal])

    return (
        <div className="modal fade" id="crearTema" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {props.temaModal.id_tema ? (<>
                        <div className="modal-header btn-warning">
                            <h5 className="modal-title" id="exampleModalLabel"> <FaEdit className="mb-1" /> Modificar Tema</h5>
                            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </>) : (<>
                        <div className="modal-header btn__blue">
                            <h5 className="modal-title" id="exampleModalLabel"> <FaPlus className="mb-1" /> Crear Tema</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </>)}
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input onChange={handleInputChange} id="floatingInputTitulo" className="form-control" type="text" placeholder="Título" name="titulo" required value={tema.titulo} />
                                <label htmlFor="floatingInputTitulo">Título del tema</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea onChange={handleInputChange} id="floatingInputDescripcion" className="form-control" placeholder="Descripción" name="descripcion" required value={tema.descripcion} />
                                <label htmlFor="floatingInputDescripcion">Descripción del tema</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFileVideo" className="form-label">Video</label>
                                {props.temaModal.id_tema ? (<>
                                    <input onChange={handleFile} id="formFileVideo" className="form-control" type="file" placeholder="Video" name="video" />
                                </>) : (<>
                                    <input onChange={handleFile} id="formFileVideo" className="form-control" type="file" placeholder="Video" name="video" required />
                                </>)}
                            </div>
                            <div className="progress">
                                <div className="progress-bar" id="progressBar" role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>0%</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            {props.temaModal.id_tema ? (<>
                                <button type="submit" className="btn btn__amarillo"><FaEdit className="mb-1" /> Modificar</button>
                            </>) : (<>
                                <button type="submit" className="btn btn__blue" ><FaPlus className="mb-1" /> Crear</button>
                            </>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalTema
