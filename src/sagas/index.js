import {
    EDIT_TASK,
    CREATE_TASK,
    DELETE_TASK,
    TOGGLE_COMPLETE_TASK,
    REQUEST_CREATE_TASK,
    REQUEST_EDIT_TASK,
    REQUEST_DELETE_TASK,
    REQUEST_TOGGLE_COMPLETE_TASK
} from '../actions/actionTypes'

import { takeEvery, put, fork, all } from 'redux-saga/effects';

function* taskSave(action) {
    yield put({
        type: action.payload.id ? EDIT_TASK : CREATE_TASK,
        payload: action.payload
    });
}

function* taskDelete(action) {
    yield put({
        type: DELETE_TASK,
        payload: action.payload
    });
}

function* taskComplete(action) {
    yield put({
        type: TOGGLE_COMPLETE_TASK,
        payload: action.payload
    });
}

export function* rootSaga() {
    yield all([
        fork(takeEvery, [REQUEST_CREATE_TASK, REQUEST_EDIT_TASK], taskSave),
        fork(takeEvery, REQUEST_DELETE_TASK, taskDelete),
        fork(takeEvery, REQUEST_TOGGLE_COMPLETE_TASK, taskComplete)
    ])
};
