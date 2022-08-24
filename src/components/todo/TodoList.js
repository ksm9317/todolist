import TodoItem from './TodoItem';

function TodoList({ todoList }) {
  return (
    <>
      <h2>TodoList</h2>
      {todoList?.map((list) => (
        // <div key={list.id} style={{ display: 'flex' }}>
        <TodoItem
          key={list.id}
          id={list.id}
          todo={list.todo}
          isCompleted={list.isCompleted}
          userId={list.userId}
        />
        // </div>
      ))}
    </>
  );
}

export default TodoList;
