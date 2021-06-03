import React from 'react';
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
        e.preventDefault();
        if (e.dataTransfer.files instanceof FileList) {
            if (e.dataTransfer.files[0].type === 'image/gif' || e.dataTransfer.files[0].type === 'image/png' || e.dataTransfer.files[0].type === 'image/jpeg' || e.dataTransfer.files[0].type === 'image/bmp' || e.dataTransfer.files[0].type === 'image/webp') {
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2) {
                        this.setState({profileImg: reader.result});
                    }
                }
                reader.readAsDataURL(e.dataTransfer.files[0]);
            } else {
                alert('Subir un formato de imagen')
            }
        } else {
            alert('Archivo no leido');
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files instanceof FileList) {
            if (e.target.files[0].type === 'image/gif' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/bmp' || e.target.files[0].type === 'image/webp') {
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2) {
                        this.setState({profileImg: reader.result});
                    }
                }
                reader.readAsDataURL(e.target.files[0]);
            } else {
                alert('Subir un formato de imagen')
            }
        } else {
            alert('Archivo no leido');
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
                                        <input type="file" id="inputFile" style={{display: "none"}} onChange={this.handleChange} />
                                        <button className="btn btn-editPerfil" type="button">
                                            <label htmlFor="inputFile" className="d-block" style={{cursor: "pointer"}}>Subir foto de perfil</label>
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