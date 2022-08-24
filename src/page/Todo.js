import { useNavigate } from 'react-router-dom';
import TodoMain from '../components/todo/TodoMain';

function Todo() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userToken');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <>
      <h2>Todo Page</h2>
      <button className="logoutBtn" onClick={logout}>
        로그아웃
      </button>
      <TodoMain />
    </>
  );
}

export default Todo;
