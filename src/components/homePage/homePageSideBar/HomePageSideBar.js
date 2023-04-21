import React from 'react';
import './HomePageSideBar.css';
import logout from '../../../logout.png'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function HomePageSideBar(props) {
  const user = props.user;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  function LogOut(){
    //Todo
    removeCookie('username', { path: '/' });
    removeCookie('password', { path: '/' });
    navigate('/');

  };
  return (
    <div className="sidebar">
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
      <h2>{user.name}</h2>
      <img className='logout-button' src={logout} alt="Logout" style={{ height: 30, width: 30, marginLeft: 110}} onClick={LogOut}/>
      </div>
      <p>Email: {user.email}</p>
      <hr />
      <h3>Role</h3>
      <p>{user.role}</p>
    </div>
  );
}

export default HomePageSideBar;
