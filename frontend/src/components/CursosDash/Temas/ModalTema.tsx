import React, { useEffect, useRef, useState } from "react";
import { Vimeo } from "vimeo";

//
import * as temaServices from "./TemaServices";

// Icons
import { FaEdit, FaPlus } from "react-icons/fa";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { Modulo } from "../Modulos/Modulo";
import { Tema } from "./Tema";

interface Props {
  count: number;
  setcount: (count: number) => void;
  moduloModal: Modulo;
  temaModal: Tema;
}

const initialState = {
  titulo: "",
  descripcion: "",
  video: [new File([""], "filename")],
  url_video: "",
};

const ModalTema = (props: Props) => {
  const refInput = useRef<HTMLInputElement | null>();
  const refProgresss = useRef<HTMLDivElement | null>();

  const [tema, setTema] = useState<Tema>(initialState);

  useEffect(() => {
    setTema(props.temaModal);
    return () => {};
  }, [props.temaModal]);

  //Submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let client = new Vimeo("72c9aa8a9e250995e93ecaa6a674f4be900f94d5", "CN9HBV8c4SysOm9ClGhvRWgYkPTph/dRjEjGfX7mdQHxcC37En73pNO1gOyxRA9WKI2EN+tihBVDl65bn0iT3rjk4JAuQWMjVNwQa75HkcpBliSDn/awvZgCWDGXNXo2", "1d13a3b866c5ce6c46d8ff02cf2202ed");
    let file_name = new File([""], "filename");
    if (tema.video) file_name = tema.video[0];
    client.upload(
      file_name,
      {
        name: "Untitled",
        description: "The description goes here.",
      },
      function (uri) {
        console.log("Your video URI is: " + uri);
      },
      function (bytes_uploaded, bytes_total) {
        var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
        console.log(bytes_uploaded, bytes_total, percentage + "%");
      },
      function (error) {
        console.log("Failed because: " + error);
      }
    );
    e.preventDefault();
    const form = new FormData();
    form.append("titulo", tema.titulo);
    form.append("descripcion", tema.descripcion);
    form.append("id_modulo", "" + props.moduloModal.id_modulo);
    if (tema.video) form.append("video", tema.video[0]);

    if (!props.temaModal.id_tema) {
      //Por si no hay tema se pone en crear
      const res = await temaServices.crearTema(form, refProgresss.current);
      props.setcount(props.count + 1);
      if (res.data.success) {
        borrarInputFile(); //Borrando el valor del input file
        if (refProgresss.current) {
          refProgresss.current.innerHTML = "0%";
          refProgresss.current.style.width = "0%";
        }
        setTema(initialState);
        props.setcount(props.count + 1);
        toast.success(res.data.success);
      }
      if (res.data.error) toast.error(res.data.error);
      return;
    }

    //Editar
    form.append("id_tema", "" + tema.id_tema);
    const res = await temaServices.editarTema(props.temaModal.id_tema + "", form, refProgresss.current);
    props.setcount(props.count + 1);
    if (refInput.current) refInput.current.value = "";
    if (res.data.success) {
      borrarInputFile(); //Borrando el valor del input file
      if (refProgresss.current) {
        refProgresss.current.innerHTML = "0%";
        refProgresss.current.style.width = "0%";
      }
      toast.success(res.data.success);
    }
    if (res.data.error) toast.error(res.data.error);
  };

  const borrarInputFile = () => {
    if (refInput.current) refInput.current.value = "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTema({ ...tema, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setTema({ ...tema, [e.target.name]: e.target.files });
  };

  return (
    <div className="modal fade" id="crearTema" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {props.temaModal.id_tema ? (
            <>
              <div className="modal-header btn-warning">
                <h5 className="modal-title" id="exampleModalLabel">
                  <FaEdit className="mb-1" /> Modificar Tema
                </h5>
                <button type="button" onClick={() => borrarInputFile()} className="btn-close btn-close-dark" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header btn__blue">
                <h5 className="modal-title" id="exampleModalLabel">
                  <FaPlus className="mb-1" /> Crear Tema
                </h5>
                <button type="button" onClick={() => borrarInputFile()} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} id="floatingInputTitulo" className="form-control" type="text" placeholder="T??tulo" name="titulo" required value={tema.titulo} />
                <label htmlFor="floatingInputTitulo">T??tulo del tema</label>
              </div>
              <div className="form-floating mb-3">
                <textarea onChange={handleInputChange} id="floatingInputDescripcion" className="form-control" placeholder="Descripci??n" name="descripcion" required value={tema.descripcion} />
                <label htmlFor="floatingInputDescripcion">Descripci??n del tema</label>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileVideo" className="form-label">
                  Video
                </label>
                {props.temaModal.id_tema ? (
                  <>
                    <input onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFileVideo" className="form-control" type="file" placeholder="Video" name="video" />
                  </>
                ) : (
                  <>
                    <input onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFileVideo" className="form-control" type="file" placeholder="Video" name="video" required />
                  </>
                )}
              </div>
              <div className="progress">
                <div className="progress-bar" ref={(node) => (refProgresss.current = node)} role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                  0%
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              {props.temaModal.id_tema ? (
                <>
                  <button type="submit" className="btn btn__amarillo">
                    <FaEdit className="mb-1" /> Modificar
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="btn btn__blue">
                    <FaPlus className="mb-1" /> Crear
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTema;
