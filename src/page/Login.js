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
    <>
      <h2>Login Page</h2>
      <LoginForm />
    </>
  );
}

export default Login;
