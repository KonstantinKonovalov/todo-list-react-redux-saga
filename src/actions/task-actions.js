// @flow

import {
    REQUEST_CREATE_TASK,
    REQUEST_DELETE_TASK,
    REQUEST_EDIT_TASK,
    REQUEST_TOGGLE_COMPLETE_TASK
} from './actionTypes';

import { type ITask } from '../interfaces/ITask';

export const createTask = (task: ITask) => ({
    type: REQUEST_CREATE_TASK,
    payload: task
});

export const deleteTask = (id: string) => ({
    type: REQUEST_DELETE_TASK,
    payload: {
        id
    }
});

export const editTask = (task: ITask) => ({
    type: REQUEST_EDIT_TASK,
    payload: task
});

export const toggleCompleteTask = (id: string, date: string) => ({
    type: REQUEST_TOGGLE_COMPLETE_TASK,
    payload: {
        id,
        date
    }
});
