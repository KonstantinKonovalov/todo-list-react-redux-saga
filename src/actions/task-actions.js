import {
    REQUEST_CREATE_TASK,
    REQUEST_DELETE_TASK,
    REQUEST_EDIT_TASK,
    REQUEST_TOGGLE_COMPLETE_TASK
} from './actionTypes';

export const createTask = (task) => ({
    type: REQUEST_CREATE_TASK,
    payload: task
});

export const deleteTask = (id) => ({
    type: REQUEST_DELETE_TASK,
    payload: {
        id
    }
});

export const editTask = (task) => ({
    type: REQUEST_EDIT_TASK,
    payload: task
});

export const toggleCompleteTask = (id, date) => ({
    type: REQUEST_TOGGLE_COMPLETE_TASK,
    payload: {
        id,
        date
    }
});
