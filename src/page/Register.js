import RegisterForm from '../components/user/RegisterForm';

function Register() {
  const displayCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };
  const registerPageDisplayArea = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: 'solid black 0.4rem',
    borderRadius: '0.7rem',
    padding: '3rem',
    width: '240px',
    height: '351px',
  };
  const registerTextStlye = {
    fontSize: '2.5rem',
    marginTop: '0',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  return (
    <div style={displayCenter}>
      <div style={registerPageDisplayArea}>
        <h2 style={registerTextStlye}>Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
