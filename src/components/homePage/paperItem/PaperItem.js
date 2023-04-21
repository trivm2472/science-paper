import React from 'react';
import './PaperItem.css';
import { useNavigate } from 'react-router-dom';
const PaperItem = ({ name, id, totalPages, finalResult, status }) => {
  const navigate = useNavigate();
  return (
    <div className="list-item">
      <h2 className='paper' style={{flexBasis: '20%', paddingLeft: 30}} onClick={()=>{
        navigate('/paper/' + id);
      }}>{name }</h2>
      <p style={{flexBasis: '20%'}}>ID: {id}</p>
      <p style={{flexBasis: '20%'}}>Total Pages: {totalPages}</p>
      <p style={{flexBasis: '20%'}}>Final Result: {finalResult}</p>
      <p style={{flexBasis: '20%'}}>Status: {status}</p>
    </div>
  );
};

export default PaperItem;
