const initialState = {
    streams: []
};


export const ActionsTypes = {
    PUSH_STREAM: "PUSH_STREAM",
    REMOVE_STREAM: "REMOVE_STREAM"
};

const addStream = (state, stream) => ({...state, streams: [...state.streams, stream]});

const removeStream = (state, stream) => ({
    ...state, streams:
        state.streams.filter(current => {
            return current["display_name"] !== stream["display_name"]
        })
});

export const getAddStream = (stream) => ({
    type: ActionsTypes.PUSH_STREAM,
    stream: stream
});

export const getRemoveStream = (stream) => ({
    type: ActionsTypes.REMOVE_STREAM,
    stream: stream
});

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.PUSH_STREAM:
            state = addStream(state, action.stream);
            break;
        case ActionsTypes.REMOVE_STREAM:
            state = removeStream(state, action.stream);
            break;
        default:
            return initialState;
    }
    console.log(state);
    return state;
}

