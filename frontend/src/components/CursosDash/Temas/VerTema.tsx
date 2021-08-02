/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../../config/config";
import "@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm";
import { Vimeo } from "vimeo";
//Iconos

//Componentes
import VideoReproductor from "../../Helpers/VideoReproductor";
import MaterialClaseItem from "../MaterialClase/MaterialClaseItem";

//Services
import * as temaServices from "./TemaServices";
import * as materialServices from "../MaterialClase/MaterialServices";

//Poster
import poster from "./logoFamir.jpg";

//Interfaces
import { VideoJsPlayerOptions } from "video.js";
import { Tema } from "./Tema";
import { MaterialClase } from "../MaterialClase/MaterialClase";
import { Link } from "react-router-dom";

interface Params {
  idTema: string;
  modalidad: string;
  tipo: string;
  id: string;
}

const VerTema = () => {
  const params = useParams<Params>();
  const refDesc = useRef<HTMLParagraphElement | null>();

  const [countMaterial, setCountMaterial] = useState<number>(0);
  const [tema, setTema] = useState<Tema>({ titulo: "", descripcion: "", url_video: "" });
  const [material, setMaterial] = useState<MaterialClase[]>([]);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
  const [settings, setSettings] = useState<VideoJsPlayerOptions>({
    //Del video
    autoplay: false,
    preload: "none",
    controls: true,
    poster: poster,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    // techOrder: ["vimeo"],
    sources: [
      {
        src: ``,
        type: "video/mp4",
      },
    ],
    // plugins: {},
  });

  useEffect(() => {
    getTema();
    return () => setTema({ titulo: "", descripcion: "", url_video: "" });
  }, []);

  useEffect(() => {
    getMaterial();
    return () => setMaterial([]);
  }, [countMaterial]);

  //Funciones

  const getTema = async () => {
    // let client = new Vimeo("72c9aa8a9e250995e93ecaa6a674f4be900f94d5", "CN9HBV8c4SysOm9ClGhvRWgYkPTph/dRjEjGfX7mdQHxcC37En73pNO1gOyxRA9WKI2EN+tihBVDl65bn0iT3rjk4JAuQWMjVNwQa75HkcpBliSDn/awvZgCWDGXNXo2", "59aeebdcfb687f072312e017596c484b");
    // client.request(
    //   {
    //     method: "GET",
    //     path: "/tutorial",
    //   },
    //   function (error, body, status_code, headers) {
    //     if (error) {
    //       console.log(error);
    //     }

    //     console.log(body);
    //   }
    // );
    const res = await temaServices.getTemaById(params.idTema);
    const newDescripcion = res.data.descripcion.replace(/\n/g, "<br/>");
    res.data.descripcion = newDescripcion;
    setTema(res.data);
    if (refDesc.current) refDesc.current.innerHTML = res.data.descripcion;
    // setSettings({ ...settings, sources: [{ src: res.data.url_video, type: "video/vimeo" }] });
    setSettings({ ...settings, sources: [{ src: `${API}/video-lock?key=1v4g8h6vcesm&Tema=${res.data.url_video}`, type: "video/mp4" }] });
    setLoadingVideo(true);
  };
  const getMaterial = async () => {
    const res = await materialServices.getMaterialByTemaId(params.idTema);
    setMaterial(res.data);
  };

  return (
    <React.Fragment>
      <div className="content-wrapper" style={{ minHeight: 643 }}>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 efecto_titulo">
                  <i className="nav-icon fas fa-book me-3" />
                  {tema.titulo}
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/">
                      Inicio
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}`}>
                      {params.tipo} {params.modalidad}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to={`/Dashboard/${params.tipo}/${params.modalidad}/Material/${params.id}`}>
                      Material
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Tema</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="row">
                  <div className="col-12">
                    {loadingVideo ? (
                      <>
                        <VideoReproductor settings={settings} />
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-center align-items-center bg-dark w-100" style={{ height: 430 }}>
                          <div className="loader"></div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-12 mt-3">
                    <p className="fs-4">Material:</p>
                    {material.map((material) => {
                      return <MaterialClaseItem setCountMaterial={setCountMaterial} countMaterial={countMaterial} key={material.id_material_clase} material_clase={material} />;
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="row">
                  <div className="col-12">
                    <p className="fs-4">Descripción:</p>
                    <p ref={(node) => (refDesc.current = node)} style={{ textAlign: "justify" }} className="fs-6"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default VerTema;
