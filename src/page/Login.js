import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/user/LoginForm';

function Login() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('userToken');

  useEffect(() => {
    if (isLogin) {
      return navigate('/todo');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        // backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: 'gray',
          borderRadius: '1rem',
          padding: '3rem',
          // height: '20rem',
          // width: '15rem',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            margin: '2rem',
          }}
        >
          Sign in
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
