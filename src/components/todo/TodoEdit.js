import React, { useState } from 'react';
import * as Api from '../../api';

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

  return (
    <>
      <h4>TodoEdit</h4>
      <input
        value={editTodo}
        type="text"
        onChange={handleChange}
        placeholder="New ToDo"
      />
      <button onClick={itemEditHandler}>완료</button>
      <button onClick={() => setIsEdit(false)}>취소</button>
    </>
  );
}

export default TodoEdit;
