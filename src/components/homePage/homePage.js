import React from "react";
import HomePageSideBar from "./homePageSideBar/HomePageSideBar";
import PaperItem from "./paperItem/PaperItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { userLogout } from '../../reducers/currentUserSlice';
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../api/url";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser.user);
  const accessToken = useSelector(state => state.currentUser.accessToken);
  const refreshToken = useSelector(state => state.currentUser.refreshToken);
  
  useEffect(() => {
    if (user === null || accessToken === null || refreshToken === null) {
      navigate("/");
    } else {
      const decodedJwt = jwt_decode(accessToken);
      if (decodedJwt.exp < Date.now() / 1000) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(userLogout());
        navigate("/");
      }
    }
  });

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async() => {
      const response = await axios.get(`${SERVER_URL}/api/papers`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        setPapers(response.data.data);
      }
    }
    fetchPapers();
  }, [accessToken])

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <HomePageSideBar
        user={{ name: user.name, role: user.role, username: user.username }}
      />
      <div style={{marginLeft: 30}}>
        {papers.map((paper) => (
          <PaperItem
            key={paper.id}
            name={paper.name}
            id={paper.id}
            totalPages={paper.totalPage}
            finalResult={paper.finalResult}
            status={paper.status}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
