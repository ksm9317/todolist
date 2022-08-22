import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import { DispatchContext } from '../../App';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 8자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 8;

  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "/auth/signin" 엔드포인트로 post요청함.
      const res = await Api.post('/auth/signin', {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem('userToken', jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate('/', { replace: true });
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
    }
  };

  return (
    <>
      <section
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'center',
      // }}
      >
        <form onSubmit={handleSubmit}>
          <article className="email">
            <div style={{ color: 'blue' }}>이메일 주소</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div>{!isEmailValid && '이메일 형식이 올바르지 않습니다.'}</div>
          </article>
          <article className="password">
            <div style={{ color: 'green' }}>비밀번호</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div>{!isPasswordValid && '비밀번호는 8자 이상입니다.'}</div>
          </article>
          <article className="btn">
            <button className="loginBtn" type="submit" disabled={!isFormValid}>
              로그인
            </button>
            <button
              className="registerBtn"
              onClick={() => navigate('/register')}
            >
              회원가입
            </button>
          </article>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
