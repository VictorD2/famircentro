import React from 'react'
interface Props {
    funcion: (text: string) => void;
}
const BuscadorProfesor = (props: Props) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => props.funcion(e.target.value);
    
    return (
        <div className="d-flex justify-content-between">
            <input name="buscar" onChange={handleInputChange} type="text" placeholder="Buscar..." className="form-control" />
        </div>
    )
}

export default BuscadorProfesor
