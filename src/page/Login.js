import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/user/LoginForm';

function Login() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('userToken');
  const displayCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  const loginPageDisplayArea = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: 'solid black 0.4rem',
    borderRadius: '0.7rem',
    padding: '3rem',
    width: '240px',
    height: '351px',
  };
  const signinTextStlye = {
    fontSize: '2.5rem',
    marginTop: '0',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  useEffect(() => {
    if (isLogin) {
      return navigate('/todo');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div style={displayCenter}>
      <div style={loginPageDisplayArea}>
        <h2 style={signinTextStlye}>Sign in</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
