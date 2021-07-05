/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

//Iconos
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Componentes
import Navigation from "../../../pages/DashBoard/Navigation";
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

interface Params {
  idTema: string;
}

const VerTema = () => {
  const params = useParams<Params>();

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
    sources: [
      {
        src: "",
        type: "video/mp4",
      },
    ],
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
    const res = await temaServices.getTemaById(params.idTema);
    setTema(res.data);
    setSettings({ ...settings, sources: [{ src: `http://localhost:4000/video-lock?key=1v4g8h6vcesm&Tema=${res.data.url_video}`, type: "video/mp4" }] });
    setLoadingVideo(true);
  };
  const getMaterial = async () => {
    const res = await materialServices.getMaterialByTemaId(params.idTema);
    setMaterial(res.data);
  };

  return (
    <React.Fragment>
      <Navigation />
      <div className="contenido-principal p-4">
        {/* Title */}
        <div className="d-flex flex-row bg-white">
          <FontAwesomeIcon className="me-3 fs-3" icon={faBook} />
          <h6 className="m-0 text-uppercase fs-3">{tema?.titulo}</h6>
        </div>
        {/* Options */}
        <div className="d-flex flex-row p-2 mt-4 flex-wrap justify-content-between"></div>

        {/* Content */}
        <div className="py-4 mt-4"></div>

        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <p className="fs-4">Descripción:</p>
                {tema?.descripcion}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerTema;
