import React from 'react';
import Search from "Components/NewEvent/Search";

const Streamers = ({query, select, search, channels, streamers}) => {

    return <div style={{borderLeft: "1px solid #61dafb", marginTop: 10, flex: 1, display: 'flex', alignItems: 'stretch', flexDirection: "column", minHeight: 200, fontSize: 16}}>
        <div style={{textAlign: "center", width: 'auto', height: 30, flexShrink: 0}}>Streamers</div>
        <div style={{display: 'flex', flex: 1, marginLeft: 20, flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                <div style={{margin: '0px 10px'}}>Add streamer:</div>
                <Search menu={{backgroundColor: "#282c34", left: 0, top: 40, position: "absolute"}} query={query} onSelect={select} onChange={search} results={channels} />
            </div>
            {streamers.map(x => {
            return <div style={{display: 'flex', alignItems: 'center', margin: "5px 0px"}}>
                <img style={{width: 32, height: 32, borderRadius: 16, marginRight: 10}} src={x.logo} />
                <div>{x.display_name}</div>
            </div>
        })}
        </div>
    </div>
};

export default Streamers;
