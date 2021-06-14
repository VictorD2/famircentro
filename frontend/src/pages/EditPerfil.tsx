import React, { useState, useRef } from 'react';
import swal from 'sweetalert'
import NavBar from '../components/Helpers/NavBar';
import Badge from '../components/Helpers/Badge';
import Footer from '../components/Helpers/Footer';
import FormEditPerfil from '../components/Perfil/FormEditPerfil';
import axios from 'axios';

const EditPerfil = () => {
    const [profileImg, setProfileImg] = useState<string | ArrayBuffer>("https://picsum.photos/200/300");

    const cardPass = useRef<HTMLDivElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const tipos = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp']
        e.preventDefault();
        if (e.dataTransfer.files instanceof FileList) {
            if (tipos.includes(e.dataTransfer.files[0].type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        if (reader.result) setProfileImg(reader.result);
                    }
                }
                reader.readAsDataURL(e.dataTransfer.files[0]);
                const form = new FormData();
                form.append('fotoPerfil', e.dataTransfer.files[0]);
                axios.put(`http://localhost:4000/api/usuarios/${2}`, form);
            } else {
                swal({
                    title: 'Advertencia',
                    text: 'Subir un formato de imagen',
                    icon: 'warning'
                });
            }
        } else {
            swal({
                title: 'Error',
                text: 'Archivo no leido',
                icon: 'error'
            });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tipos = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp']
        if (e.target.files instanceof FileList) {
            if (tipos.includes(e.target.files[0].type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        if (reader.result) setProfileImg(reader.result);
                    }
                }
                reader.readAsDataURL(e.target.files[0]);
            } else {
                swal({
                    title: 'Advertencia',
                    text: 'Subir un formato de imagen',
                    icon: 'warning'
                });
            }
        } else {
            swal({
                title: 'Error',
                text: 'Archivo no leido',
                icon: 'error'
            });
        }
    }

    const changePassword = () => {
        cardPass.current?.classList.toggle('d-none');
    }

    return (
        <React.Fragment>
            <NavBar />

            <Badge name="Editar Perfil" />

            <div className="Main__container">
                <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
                    <div className="row p-5">
                        <div className="col-lg-5 col-md-12">
                            <div draggable="true" className="cuadroEditPerfil" onDragOver={handleDragOver} onDrop={handleDrop}>
                                <figure className="editProfile-img">
                                    <img id="avatar" src={profileImg.toString()} alt="Mi avatar" width="200" height="200" />
                                </figure>
                                <div style={{color: "#696969"}}>
                                    <input type="file" id="inputFile" style={{ display: "none" }} onChange={handleChange} />
                                    Arrastra aquí tu imagen de perfil<br/>
                                    o <a href="/" role="button">
                                        <label htmlFor="inputFile" style={{ cursor: "pointer" }}>Sube una foto</label>
                                    </a>
                                </div>
                            </div>
                            <div className="fw-bold mb-md-3 mb-lg-0" style={{ color: "#0049af", cursor: "pointer" }} onClick={changePassword}>Cambiar contraseña</div>
                            <div className="card card-body mt-2 d-none mb-md-5 mb-lg-0" ref={cardPass}>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="oldPassword">Contraseña anterior</label>
                                        <input type="password" name="oldPassword" id="oldPassword" className="form-control rgt__form-control mt-2" value="Password" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <label htmlFor="newPassword">Nueva contraseña</label>
                                        <input type="password" name="newPassword" id="newPassword" className="form-control rgt__form-control mt-2" value="Password" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <label htmlFor="verifyNewPassword">Confirmar nueva contraseña</label>
                                        <input type="password" name="verifyNewPassword" id="verifyNewPassword" className="form-control rgt__form-control mt-2" value="Password" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="rgt__button">
                                        <button type="submit" className="btn btn__more" style={{ padding: "0.5rem 1.5rem", textTransform: "none" }}> Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 offset-lg-1">
                            <FormEditPerfil />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default EditPerfil;