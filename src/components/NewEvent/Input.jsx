import React from 'react';

const Input = ({ classes = {}, name, placeholder= "", type = "text", value, onChange }) => {
    const container = "component-input-container " + (classes.container || "");
    const nameClass = "component-input-name " + (classes.name || "");
    const input = "component-input " + (classes.input || "");

    return <div className={container} >
        <div className={nameClass}>{name}</div>
        <input placeholder={placeholder} className={input} type={type} value={value} onChange={onChange} />
    </div>
};

export default Input;
