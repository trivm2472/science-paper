import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../reducers/currentUserSlice';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import { useEffect } from 'react';

function LoginPage() {
  const user = useSelector(state => state.currentUser.user);
  const accessToken = useSelector(state => state.currentUser.accessToken);
  const refreshToken = useSelector(state => state.currentUser.refreshToken);

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null && accessToken !== null && refreshToken !== null) {
      navigate("/home");
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const login = async() => {
      const response = await axios.post(`${SERVER_URL}/api/login`,
      {
        "username": username,
        "password": password
      });
      
      if (response.status === 200) {
        const data = response.data.data;
        const user = { id: data.id, username: data.username, role: data.role, name: data.name };
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        dispatch(userLogin({ user, accessToken, refreshToken }));
        navigate("/home");
      } else {
        setErrorMessage('Invalid username or password');
      }
    }

    if (username === '' || password === '') {
      setErrorMessage('Invalid username or password');
    } else {
      login();
    }
  };

  return (
    <div className="body">
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
    </div>
  );
}

export default LoginPage;
