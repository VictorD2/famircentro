import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Helpers/NavBar';
import Badge from '../components/Helpers/Badge';
import Footer from '../components/Helpers/Footer';

class EditPerfil extends React.Component {

    private file?: File;

    handleDragOver(e:React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    handleDrop(e:React.DragEvent<HTMLDivElement>) {
        console.log(e);
    }

    render() {
        return(
            <React.Fragment>
                <NavBar />

                <Badge name="Editar Perfil" />
                
                <div className="Main__container">
                    <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
                        <div className="row p-5">
                            <div className="col-6">
                                <div onDragOver={this.handleDragOver} onDrop={this.handleDrop} className="cuadroEditPerfil">
                                    <figure className="editProfile-img">
                                        <img src="https://picsum.photos/200/300" alt="Mi avatar" width="130" height="130" />
                                    </figure>
                                    <div className="editProfile-imgLoad" >
                                        Arrastra aquí tu imagen de perfil
                                        <br/>
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