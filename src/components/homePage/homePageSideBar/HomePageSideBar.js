import React from 'react';
import './HomePageSideBar.css';
import logout from '../../../logout.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../reducers/currentUserSlice';

function HomePageSideBar(props) {
  const user = props.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function LogOut() {
    //Todo
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <h2>{user.name}</h2>
      <img className='logout-button' src={logout} alt="Logout" style={{ height: 30, width: 30 }} onClick={LogOut}/>
      </div>
      <hr />
      <h3>Username</h3>
      <p>{user.username}</p>
      <hr />
      <h3>Role</h3>
      <p>{user.role}</p>
      <hr />
    </div>
  );
}

export default HomePageSideBar;
