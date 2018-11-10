import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from "Utils/Api";

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

function *twitchProfile({payload}) {
    try {
        const res = yield call(Api.Twitch.twitchProfile, payload);
        console.log(res);
        if (res.err) {
            console.warn(res.err);
        } else
            yield put({type: "SET_TWITCH_PROFILE", payload: res});
    } catch (e) {
        console.warn(e.message);
    }
}

export function *twitchLoginSaga() {
    yield takeLatest("TWITCH_AUTH", twitchAuth);
}

export function *loginSaga() {
    yield takeLatest("LOGIN", login);
}

export function *iconSaga() {
    yield takeLatest("TWITCH_PROFILE", twitchProfile);
}
