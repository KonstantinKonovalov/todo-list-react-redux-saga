import React from 'react';
import { TodoItem } from "../todo-item/TodoItem";
import './todo-list.scss';

export const TodoList = (props) => (
    <div className="todo-list">
        {props.tasks.map(task => (
            <TodoItem
                key={task.id}
                task={task}
                handleDeleteTask={props.onDeleteTask}
                handleEditTask={props.onEditTask}
                handleToggleCompleteTask={props.onToggleCompleteTask}
            />
        ))}
    </div>
);
