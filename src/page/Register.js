import RegisterForm from '../components/user/RegisterForm';

function Register() {
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
            textAlign: 'center',
          }}
        >
          Register
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
