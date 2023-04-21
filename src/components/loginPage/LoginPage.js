import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to handle login
    if (username === 'admin' && password === 'password') {
      // Successful login
      console.log('Logged in!');
      navigate('/home');
      setCookie('username', "admin", { path: '/' });
      setCookie('password', "password", { path: '/' });

    } else {
      // Failed login
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <body className="body">
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
    </body>
  );
}

export default LoginPage;
