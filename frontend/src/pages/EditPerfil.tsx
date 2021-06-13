import React from 'react';
import swal from 'sweetalert'
import NavBar from '../components/Helpers/NavBar';
import Badge from '../components/Helpers/Badge';
import Footer from '../components/Helpers/Footer';
import FormEditPerfil from '../components/Perfil/FormEditPerfil';

class EditPerfil extends React.Component {

    state = {
        profileImg: "https://picsum.photos/200/300"
    }

    handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const tipos = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp']
        e.preventDefault();
        if (e.dataTransfer.files instanceof FileList) {
            if (tipos.includes(e.dataTransfer.files[0].type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) this.setState({ profileImg: reader.result });
                }
                reader.readAsDataURL(e.dataTransfer.files[0]);
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

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tipos = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp']
        if (e.target.files instanceof FileList) {
            if (tipos.includes(e.target.files[0].type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        this.setState({ profileImg: reader.result });
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

    render() {
        return (
            <React.Fragment>
                <NavBar />

                <Badge name="Editar Perfil" />

                <div className="Main__container">
                    <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
                        <div className="row p-5">
                            <div className="col-6">
                                <div draggable="true" className="cuadroEditPerfil" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                                    <figure className="editProfile-img">
                                        <img id="avatar" src={this.state.profileImg} alt="Mi avatar" width="200" height="200" />
                                    </figure>
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <input type="file" id="inputFile" style={{ display: "none" }} onChange={this.handleChange} />
                                        <button className="btn btn-editPerfil" type="button">
                                            <label htmlFor="inputFile" className="d-block" style={{ cursor: "pointer" }}>Subir foto de perfil</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <FormEditPerfil />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default EditPerfil;