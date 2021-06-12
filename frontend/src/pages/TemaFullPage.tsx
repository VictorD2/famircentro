/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

//Iconos
import { FaDownload } from 'react-icons/fa'

//Componentes
import Footer from '../components/Helpers/Footer'
import NavBar from '../components/Helpers/NavBar'
import VideoReproductor from '../components/Helpers/VideoReproductor'

//Poster video
import poster from '../components/CursosDash/Temas/logoFamir.jpg';

//Toastify
import { ToastContainer } from 'react-toastify'

//Services
import * as temaServices from '../components/CursosDash/Temas/TemaServices'
import * as materialServices from '../components/CursosDash/MaterialClase/MaterialServices'
import * as cursosServices from '../components/CursosDash/CursosServices';
import axios from 'axios'

//Interfaces
import Comentarios from './Curso/Comentarios'
import { VideoJsPlayerOptions } from 'video.js'
import { Tema } from '../components/CursosDash/Temas/Tema'
import { MaterialClase } from '../components/CursosDash/MaterialClase/MaterialClase'

interface Params {
    idCurso: string;
}
interface Params {
    idTema: string
}

const initialVideoState = {
    autoplay: false,
    preload: "none",
    controls: true,
    poster: poster,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    sources: [{
        src: '',
        type: 'video/mp4'
    }]
}

const TemaFullPage = () => {

    const params = useParams<Params>();

    const history = useHistory();

    const [tema, setTema] = useState<Tema>();

    const [loadingVideo, setLoadingVideo] = useState<boolean>(false)
    const [material, setMaterial] = useState<MaterialClase[]>([]);
    const [settings, setSettings] = useState<VideoJsPlayerOptions>(initialVideoState);

    const getTema = async () => {
        const res = await temaServices.getTemaById(params.idTema);
        const resMaterial = await materialServices.getMaterialByTemaId(params.idTema);
        setMaterial(resMaterial.data);
        setTema(res.data);
        setSettings({ ...settings, sources: [{ src: `http://localhost:4000/video-lock?key=1v4g8h6vcesm&Tema=${res.data.url_video}`, type: 'video/mp4' }] })
        setLoadingVideo(true);
    }
    const authentificar = async () => {
        const datos = await axios.get("http://localhost:4000/api/usuarios/whoami");
        if (datos.data.authenticate) history.push('/Login');//Poner ! en produccion
        const res = await cursosServices.verificarSuscribción(params.idCurso);
        if (res.data) history.push(`/Clase/${params.idCurso}`);//Poner ! en produccion
    }
    useEffect(() => {
        authentificar();
        getTema();
        return () => {
            setTema({ titulo: "", descripcion: "", url_video: "" });
            setLoadingVideo(false);
            setMaterial([])
            setSettings(initialVideoState)
        }
    }, [])

    return (
        <React.Fragment>
            <NavBar />
            <ToastContainer />
            <div className="p-5" style={{ marginTop: "3rem", background: "#eef3f6" }}>
                <div className="row">
                    <div className="col-12 col-sm-7 col-lg-7 mb-5">
                        {loadingVideo ? (<>
                            <div className="border border-blue">
                                <VideoReproductor settings={settings} />
                            </div>
                        </>) : (<>
                            <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ height: 430 }}>
                                <div className="loader">
                                </div>
                            </div>
                        </>)}
                        <div className="fw-bold fs-4 mt-2 text-capitalize">
                            {tema?.titulo}
                        </div>
                        <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-info" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Información</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-material" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Material</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-home-tab">
                                {tema?.descripcion}
                            </div>
                            <div className="tab-pane fade" id="pills-material" role="tabpanel" aria-labelledby="pills-profile-tab">
                                {material.map(material => {
                                    return (
                                        <div key={material.id_material_clase} className="d-flex my-1">
                                            <div className="list-group-item list-group-item-action btn__blue">
                                                <a className="text-decoration-none d-flex justify-content-between" rel="noreferrer" href={material.url_material} target="_blank" download>
                                                    <p className="text-nowrap text-truncate text-white m-0">{material.url_material?.slice(18, material.url_material.length)}</p>
                                                    <FaDownload className="mt-1 text-white" />
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-5 col-lg-5">
                        <Comentarios />
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default TemaFullPage
