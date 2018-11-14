import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from "Utils/Api";

import {ActionsTypes, EVENTS} from "Reducers/Events";

function *fetchRegisteredEvents({payload}) {
    try {
        const id = payload;
        const res = yield call (Api.Events.getRegistered, id);
        if (res.err) {
            yield put({ type: ActionsTypes.EVENTS_FETCH_FAILED, payload: {err: res.err} });
        } else {
            yield put({ type: ActionsTypes.STORE_EVENTS, payload: {events: res.events }});
        }
    } catch (e) {
        yield put({type: "LOGIN_FAILED", payload: e.message});
    }
}

function *fetchCreatedEvents({payload}) {
    try {
        const id = payload;
        const res = yield call (Api.Events.getCreated, id);
        if (res.err) {
            yield put({ type: ActionsTypes.CREATED_FETCH_FAILED, payload: {err: res.err} });
        } else {
            yield put({ type: ActionsTypes.STORE_CREATED, payload: {events: res.events }});
        }
    } catch (e) {
        yield put({type: "LOGIN_FAILED", payload: e.message});
    }
}

function *fetchAvailableEvents({payload}) {
    try {
        const res = yield call (Api.Events.getAvailable, payload);
        if (res.err) {
            yield put({ type: ActionsTypes.AVAILABLE_FETCH_FAILED, payload: {err: res.err} });
        } else {
            yield put({ type: ActionsTypes.STORE_AVAILABLE, payload: {events: res.events }});
        }
    } catch (e) {
        yield put({type: "LOGIN_FAILED", payload: e.message});
    }
}

function *createEvent({payload}) {
    try {
        const res = yield call (Api.Events.create, payload);
        if (res.err) {
            yield put({ type: ActionsTypes.EVENTS_CREATE_FAILED, payload: {err: res.err}});
        } else {
            yield put({ type: ActionsTypes.STORE_CREATED, payload: {events: res.events}});
        }
    } catch (e) {
        yield put({ type: ActionsTypes.EVENTS_CREATE_FAILED, payload: {err: res.err}});
    }

}

function *fetchStreamers({payload}) {
    const res = yield call (Api.Twitch.searchChannel, payload);
    if (res.err)
        yield put({ type: ActionsTypes.FETCHED_STREAMER, payload: {res: []}});
    else
        yield put({ type: ActionsTypes.FETCHED_STREAMER, payload: {res: res.channels.map(({display_name, logo}) => ({display_name, logo}))}});
}

function *fetchImages({payload}) {
    const res = yield call (Api.Scryfall.searchImage, payload);
    if (res.err)
        yield put({ type: ActionsTypes.FETCHED_IMAGES, payload: {res: []}});
    else
        yield put({ type: ActionsTypes.FETCHED_IMAGES, payload: {res: res.data}});
}

export function *fetchRegisteredSaga() {
    yield takeLatest(ActionsTypes.GET_REGISTERED, fetchRegisteredEvents);
}

export function *fetchCreatedSaga() {
    yield takeLatest(ActionsTypes.GET_OWNED, fetchCreatedEvents);
}

export function *fetchAvailableSaga() {
    yield takeLatest(ActionsTypes.GET_AVAILABLE, fetchAvailableEvents);
}

export function *fetchStreamersSaga() {
    yield takeLatest(ActionsTypes.SEARCH_STREAMERS, fetchStreamers);
}

export function *createEventSaga() {
    yield takeEvery(ActionsTypes.CREATE_EVENT, createEvent);
}

export function *fetchImageSaga() {
    yield takeLatest(ActionsTypes.SEARCH_IMAGES, fetchImages);
}
