import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');

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
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;

  // 위 3개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post('/auth/signup', {
        email,
        password,
      });

      // 로그인 페이지로 이동함.
      navigate('/');
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
    }
  };

  return (
    <>
      <section
      // onSubmit={handleSubmit}
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
            <div>{!isEmailValid ? '이메일 형식이 올바르지 않습니다.' : ''}</div>
          </article>
          <article className="password">
            <div style={{ color: 'green' }}>비밀번호</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div>{!isPasswordValid ? '비밀번호는 8자 이상입니다.' : ''}</div>
          </article>
          <article className="password">
            <div style={{ color: 'green' }}>비밀번호 확인</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <div>{!isPasswordSame && <p>비밀번호가 일치하지 않습니다.</p>}</div>
          </article>
          <article className="btn">
            <button
              className="registerBtn"
              disabled={!isFormValid}
              onClick={() => navigate('/register')}
            >
              회원가입
            </button>
            <button
              className="loginBtn"
              type="cancel"
              onClick={() => navigate('/')}
            >
              취소
            </button>
          </article>
        </form>
      </section>
    </>
  );
}

export default RegisterForm;
