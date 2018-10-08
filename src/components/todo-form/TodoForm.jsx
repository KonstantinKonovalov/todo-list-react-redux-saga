import React from 'react';
import { Form, Input, Button, DatePicker, Select, Row } from 'antd';
import * as moment from 'moment';

import './todo-form.scss'

const importanceValues = [
    {
        value: 'ordinary',
        label: 'Обычная'
    },
    {
        value: 'important',
        label: 'Важная'
    },
    {
        value: 'very important',
        label: 'Очень важная'
    }
];

class TodoFormFn extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hasErrors(fieldsError) {
        const { isFieldsTouched } = this.props.form;

        return !isFieldsTouched() ||
            Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.onCreateTask({
                    ...values,
                    id: this.props.editedTask && this.props.editedTask.id
                });
                this.props.form.resetFields();
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError } = this.props.form;
        const nameError = getFieldError('name');
        const descriptionError = getFieldError('description');
        const importanceError = getFieldError('importance');

        return (
            <div className="todo-form">
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Row>
                        <Form.Item
                            validateStatus={nameError ? 'error' : ''}>
                            {getFieldDecorator('name', {
                                initialValue: this.props.editedTask && this.props.editedTask.name,
                                rules: [{
                                    required: true,
                                    message: 'Имя обязательно'
                                }],
                            })(
                                <Input placeholder="Имя" />
                            )}
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            validateStatus={descriptionError ? 'error' : ''}>
                            {getFieldDecorator('description', {
                                initialValue: this.props.editedTask && this.props.editedTask.description,
                                rules: [{
                                    required: true,
                                    message: 'Описание обязательно'
                                }]
                            })(
                                <Input placeholder="Описание" />
                            )}
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item
                            validateStatus={importanceError ? 'error' : ''}
                        >
                            {getFieldDecorator('importance', {
                                initialValue: this.props.editedTask && this.props.editedTask.importance,
                                rules: [{
                                    required: true,
                                    message: 'Отметьте важность'
                                }]
                            })(
                                <Select
                                    placeholder="Важность"
                                >
                                    {importanceValues.map((v, i) => (
                                        <Select.Option value={v.value} key={i}>
                                            {v.label}
                                        </Select.Option>
                                    ))
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item>
                            {getFieldDecorator('dateToComplete', {
                                initialValue: this.props.editedTask && this.props.editedTask.dateToComplete && moment(this.props.editedTask.dateToComplete)
                            })(
                                <DatePicker placeholder="Когда выполнить" />
                            )}
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={this.hasErrors(getFieldsError())}
                            >
                                {
                                    this.props.editedTask && this.props.editedTask.id ?
                                    'Редактировать задачу' :
                                    'Создать задачу'
                                }
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        );
    }
}

export const TodoForm = Form.create()(TodoFormFn);
