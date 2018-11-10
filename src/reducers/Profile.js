
const initialState = {
    connected: false,
    profile: {},
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
    GET_TWITCH_PROFILE: "TWITCH_PROFILE",
    SET_TWITCH_PROFILE: "SET_TWITCH_PROFILE",
    LOGOUT: "logout"
};

const actionLogin = (state, payload) => {
    return {...state, connecting: true, token: payload};
}

const actionLoginSucceed = (state) => {
    return {...state, connected: true, connecting: false, profile: {}};
};

const actionAuthSucceed = (state, payload) => {
    return {...state, connected: true, profile: {}, token: payload.data, connecting: false};
};

const actionSetTwitch = (state, twitch) => {
    return {...state, profile: {...state.profile, twitch: twitch}};
};

const actionLoginFailed = (state, payload) => {
    console.warn(payload);
    return {...state, connecting: false,token: null };
};

export const getActionTwitchAuth = code => ({type: ActionsTypes.TWITCH_AUTH, payload: code});
export const getActionLogin = token => ({type: ActionsTypes.LOGIN, payload: token});
export const getActionTwitchProfile = token => ({type: ActionsTypes.GET_TWITCH_PROFILE, payload: token});

export const setActionLoginError = msg => ({type: ActionsTypes.LOGIN_FAILED, payload: msg});

export default ( state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.LOGIN:
        case ActionsTypes.TWITCH_AUTH:
            state = actionLogin(state, action.payload);
            break ;
        case ActionsTypes.AUTH_SUCCEED:
            state = actionAuthSucceed(state, action.payload);
            break ;
        case ActionsTypes.SET_TWITCH_PROFILE:
            state = actionSetTwitch(state, action.payload);
            break ;
        case ActionsTypes.LOGIN_SUCCEED:
            state = actionLoginSucceed(state);
            break ;
        case ActionsTypes.LOGIN_FAILED:
            state = actionLoginFailed(state, action.payload);
            break ;
    }
    console.log(action, state);
    return state;
}
