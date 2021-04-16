import React from 'react';

type nameButton = {name: string}

const Boton: React.FC<nameButton> = props => {
    return(
        <a href="/" className="btn btn__more mt-5" style={{marginBottom: "5rem"}}>
            {props.name}
        </a>
    );
}

export default Boton;