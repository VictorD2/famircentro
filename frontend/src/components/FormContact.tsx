import React from 'react';
import Boton from './BotonSubmit';

function FormContact() {
    return (
        <div className="cts__form">
            <form action="">
                <div className="mb-3">
                    <input type="text" className="form-control" name="name" placeholder="Name" />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" name="email" placeholder="E-mail" />
                </div>
                <textarea name="message" className="form-control" cols={30} rows={10} placeholder="Message"></textarea>
                <Boton name="Contact Us" />
            </form>
        </div>
    );
}

export default FormContact;