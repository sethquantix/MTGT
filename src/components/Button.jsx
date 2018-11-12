import React from 'react';

const Button = ({ name, onClick, className = null, children }) => {

    className = "button-hovered" + className ? (" " + className) : "";
    return <div className={className} onClick={onClick} style={{justifyContent: "center"}}>
        {children ? children : <div className="button">
            {name}
        </div>}
    </div>
};

export default Button;
