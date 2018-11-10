import React from 'react';

const Button = ({ name, onClick, classes, children }) => {

    classes = Array.isArray(classes) ? classes : [classes];
    const className = classes.reduce((x, next) => x + " " + next, "button-hovered");
    return <div className={className} onClick={onClick}>
        {children ? children : <div className="button">
            {name}
        </div>}
    </div>
};

export default Button;
