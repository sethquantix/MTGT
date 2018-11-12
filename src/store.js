import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import Profile from 'Reducers/Profile';
import Events from 'Reducers/Events';

import { twitchLoginSaga, loginSaga, iconSaga } from "Sagas/Profile";

const reducer = combineReducers({
    ProfileReducer: Profile,
    EventsReducer: Events,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware));

sagaMiddleware.run(twitchLoginSaga);
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(iconSaga);

export default store;
