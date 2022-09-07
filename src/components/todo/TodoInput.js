import { MdAddBox } from 'react-icons/md';

function TodoInput({ handleSubmit, handleChange, todo }) {
  const formStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const inputBoxStyle = {
    width: '100%',
    height: '1.5rem',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: '0.2rem',
  };
  const inputBtnStyle = {
    padding: '0',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  };
  const inputIconStyle = {
    fontSize: '2.5rem',
    color: 'black',
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          value={todo}
          type="text"
          onChange={handleChange}
          placeholder="Add Todo"
          style={inputBoxStyle}
        />
        <button type="submit" style={inputBtnStyle}>
          <MdAddBox style={inputIconStyle} />
        </button>
      </form>
    </>
  );
}

export default TodoInput;
