import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import Profile from 'Reducers/Profile';
import Events from 'Reducers/Events';
import Streams from 'Reducers/Streams'

import * as ProfileSagas from "Sagas/Profile";
import * as EventsSagas from "Sagas/Events";

const toArray = sagas => Object.keys(sagas).map(e => sagas[e]);

const sagas = [...toArray(ProfileSagas), ...toArray(EventsSagas)];

const reducer = combineReducers({
    StreamReducer:Streams,
    ProfileReducer: Profile,
    EventsReducer: Events,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware));

sagas.forEach(x => sagaMiddleware.run(x));

export default store;
