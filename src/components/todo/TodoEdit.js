import React, { useState } from 'react';
import * as Api from '../../api';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

function TodoEdit({ id, todo, isCompleted, setIsEdit, setTodoItem }) {
  const [editTodo, setEditTodo] = useState(todo);
  const itemEditHandler = async (e) => {
    e.preventDefault();
    const res = await Api.put(`todos/${id}`, {
      todo: editTodo,
      isCompleted,
    });
    const update = await res.data;
    setTodoItem(update.todo);
    setIsEdit(false);
  };
  const handleChange = (e) => {
    setEditTodo(e.currentTarget.value);
  };
  const todoEditArea = {
    width: '100%',
    minWidth: '14rem',
    display: 'flex',
    justifyContent: 'space-between',
  };
  const todoEditInputStyle = {
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'green',
  };

  return (
    <div style={todoEditArea}>
      <input
        value={editTodo}
        type="text"
        onChange={handleChange}
        placeholder="New ToDo"
        style={todoEditInputStyle}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BsCheckCircleFill
          onClick={itemEditHandler}
          style={{ marginLeft: '0.7rem', color: 'green' }}
        >
          edit
        </BsCheckCircleFill>
        <MdCancel
          onClick={() => setIsEdit(false)}
          style={{ marginLeft: '0.7rem', fontSize: '1.25rem', color: 'red' }}
        >
          cancel
        </MdCancel>
      </div>
    </div>
  );
}

export default TodoEdit;
