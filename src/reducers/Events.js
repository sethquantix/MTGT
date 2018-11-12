import Storage from "Root/Storage";

export const EVENTS = {
    PUBLIC: "public",
    PRIVATE: "private",
    SHARED: "shared"
};

const defaultState = {
    events: null,
    created: null,
    list: null,
    scope: EVENTS.PUBLIC
};

export const ActionsTypes = {
    GET_AVAILABLE: "get available events",
    GET_REGISTERED: "get registered user events",
    GET_OWNED: "get owned events",
    STORE_EVENTS: "store events",
    STORE_CREATED: "store created events",
    STORE_AVAILABLE: "store available events",
    FETCH_FAILED: "fetch failed",
};

export const Actions = {
    GET_AVAILABLE(scope = EVENTS.PUBLIC) { return {type: ActionsTypes.GET_AVAILABLE, payload: {id : Storage.Get("id"), scope: scope } }; },
    get GET_REGISTERED() { return {type: ActionsTypes.GET_REGISTERED, payload: Storage.Get("id") }; },
    get GET_OWNED() { return {type: ActionsTypes.GET_OWNED, payload: Storage.Get("id") }; }
};

const onFetchFailed = (state, {err}) => {
    return {...state, error: err};
};

const onStoreEvents = (state, {events}) => {
    return {...state, events: events};
};

const onStoreAvailable = (state, {events}) => {
    return {...state, list: events};
};

const onStoreCreated = (state, {events}) => {
    return {...state, created: events};
};

const EventReducer = (state = defaultState, {type, payload}) => {

    switch (type) {
        case ActionsTypes.GET_AVAILABLE:
            state = {...state, scope: payload.scope, list: null };
            break ;
        case ActionsTypes.STORE_AVAILABLE:
            state = onStoreAvailable(state, payload);
            break ;
        case ActionsTypes.STORE_EVENTS:
            state = onStoreEvents(state, payload);
            break ;
        case ActionsTypes.STORE_CREATED:
            state = onStoreCreated(state, payload);
            break ;
        case ActionsTypes.FETCH_FAILED:
            state = onFetchFailed(state, payload);
            break ;
    }
    return state;
};

export default EventReducer;
