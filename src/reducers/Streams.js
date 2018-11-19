const initialState = {
    streams: [],
    lastUpdate: 0
};


export const ActionsTypes = {
    SET_STREAMS: "SET_STREAMS"
};

const setStreams = (streams, lastUpdate) => {
    return {streams:streams, lastUpdate: lastUpdate}
};

export const getActionStreams = (streams, lastUpadate) => ({
    type: ActionsTypes.SET_STREAMS,
    streams: streams,
    lastUpdate: lastUpadate
});

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.SET_STREAMS:
            state = setStreams(action.streams, action.lastUpdate);
            break;
        default:
            return initialState;
    }
    return state;
}

