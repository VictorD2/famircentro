import React from 'react';

//Componentes
import Boton from './BotonSubmit';

function FormContact() {
    return (
        <div className="cts__form">
            <form action="">
                <div className="mb-3">
                    <input type="text" className="form-control cts__form-control" name="name" placeholder="Nombres" />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control cts__form-control" name="email" placeholder="Correo" />
                </div>
                <textarea name="message" className="form-control cts__form-control" cols={30} rows={10} placeholder="Mensage"></textarea>
                <Boton name="Contactar" />
            </form>
        </div>
    );
}

export default FormContact;