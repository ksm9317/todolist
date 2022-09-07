import TodoItem from './TodoItem';

function TodoList({ todoList, setTodoList }) {
  return (
    <>
      <h2>Todo List</h2>
      {todoList?.length === 0 ? (
        <div>할 일을 등록해주세요.</div>
      ) : (
        <>
          {todoList?.map((list) => (
            <TodoItem
              key={list.id}
              id={list.id}
              todo={list.todo}
              isCompleted={list.isCompleted}
              userId={list.userId}
              setTodoList={setTodoList}
            />
          ))}
        </>
      )}
    </>
  );
}

export default TodoList;
