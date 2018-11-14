import React from 'react';
import {RadioGroup as MaterialGroup, FormControlLabel, Radio } from "@material-ui/core";

const RadioGroup = ({classes, value, onChange, row = true, valueFromItem, items = [], labelFromItem }) => {
    return <MaterialGroup classes={classes} row={row} value={value} onChange={onChange}>
        {items.map(e => {
            return <FormControlLabel
                control={<Radio />}
                value={valueFromItem(e)}
                label={labelFromItem(e)} />
        })}
    </MaterialGroup>
};

export default RadioGroup;
