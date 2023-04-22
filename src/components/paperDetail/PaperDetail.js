import React from "react";
import HomePageSideBar from "../homePage/homePageSideBar/HomePageSideBar";
import { useParams } from "react-router";
import { useState } from "react";
import edit from "../../edit.png";
import "./PaperDetail.css";
import PaperComment from "./paperComment/PaperComment";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { userLogout } from '../../reducers/currentUserSlice';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { SERVER_URL } from "../../api/url";

const TextField = ({ content, handleChange, label, disable }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <label for="username" style={{ marginRight: 20, flexBasis: "10%" }}>
        {label}
      </label>
      <input
        type="text"
        value={content}
        onChange={handleChange}
        disabled={disable}
        style={{  }}
      />
    </div>
  );
};

function PaperDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const { id } = useParams();
  const [paperName, setPaperName] = useState('');
  const [paperStatus, setPaperStatus] = useState('');
  const [paperTrack, setPaperTrack] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [disableEdit, setDisableEdit] = useState(true);
  const [authorListName, setAuthorListName] = useState('');

  useEffect(() => {
    const fetchPaper = async() => {
      const response = await axios.get(`${SERVER_URL}/api/papers/${id}`);
      if (response.status === 200) {
        const data = response.data.data;
        setPaperName(data.name);
        setPaperStatus(data.status);
        setTotalPage(data.totalPage);
        setPaperTrack(data.trackName);
        setAuthorListName(data.authorListName.slice(1, data.authorListName.length - 1));
      }
    }
    fetchPaper();
  }, [id]);

  const handleNameChange = (event) => {
    setPaperName(event.target.value);
  };
  const handleTrackChange = (event) => {
    setPaperTrack(event.target.value);
  };
  const handleTotalpageChange = (event) => {
    setTotalPage(event.target.value);
  };
  const handlePaperStatusChange = (event) => {
    setPaperStatus(event.target.value);
  };
  const handleSave = () => {
    setDisableEdit(true);
    // update to db
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <HomePageSideBar
        user={{ name: user.name, role: user.role, username: user.username }}
      />
      <div style={{ marginLeft: 30 }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "white" }}>Paper {id}</h1>
            <img
              alt="not found"
              className="edit-button"
              src={edit}
              style={{ width: 30, height: 30, marginLeft: 20 }}
              onClick={() => {
                setDisableEdit(false);
              }}
            />
            {!disableEdit ? (
              <button style={{ marginLeft: 20 }} onClick={handleSave}>
                Save
              </button>
            ) : (
              <></>
            )}
          </div>
          <TextField
            label={"Paper name:"}
            content={paperName}
            handleChange={handleNameChange}
            disable={disableEdit}
          />
          <TextField
            label={"Track:"}
            content={paperTrack}
            handleChange={handleTrackChange}
            disable={disableEdit}
          />
          <TextField
            label={"Author name:"}
            content={authorListName}
            handleChange={handleNameChange}
            disable={disableEdit}
          />
          <TextField
            label={"Total page:"}
            content={totalPage}
            handleChange={handleTotalpageChange}
            disable={disableEdit}
          />
          <TextField
            label={"Status:"}
            content={paperStatus}
            handleChange={handlePaperStatusChange}
            disable={disableEdit}
          />
        </div>
        <div>
          <h2>Comment</h2>
          <PaperComment name={"Author 1"} commentContent ={`sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad`} />
          <PaperComment name={"Author 3"} commentContent ={`sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad`} />
          <PaperComment name={"Author 2"} commentContent ={`sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad`} />
          <PaperComment name={"Author 4"} commentContent ={`sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad sad sadfx asd sadwq sad
        sad sadfx asd sadwq sad sad sadfx asd sadwq sad`} />
        </div>
      </div>
    </div>
  );
}

export default PaperDetail;
