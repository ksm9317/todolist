import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const registerBtnStyle = {
    marginRight: '0.5rem',
    padding: '0.3rem 0.6rem',
    border: 'none',
    borderRadius: '0.3rem',
    backgroundColor: 'black',
    color: 'white',
    cursor: 'pointer',
  };
  const cancelBtnStyle = {
    marginLeft: '0.5rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#a2a2a2',
    color: 'white',
    border: 'none',
    borderRadius: '0.3rem',
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
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인.
  const isPasswordSame = password === confirmPassword;
  // 위 3개 조건이 모두 동시에 만족되는지 여부를 확인.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청.
      await Api.post('auth/signup', {
        email,
        password,
      });
      alert('회원가입을 완료하였습니다.');
      // 로그인 페이지로 이동함.
      navigate('/');
    } catch (err) {
      alert('이미 등록된 이메일입니다.', err);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <article className="email" style={{ marginBottom: '0.5rem' }}>
            <div style={{ color: '#00a8ff', fontWeight: 'bold' }}>이메일</div>
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '-webkit-fill-available',
              }}
            ></input>
            <small>{!isEmailValid && '이메일 형식이 올바르지 않습니다.'}</small>
          </article>
          <article className="password" style={{ marginBottom: '0.5rem' }}>
            <div style={{ color: '#00a8ff', fontWeight: 'bold' }}>비밀번호</div>
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '-webkit-fill-available',
              }}
            ></input>
            <small>{!isPasswordValid && '비밀번호는 8자 이상입니다.'}</small>
          </article>
          <article
            className="confirmPassword"
            style={{ marginBottom: '0.5rem' }}
          >
            <div style={{ color: '#00a8ff', fontWeight: 'bold' }}>
              비밀번호 확인
            </div>
            <input
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '-webkit-fill-available',
              }}
            ></input>
            <small>{!isPasswordSame && '비밀번호가 일치하지 않습니다.'}</small>
          </article>
          <article
            className="btn"
            style={{ marginTop: '1rem', textAlign: 'center', gap: '1rem' }}
          >
            <button
              className="registerBtn"
              type="submit"
              disabled={!isFormValid}
              style={
                isFormValid
                  ? registerBtnStyle
                  : {
                      ...registerBtnStyle,
                      backgroundColor: 'lightgray',
                      cursor: 'default',
                    }
              }
            >
              회원가입
            </button>
            <button
              className="loginBtn"
              type="cancel"
              onClick={() => navigate('/')}
              style={cancelBtnStyle}
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
