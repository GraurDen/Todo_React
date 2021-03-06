import React, { useEffect } from 'react';
import { useState } from 'react';
import { Checkbox, Typography, Input, Button, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;

const DATE_OPTIONS = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', }

const TodoItem = ({ item, editTask, removeTask, toggleTask }) => {

    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(item.name);

    const itemCreatedAt = new Date(item.createdAt).toLocaleDateString('ru-RU', DATE_OPTIONS);

    // Change task status
    const handleChange = () => {
        toggleTask(item.id, !item.done);
    };

    // Toggle task to 'edit mode'
    const toggleEditMode = () => {
        setEditMode(true);
    };

    useEffect(() => {
        setUserInput(item.name)
    }, [item])

    // Deactivate 'edit mode' and update task name
    const onBlur = (e) => {
        const reg = new RegExp(/^\s*$/);

        if (reg.test(e.currentTarget.value) && editMode === true) {
            setUserInput(item.name)
            e.target.blur();
            setEditMode(false);
            return
        }

        if (e.currentTarget.value === item.name) {
            e.target.blur();
            setEditMode(false);
            return
        }

        if (e.currentTarget.value) {
            editTask(item.id, userInput)
        }

        setUserInput(
            e.currentTarget.value === '' ? item.name : e.currentTarget.value
        );

        setEditMode(false);
    };


    // Set new task name
    const handleTaskName = (e) => {
        setUserInput(e.currentTarget.value);
    };


    // Discard changes input 'onBlur' and on 'Esc' click
    const onKeyDown = (e) => {
        // 'Escape'
        if (e.keyCode === 27) {
            setUserInput(item.name);
            e.target.blur(); // Снять фокус
        }
        // 'Enter'
        if (e.keyCode === 13) {
            setUserInput(
                e.currentTarget.value === '' ? item.name : e.currentTarget.value
            );
            e.target.blur();
        }
    };

    const handleRemove = (e) => {
        e.currentTarget.disabled = true;
        removeTask(item.id);
    };

    return (
        <div>
            <div
                style={{
                    fontFamily: 'Montserrat',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                {/* Checkbox */}
                <Checkbox
                    style={{ marginRight: '10px' }}
                    onChange={handleChange}
                    checked={item.done} />

                {/* User input */}

                {editMode
                    ? <div style={{ width: '100%', maxWidth: '200px' }}>
                        <Input
                            type='text'
                            placeholder={item.name}
                            onBlur={onBlur}
                            autoFocus={true}
                            onChange={handleTaskName}
                            onKeyDown={onKeyDown}
                        />
                    </div>

                    : <div
                        style={{ marginRight: '10px', width: '100%', maxWidth: '200px' }}
                        onClick={toggleEditMode}>
                        <Text>{userInput}</Text>
                    </div>
                }

                {/* Creates at */}
                <Text
                    style={{
                        fontSize: '11px',
                        flexGrow: '1',
                        textAlign: 'right',
                    }}
                    type='secondary'>
                    {itemCreatedAt}
                </Text>

                {/* Delete */}
                <Button
                    style={{ marginLeft: 'auto' }}
                    icon={<DeleteOutlined />}
                    danger
                    type='text'
                    onClick={handleRemove} />
            </div>
            <Divider style={{ margin: '10px 0 10px 0' }} />
        </div>
    );
};

export default TodoItem
