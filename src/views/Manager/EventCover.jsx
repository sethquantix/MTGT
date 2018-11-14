import React from 'react';

import Scryfall from "Components/Scryfall";
import Search from "Components/NewEvent/Search";

const EventCover = ({onChange, onSelect, query, set, code, results }) => {
    return <div className="Event-new-cover-container">
        <div className="Event-new-cover-selector">
            <Scryfall container="Event-image-cover-container" image="Event-new-cover" set={set} code={code}/>
            <Search query={query} onChange={onChange} onSelect={onSelect} results={results.map(x => ({display_name: x}))} />
        </div>
    </div>
}

export default EventCover;
