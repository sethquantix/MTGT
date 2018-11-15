import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from "Utils/Api";
import {ActionsTypes} from "Reducers/Profile";

function *twitchAuth({payload}) {
    try {
        const res = yield call(Api.Twitch.twitchAuth, payload);
        console.log("twitch Auth: " + res);
        if (res.err) {
            yield put({type: "LOGIN_FAILED", payload: res.err.name});
        }
        yield put({type: "AUTH_OK", payload: res});
    } catch (e) {
        yield put({type: "LOGIN_FAILED", payload: e.message});
    }
}

function *login({payload}) {
    console.log('trying login ' + payload);
    try {
        const res = yield call(Api.Twitch.twitchLogin, payload);
        console.log(res);
        if (res.err) {
            yield put({type: "LOGIN_FAILED", payload: res.err.name});
        }
        yield put({type: "LOGIN_SUCCEED", payload: res});
    } catch (e) {
        yield put({type: "LOGIN_FAILED", payload: e.message});
    }
}

function *getProfile({payload}) {
    try {
        const res = yield call(Api.Profile.getProfile, payload);
        console.log(res);
        if (res.err) {
            console.warn(res.err);
        } else {
            yield put({type: ActionsTypes.SET_PROFILE, payload: res});
        }
    } catch (e) {
        console.warn(e.message);
    }
}

function *editMagicHandle({payload}) {
    try {
        const res = yield call(Api.Profile.handle, payload);
        if (res.err) {
            yield put({type: ActionsTypes.UPDATE_ERROR, payload: {err: res.err} });
        } else {
            yield put({type: ActionsTypes.SET_PROFILE, payload: res});
        }
    } catch (e) {
        yield put({type: ActionsTypes.UPDATE_ERROR, payload: {err: e.msg } });
    }
}

function *editMagicCode({payload}) {
    try {
        const res = yield call(Api.Profile.code, payload);
        if (res.err) {
            yield put({type: ActionsTypes.UPDATE_ERROR, payload: {err: res.err} });
        } else {
            yield put({type: ActionsTypes.SET_PROFILE, payload: res});
        }
    } catch (e) {
        yield put({type: ActionsTypes.UPDATE_ERROR, payload: {err: e.msg} });
    }
}

export function *twitchLoginSaga() {
    yield takeLatest("TWITCH_AUTH", twitchAuth);
}

export function *loginSaga() {
    yield takeLatest("LOGIN", login);
}

export function *getProfileSaga() {
    yield takeLatest(ActionsTypes.GET_PROFILE, getProfile);
}

export function *editHandleSaga() {
    yield takeLatest(ActionsTypes.UPDATE_HANDLE, editMagicHandle);
}

export function *editCodeSaga() {
    yield takeLatest(ActionsTypes.UPDATE_CODE, editMagicCode);
}
