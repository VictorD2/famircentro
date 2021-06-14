import React from 'react';

const FormEditPerfil = () => {
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="fw-bold">Tus Datos</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="name">Nombres</label>
                        <input type="text" name="name" id="name" className="form-control rgt__form-control mt-2 mb-4" value="Joseph Francisco" />
                        <label htmlFor="email">Correo</label>
                        <input type="email" name="email" id="email" className="form-control rgt__form-control mt-2" value="razorij20@gmail.com" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname">Apellidos</label>
                        <input type="text" name="lastname" id="lastname" className="form-control rgt__form-control mt-2 mb-4" value="De La Cruz Rivas" />
                        <label htmlFor="country">País</label>
                        <select className="form-control rgt__form-control mt-2" name="pais" >
                            <option value="0" >Chile</option>
                            <option value="1" selected>Perú</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <label htmlFor="profesion">Profesión</label>
                        <input type="text" name="profesion" id="profesion" className="form-control rgt__form-control mt-2" value="Ingeniero" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <label htmlFor="phone">Teléfono Móvil</label>
                        <input type="phone" name="phone" id="phone" className="form-control rgt__form-control mt-2" value="+51 986309674" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="rut">RUT</label>
                        <input type="rut" name="rut" id="rut" className="form-control rgt__form-control mt-2" value="20154963784529" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="rgt__button">
                        <button type="submit" className="btn btn__more" style={{ padding: "0.4rem", textTransform: "none" }}> Guardar cambios </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormEditPerfil;