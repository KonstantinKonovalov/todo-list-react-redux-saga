import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import * as moment from 'moment';

import { App } from './App';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { taskReducer } from './reducers/task-reducer';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

import { loadState, saveState } from './localstorage/localstorage';

import 'antd/dist/antd.css';
import 'moment/locale/ru';
moment.locale('ru');


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
    combineReducers({
        tasks: taskReducer
    }),
    persistedState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);

store.subscribe(() => {
    saveState(store.getState());
});

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
