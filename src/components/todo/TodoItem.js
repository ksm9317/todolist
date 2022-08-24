import React, { useState } from 'react';
import * as Api from '../../api';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
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

  return (
    <>
      <div style={{ display: 'flex' }}>
        {check ? (
          <MdCheckBox onClick={checkBoxHandler} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={checkBoxHandler} />
        )}
        {/* <div>{id}</div> */}
        <div style={{ display: 'flex' }}>
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
            <>
              <div>{todoItem}</div>
              <button onClick={() => setIsEdit(true)}>수정</button>
            </>
          )}
        </div>
        <button onClick={itemDeleteHandler}>삭제</button>
        {/* <div>{isCompleted}</div> */}
        {/* <div>{userId}</div> */}
      </div>
    </>
  );
}

export default TodoItem;
