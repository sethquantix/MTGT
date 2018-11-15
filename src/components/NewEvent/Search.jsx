import React from 'react';
import Autocomplete from "react-autocomplete";

const Search = ({ menu = {}, query, onChange, onSelect, results }) => {

    const menuStyle = {zIndex: 999, position: 'fixed', marginLeft: 0, marginTop: 0, backgroundColor: '#0F1726', color: '#61dafb', borderRadius: "0px 0px 10px 10px", overflow: 'visible '};

    return <Autocomplete
        wrapperStyle={{position: 'relative'}}
        menuStyle={menu}
        inputProps={{className: "autocomplete", style: {backgroundColor: 'transparent', height: 30, color: 'white', border: 'none', borderBottom: '1px solid #61dafb'}}}
        getItemValue={(item) => item.display_name}
        items={results}
        renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? '#423070' : '' }}>
                {item.display_name}
            </div>
        }
        renderMenu={(items, value, style) => {
            console.log(menu);
            return <div style={{ minWidth: style.minWidth, ...menu }} children={items}/>
        }}
        value={query}
        onChange={e => onChange(e.target.value)}
        onSelect={onSelect}
    />;
};

export default Search;
