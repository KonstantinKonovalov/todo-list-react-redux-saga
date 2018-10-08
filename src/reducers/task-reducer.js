import v4 from 'uuid/v4';

import {
    CREATE_TASK,
    EDIT_TASK,
    DELETE_TASK,
    TOGGLE_COMPLETE_TASK
} from '../actions/actionTypes';

const initialState = [];

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TASK:
            return [
                ...state,
                {
                    ...action.payload,
                    id: v4(),
                    isDone: false
                }
            ];
        case EDIT_TASK:
            return state.map(task => task.id === action.payload.id ?
                action.payload :
                task
            );
        case DELETE_TASK:
            return state.filter(task => task.id !== action.payload.id);
        case TOGGLE_COMPLETE_TASK:
                return state.map(task => task.id === action.payload.id ?
                    {
                        ...task,
                        isDone: !task.isDone,
                        completionDate: action.payload.date
                    } :
                    task
                );
        default:
            return state;
    }
}
