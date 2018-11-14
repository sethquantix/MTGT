import React from 'react';

const Streamers = ({streamers}) => {

    return <div style={{borderLeft: "1px solid #61dafb", marginTop: 10, flex: 1, display: 'flex', alignItems: 'stretch', flexDirection: "column", minHeight: 200, fontSize: 16}}>
        <div style={{textAlign: "center", width: 'auto', height: 60, flexShrink: 0}}>Streamers</div>
        <div style={{flex: 1, marginLeft: 20}}>
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
