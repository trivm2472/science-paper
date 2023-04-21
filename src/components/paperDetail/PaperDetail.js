import React from "react";
import HomePageSideBar from "../homePage/homePageSideBar/HomePageSideBar";
import { useParams } from "react-router";
import { useState } from "react";

const TextField = ({content ,handleChange, label, disable}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row",  alignItems: 'center', marginBottom: 20}}>
      <label for="username" style={{marginRight: 20, flexBasis: '35%'}}>{label}</label>
      <input type="text" value={content} onChange={handleChange} disabled={disable} style={{flexBasis: '65%'}}/>
    </div>
  )
}

function PaperDetail() {
  const { id } = useParams();
  const [paperName, setPaperName] = useState('');
  const [disableEdit, setDisableEdit] = useState(true);
  const handleNameChange = (event) => {
    setPaperName(event.target.value);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <HomePageSideBar
        user={{ name: "Author 1", role: "Author", email: "author1@gmail.com" }}
      />
      <div style={{ marginLeft: 30 }}>
        <div>
          <h1 style={{ color: "white" }}>Paper {id}</h1>
        </div>
        <TextField label={'Paper name:'} content={paperName} handleChange={handleNameChange} disable={disableEdit}/>
        <TextField label={'Track:'} content={paperName} handleChange={handleNameChange} disable={disableEdit}/>
        <TextField label={'Author name:'} content={paperName} handleChange={handleNameChange} disable={disableEdit}/>
        <TextField label={'Total page:'} content={paperName} handleChange={handleNameChange} disable={disableEdit}/>
        <TextField label={'Status:'} content={paperName} handleChange={handleNameChange} disable={disableEdit}/>
      </div>
    </div>
  );
}

export default PaperDetail;
