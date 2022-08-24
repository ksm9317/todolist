import React, { useState } from 'react';
import * as Api from '../../api';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

function TodoItem({ id, todo, isCompleted, userId }) {
  const [check, setCheck] = useState(isCompleted);

  const checkBoxHandler = async (e) => {
    e.preventDefault();
    const res = await Api.put(`todos/${id}`, {
      todo,
      isCompleted: check ? false : true,
    });
    const update = await res.data;
    setCheck(update.isCompleted);
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
        <div>{todo}</div>
        {/* <div>{isCompleted}</div> */}
        {/* <div>{userId}</div> */}
      </div>
    </>
  );
}

export default TodoItem;
