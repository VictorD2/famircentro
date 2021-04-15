import React from 'react';

type myProps = {name: string}

const Badge: React.FC<myProps> = (props) => {
    return (
        <div className="Badge__container">
            <div className="Box">
                <span className="fw-bold fs-1">{props.name}</span>
            </div>
        </div>
    );
}

export default Badge;