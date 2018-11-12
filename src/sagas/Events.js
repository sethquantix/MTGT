import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from "Utils/Api";

import {ActionsTypes, EVENTS} from "Reducers/Events";

function *fetchRegisteredEvents({payload}) {
    try {
        const id = payload;
        const res = yield call (Api.Events.getRegistered, id);
        if (res.err) {
            yield put({ type: ActionsTypes.FETCH_FAILED, payload: {err: res.err} });
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
            yield put({ type: ActionsTypes.FETCH_FAILED, payload: {err: res.err} });
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
            yield put({ type: ActionsTypes.FETCH_FAILED, payload: {err: res.err} });
        } else {
            yield put({ type: ActionsTypes.STORE_AVAILABLE, payload: {events: res.events }});
        }
    } catch (e) {
        yield put({type: "LOGIN_FAILED", payload: e.message});
    }
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
