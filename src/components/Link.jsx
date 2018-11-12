import React from 'react';
import {Link as RouterLink, withRouter } from "react-router-dom";

const Link = ({ name, path, classes, replace =false, location, children }) => {

    const selected = location.pathname === path;
    classes = Array.isArray(classes) ? classes : [classes];
    if (selected)
        classes.push("button-selected");
    const className = classes.reduce((x, next) => x + " " + next, "");
    return <RouterLink to={path} replace={replace} className={className}
                       style={{ textDecoration: 'none', color: selected ? "cornflowerblue" : "white" }}>
        {children ? children : <div className="button">{name}</div>}
            </RouterLink>
};

export default withRouter(Link);
