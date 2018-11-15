import Storage from "Root/Storage";

const initialState = {
    connected: false,
    profile: { twitch: {}},
    error: null,
    token: null,
    connecting: false
};

export const ActionsTypes = {
    AUTH_SUCCEED: "AUTH_OK",
    LOGIN_SUCCEED: "LOGIN_SUCCEED",
    LOGIN_FAILED: "LOGIN_FAILED",
    TWITCH_AUTH: "TWITCH_AUTH",
    LOGIN: "LOGIN",
    GET_PROFILE: "GET_PROFILE",
    SET_PROFILE: "SET_PROFILE",
    LOGOUT: "logout",
    UPDATE_HANDLE: "update magic handle",
    UPDATE_CODE: "update magic friend code",
    UPDATE_ERROR: "update error"
};

const actionLogin = (state, payload) => {
    return {...state, connecting: true, token: payload};
};

const actionLoginSucceed = (state, {data}) => {
    return {...state, connected: true, connecting: false, token: data, profile: {}};
};

const actionAuthSucceed = (state, payload) => {
    Storage.Store("id", payload.data);
    return {...state, connected: true, profile: {}, token: payload.data, connecting: false};
};

const actionSetProfile = (state, profile) => {
    return {...state, profile: {...state.profile, ...profile, twitch: {...state.profile.twitch, ...profile.twitch}}};
}; // WARN THAT CAN BREAK IF PROFILE GETS MORE NESTED

const actionLoginFailed = (state, payload) => {
    console.warn(payload);
    return {...state, connecting: false,token: null };
};

const actionLogout = (state) => {
    return {...state, connected: false, token: null };
};

export const getActionUpdateHandle = v => ({type: ActionsTypes.UPDATE_HANDLE, payload: { handle: v} });
export const getActionUpdateCode = v => ({type: ActionsTypes.UPDATE_CODE, payload: { code: v} });

export const getActionTwitchAuth = code => ({type: ActionsTypes.TWITCH_AUTH, payload: code});
export const getActionLogin = token => ({type: ActionsTypes.LOGIN, payload: token});
export const getActionProfile = () => ({type: ActionsTypes.GET_PROFILE, payload: Storage.Get("id")});
export const getActionLogout = () => ({type: ActionsTypes.LOGOUT, payload: {}});

export const setActionLoginError = msg => ({type: ActionsTypes.LOGIN_FAILED, payload: msg});

export default ( state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.LOGIN:
        case ActionsTypes.TWITCH_AUTH:
            state = actionLogin(state, action.payload);
            break ;
        case ActionsTypes.LOGOUT:
            state = actionLogout(state);
            break ;
        case ActionsTypes.AUTH_SUCCEED:
            state = actionAuthSucceed(state, action.payload);
            break ;
        case ActionsTypes.SET_PROFILE:
            state = actionSetProfile(state, action.payload);
            break ;
        case ActionsTypes.LOGIN_SUCCEED:
            state = actionLoginSucceed(state, action.payload);
            break ;
        case ActionsTypes.LOGIN_FAILED:
            state = actionLoginFailed(state, action.payload);
            break ;
    }
    console.log(action, state);
    return state;
}
