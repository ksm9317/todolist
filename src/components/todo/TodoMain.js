import React, { useState, useEffect } from 'react';
import * as Api from '../../api';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

function TodoMain() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState(null);

  const handleChange = (e) => {
    setTodo(e.currentTarget.value);
  };

  const todoListData = async () => {
    try {
      const res = await Api.get('todos');
      console.log(res);
      setTodoList(res.data);
    } catch (err) {
      console.log('실패', err);
    }
  };

  useEffect(() => {
    todoListData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "todo" 엔드포인트로 post요청.
      const res = await Api.post('todos', {
        todo,
      });
      console.log(res);
      todoListData();
      setTodo('');
    } catch (err) {
      console.log('실패하였습니다.\n', err);
    }
  };

  return (
    <div>
      <TodoInput
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        todo={todo}
      />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default TodoMain;
