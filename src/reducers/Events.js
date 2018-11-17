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
    savedEvent: null,
    channels: [],
    images: [],
    scope: EVENTS.PUBLIC
};

export const ActionsTypes = {
    GET_AVAILABLE: "get available events",
    GET_REGISTERED: "get registered user events",
    GET_OWNED: "get owned events",
    STORE_EVENTS: "store events",
    STORE_CREATED: "store created events",
    STORE_AVAILABLE: "store available events",

    SAVE_EVENT: "save new event",

    SEARCH_STREAMERS: "query streamer",
    FETCHED_STREAMER: "fetched streamer",

    SEARCH_IMAGES: "query scryfall images",
    FETCHED_IMAGES: "fetched images",

    CREATE_EVENT: "create new event",

    REGISTER: "register to event",
    UNREGISTER: "unregister from event",
    DID_REGISTER: "updated register / unregister",

    FETCH_FAILED: "fetch failed",
    AVAILABLE_FETCH_FAILED: "available fetch failed",
    CREATED_FETCH_FAILED: "created fetch failed",
    EVENTS_FETCH_FAILED: "events fetch failed",
    EVENTS_CREATE_FAILED: "event creation failed",
};

export const Actions = {
    SAVE_EVENT(event) {return { type: ActionsTypes.SAVE_EVENT, payload: event}},
    REGISTER_TO_EVENT(id) { return {type: ActionsTypes.REGISTER, payload: {eventId: id, id: Storage.Get("id") }}; },
    UNREGISTER_FROM_EVENT(id) { return {type: ActionsTypes.UNREGISTER, payload: {eventId: id, id: Storage.Get("id") }}; },
    GET_AVAILABLE(scope = EVENTS.PUBLIC) { return {type: ActionsTypes.GET_AVAILABLE, payload: {id : Storage.Get("id"), scope: scope } }; },
    get GET_REGISTERED() { return {type: ActionsTypes.GET_REGISTERED, payload: Storage.Get("id") }; },
    get GET_OWNED() { return {type: ActionsTypes.GET_OWNED, payload: Storage.Get("id") }; },
    CREATE_EVENT(data) { return {type: ActionsTypes.CREATE_EVENT, payload: {...data, owner: Storage.Get("id")}} },
    SEARCH_CHANNELS(query = "") { return { type: ActionsTypes.SEARCH_STREAMERS, payload: {query} }},
    SEARCH_IMAGES(query = "") { return { type: ActionsTypes.SEARCH_IMAGES, payload: {query} }},
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

const onEventSave = (state, event) => {
    return {...state, savedEvent: event};
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
        case ActionsTypes.EVENTS_FETCH_FAILED:
            state = {...state, events: []};
            break ;
        case ActionsTypes.DID_REGISTER:
            state = {...state, updated: {ok: true}};
            break ;
        case ActionsTypes.SAVE_EVENT:
            state = onEventSave(state, payload);
            break ;
        case ActionsTypes.CREATED_FETCH_FAILED:
            state = {...state, created: []};
            break ;
        case ActionsTypes.AVAILABLE_FETCH_FAILED:
            state = {...state, list: []};
            break ;
        case ActionsTypes.FETCHED_STREAMER:
            state = {...state, channels: payload.res};
            break ;
        case ActionsTypes.FETCHED_IMAGES:
            state = {...state, images: payload.res};
            break ;
        case ActionsTypes.FETCH_FAILED:
            state = onFetchFailed(state, payload);
            break ;
    }
    return state;
};

export default EventReducer;
