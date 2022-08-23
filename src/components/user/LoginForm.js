import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 8자 이상인지 여부를 확인.
  const isPasswordValid = password.length >= 8;
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "/auth/signin" 엔드포인트로 post요청.
      const res = await Api.post('auth/signin', {
        email,
        password,
      });
      console.log(res);
      // jwtToken은 response data인 access_token
      const jwtToken = res.data.access_token;
      // localStorage에 "userToken"이라는 키로 JWT 토큰을 저장.
      localStorage.setItem('userToken', jwtToken);
      alert('로그인 되었습니다.');
      // 로그인 후 todo 페이지로 이동.
      navigate('/todo');
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <article className="email">
            <div style={{ color: 'blue' }}>이메일 주소</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div>{!isEmailValid && '이메일은 @가 포함 되어야합니다.'}</div>
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
