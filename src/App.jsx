import React, { Component } from 'react';
import './App.scss';

import { connect } from 'react-redux';
import { createTask, deleteTask, editTask, toggleCompleteTask } from './actions/task-actions';

import { TodoList } from './components/todo-list/TodoList';
import { TodoForm } from './components/todo-form/TodoForm';
import { Modal, Button } from 'antd';

import * as moment from 'moment';

class AppFn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editTask = this.editTask.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.toggleCompleteTask = this.toggleCompleteTask.bind(this);
    }

    createTask(task) {
        task.id ?
            this.props.editTask(task) :
            this.props.createTask(task);
        this.toggleModal();
        this.setState({
            editedTask: null
        });
    }

    deleteTask(id) {
        this.props.deleteTask(id);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    cancelEdit() {
        this.toggleModal();
        this.setState({
            editedTask: undefined
        });
    }

    editTask(task, e) {
        e.stopPropagation();

        this.setState({
            editedTask: task
        });
        this.toggleModal();
    }

    toggleCompleteTask(id) {
        this.props.toggleCompleteTask(id, moment())
    }

    render() {
        return (
        <div className="App">
            <Button onClick={this.toggleModal}>
                Создать задачу
            </Button>
            <Modal
                visible={this.state.isModalOpen}
                footer={null}
                onCancel={this.cancelEdit}
            >    
                <TodoForm
                    onCreateTask={this.createTask}
                    editedTask={this.state.editedTask}
                />
            </Modal>
            <TodoList
                tasks={this.props.tasks}
                onDeleteTask={this.deleteTask}
                onEditTask={this.editTask}
                onToggleCompleteTask={this.toggleCompleteTask}
            />
        </div>
        );
    }
}

export const App = connect(state => ({
    tasks: state.tasks
}), {
    createTask,
    deleteTask,
    editTask,
    toggleCompleteTask
})(AppFn);
