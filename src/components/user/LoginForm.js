import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginBtnStyle = {
    height: '2rem',
    marginBottom: '0.2rem',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '0.2rem',
    cursor: 'pointer',
  };
  const registerBtnStyle = {
    marginTop: '0.2rem',
    color: 'black',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    width: 'fit-content',
    alignSelf: 'center',
    cursor: 'pointer',
  };

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
      alert(
        `이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.`
      );
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <article className="email" style={{ marginBottom: '0.5rem' }}>
            <input
              type="email"
              value={email}
              placeholder="아이디(이메일)"
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '-webkit-fill-available' }}
            ></input>
            <small>{!isEmailValid && '이메일은 @가 포함 되어야합니다.'}</small>
          </article>
          <article className="Password" style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '-webkit-fill-available' }}
            ></input>
            <small>{!isPasswordValid && '비밀번호는 8자 이상입니다.'}</small>
          </article>
          <article
            className="btn"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <button
              className="loginBtn"
              type="submit"
              disabled={!isFormValid}
              style={
                isFormValid
                  ? loginBtnStyle
                  : {
                      ...loginBtnStyle,
                      backgroundColor: 'lightgray',
                      cursor: 'default',
                    }
              }
            >
              로그인
            </button>
            <div
              className="registerBtn"
              onClick={() => navigate('/register')}
              style={registerBtnStyle}
            >
              회원가입
            </div>
          </article>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
