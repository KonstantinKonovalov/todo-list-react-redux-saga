import React from 'react';
import './todo-item.scss';

import * as moment from 'moment';

export const TodoItem = (props) => (
    <div
        className={`todo-item ${props.task.isDone ? 'todo-item_done' : ''}`}
        onClick={props.handleToggleCompleteTask.bind(null, props.task.id)}
    >
        <span>
            <b>Название:</b> {props.task.name}
        </span>
        <span>
            <b>Описание:</b> {props.task.description}
        </span>
        {props.task.dateToComplete &&
            <span>
                <b>Когда нужно выполнить:</b> {moment(props.task.dateToComplete).format('DD.MM.YYYY')}
            </span>
        }
        {props.task.isDone &&
            <span>
                <b>Дата выполнения:</b> {moment(props.task.completionDate).format('DD.MM.YYYY HH:mm')}
            </span>
        }
        <span
            className="todo-item__delete-icon"
            onClick={props.handleDeleteTask.bind(null, props.task.id)}
        >
            X
        </span>
        <span
            className="todo-item__edit-icon"
            onClick={props.handleEditTask.bind(null, props.task)}
        >
            &#9998;
        </span>
    </div>
);

