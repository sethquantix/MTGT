import React from 'react';

import {MenuItem, Select as MaterialSelect } from "@material-ui/core";

const Select = ({style, items, value, onChange, none = false }) => {
    return <MaterialSelect style={style} onChange={onChange} value={value} displayEmpty
    >
        {none && <MenuItem value=""><em>None</em></MenuItem>}
        {items.map(x => <MenuItem value={x.value}>{x.label}</MenuItem>)}
    </MaterialSelect>

};

export default Select;
