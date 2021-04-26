import React from 'react';

type gravatar = {className: string};

const ImgCurso: React.FC<gravatar> = (props) => {
    return(
        <img
        className={props.className}
        src={`https://www.gravatar.com/avatar/?d=identicon`}
        alt="Avatar"
        />
    );
}

export default ImgCurso;