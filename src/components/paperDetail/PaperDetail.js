import React from "react";
import HomePageSideBar from "../homePage/homePageSideBar/HomePageSideBar";
import { useParams } from "react-router";
import { useState } from "react";
import edit from "../../edit.png";
import "./PaperDetail.css";
import PaperComment from "./paperComment/PaperComment";

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
  const { id } = useParams();
  const [paperName, setPaperName] = useState("Paper 1");
  const [paperStatus, setPaperStatus] = useState("pending");
  const [paperTrack, setPaperTrack] = useState("Science");
  const [totalPage, setTotalPage] = useState(15);
  const [disableEdit, setDisableEdit] = useState(true);
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
        user={{ name: "Author 1", role: "Author", email: "author1@gmail.com" }}
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
            content={paperName}
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
