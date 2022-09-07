import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoMain from '../components/todo/TodoMain';

function Todo() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('userToken');
  const logout = () => {
    localStorage.removeItem('userToken');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };
  const displayCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  const logoutBtnStyle = {
    marginLeft: '0.5rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#a2a2a2',
    color: 'white',
    fontSize: '0.7rem',
    border: 'none',
    borderRadius: '0.3rem',
    cursor: 'pointer',
  };
  const todoPageDisplayArea = {
    border: 'solid black 0.4rem',
    borderRadius: '0.7rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingTop: '1rem',
    height: '45rem',
    width: '23rem',
    overflowY: 'auto ',
  };
  const todoTextStlye = {
    fontSize: '2rem',
    margin: '1rem',
    textAlign: 'center',
  };

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      return navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div style={displayCenter}>
      <div style={todoPageDisplayArea}>
        <div style={{ textAlign: 'end' }}>
          <button className="logoutBtn" onClick={logout} style={logoutBtnStyle}>
            로그아웃
          </button>
        </div>
        <h2 style={todoTextStlye}>Todo</h2>
        <TodoMain />
      </div>
    </div>
  );
}

export default Todo;
