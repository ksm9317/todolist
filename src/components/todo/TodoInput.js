function TodoInput({ handleSubmit, handleChange, todo }) {
  return (
    <>
      <h2>TodoInput</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={todo}
          type="text"
          onChange={handleChange}
          placeholder="New ToDo"
        />
        <button type="submit">추가</button>
      </form>
    </>
  );
}

export default TodoInput;
