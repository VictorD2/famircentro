import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Helpers/NavBar';
import Badge from '../components/Helpers/Badge';
import Footer from '../components/Helpers/Footer';

class EditPerfil extends React.Component {

    private file: File = new File([""], "filename");
    private photoSelect?: string | ArrayBuffer | null;

    handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.stopPropagation();
        e.preventDefault();
    }

    handleDrop(e: React.DragEvent<HTMLDivElement>) {
        let data = e.dataTransfer.files[0];
        const img = document.getElementById('avatar');
        const reader = new FileReader();
        // reader.onload = e => {
        //     if (this.photoSelect) this.photoSelect = reader.result
        // };
        // reader.readAsDataURL(data);
        e.preventDefault();
        // console.log(this.file);
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
                                <div draggable="true" onDragOver={this.handleDragOver} onDrop={this.handleDrop} className="cuadroEditPerfil">
                                    <figure className="editProfile-img">
                                        {this.photoSelect ? (<>
                                            <img id="avatar" src="https://picsum.photos/200/300" alt="Mi avatar" width="130" height="130" />
                                        </>) : (<>
                                            <img id="avatar" src="https://picsum.photos/200/300" alt="Mi avatar" width="130" height="130" />
                                        </>)}
                                    </figure>
                                    <div className="editProfile-imgLoad" >
                                        Arrastra aquí tu imagen de perfil
                                        <br />
                                        o <Link role="button" to="#" >Subir foto</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                Formulario
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