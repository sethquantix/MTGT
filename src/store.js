import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import Profile from 'Reducers/Profile';
import Events from 'Reducers/Events';

import { twitchLoginSaga, loginSaga, iconSaga } from "Sagas/Profile";
import {fetchAvailableSaga, fetchCreatedSaga, fetchRegisteredSaga} from "Sagas/Events";

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
sagaMiddleware.run(fetchRegisteredSaga);
sagaMiddleware.run(fetchCreatedSaga);
sagaMiddleware.run(fetchAvailableSaga);

export default store;
