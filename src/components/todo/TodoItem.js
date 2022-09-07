import React, { useState } from 'react';
import * as Api from '../../api';
import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
} from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TodoEdit from './TodoEdit';

function TodoItem({ id, todo, isCompleted, userId, setTodoList }) {
  const [check, setCheck] = useState(isCompleted);
  const [todoItem, setTodoItem] = useState(todo);
  const [isEdit, setIsEdit] = useState(false);

  const checkBoxHandler = async (e) => {
    e.preventDefault();
    const res = await Api.put(`todos/${id}`, {
      todo,
      isCompleted: check ? false : true,
    });
    const update = await res.data;
    setCheck(update.isCompleted);
  };

  const itemDeleteHandler = async (e) => {
    e.preventDefault();
    await Api.del(`todos/${id}`);
    const update = await Api.get('todos');
    setTodoList(update.data);
  };
  const todoItemStyle = {
    marginBottom: '1rem',
    padding: '0.3rem 1rem',
    borderRadius: '0.3rem',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff7a5',
  };
  const checkIconStyle = {
    marginRight: '0.5rem',
    display: 'flex',
  };

  return (
    <div style={todoItemStyle}>
      <div style={checkIconStyle}>
        {check ? (
          <MdOutlineCheckCircleOutline
            onClick={checkBoxHandler}
            style={{ fontSize: '1.5rem', color: 'green' }}
          />
        ) : (
          <MdRadioButtonUnchecked
            onClick={checkBoxHandler}
            style={{ fontSize: '1.5rem', color: 'green' }}
          />
        )}
      </div>
      {isEdit ? (
        <>
          <TodoEdit
            id={id}
            todo={todo}
            isCompleted={isCompleted}
            setTodoItem={setTodoItem}
            setIsEdit={setIsEdit}
          />
        </>
      ) : (
        <div
          style={{
            width: '100%',
            minWidth: '14rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {check ? (
            <div style={{ textDecoration: 'line-through', color: 'gray' }}>
              {todoItem}
            </div>
          ) : (
            <div style={{ wordBreak: 'break-word' }}>{todoItem}</div>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiEdit
              onClick={() => setIsEdit(true)}
              style={{ marginLeft: '1rem', color: 'green' }}
            ></FiEdit>
            <RiDeleteBin6Line
              onClick={itemDeleteHandler}
              style={{ marginLeft: '1rem', color: 'red' }}
            ></RiDeleteBin6Line>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
