import React from "react";
import HomePageSideBar from "../homePage/homePageSideBar/HomePageSideBar";
import { useParams } from "react-router";
import { useState } from "react";
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
import {InputGroup, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';


// const TextField = ({ content, handleChange, label, disable }) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//       }}
//     >
//       <label for="username" style={{ marginRight: 20, flexBasis: "10%" }}>
//         {label}
//       </label>
//       <input
//         type="text"
//         value={content}
//         onChange={handleChange}
//         disabled={disable}
//         style={{  }}
//       />
//     </div>
//   );
// };

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
  const [paperTrackId, setPaperTrackId] = useState(1);
  const [paperTrackName, setPaperTrackName] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [paperFinalResult, setPaperFinalResult] = useState('');
  const [trackList, setTrackList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [reviewerList, setReviewerList] = useState([]);
  const [paperAuthorList, setPaperAuthorList] = useState([]);
  const [paperReviewerList, setPaperReviewerList] = useState([]);

  useEffect(() => {
    const fetchPaper = async() => {
      const response = await axios.get(`${SERVER_URL}/api/papers/${id}`);
      if (response.status === 200) {
        const data = response.data.data;
        setPaperName(data.name);
        setPaperStatus(data.status);
        setTotalPage(data.totalPage);
        setPaperTrackId(data.trackId);
        setPaperTrackName(data.trackName);
        setPaperFinalResult(data.finalResult);
        const paperAuthors = [];
        for (let i = 0; i < data.authorList.length; i++) {
          const author = data.authorList[i];
          paperAuthors.push({ value: author.id, label: author.name })
        }
        setPaperAuthorList(paperAuthors);
        const paperReviewers = [];
        for (let i = 0; i < data.reviewerList.length; i++) {
          const reviewer = data.reviewerList[i];
          paperReviewers.push({ value: reviewer.id, label: reviewer.name });
        }
        setPaperReviewerList(paperReviewers);
      }
    }
    fetchPaper();
  }, [id]);

  useEffect(() => {
    const fetchTrackNameList = async() => {
      const response = await axios.get(`${SERVER_URL}/api/tracks`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        setTrackList(response.data.data);
      }
    }
    const fetchAuthorList = async() => {
      const response = await axios.get(`${SERVER_URL}/api/authors`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        setAuthorList(response.data.data);
      }
    }
    const fetchReviewerList = async() => {
      const response = await axios.get(`${SERVER_URL}/api/reviewers`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        setReviewerList(response.data.data);
      }
    }
    fetchTrackNameList();
    fetchAuthorList();
    fetchReviewerList();
  }, [accessToken]);

  const handleNameChange = (event) => {
    setPaperName(event.target.value);
  };

  const handleTrackChange = (event) => {
    setPaperTrackId(event.target.value);
  };

  const handleTotalpageChange = (event) => {
    if (event.target.value >= 0) setTotalPage(event.target.value);
  };

  const handlePaperStatusChange = (event) => {
    setPaperStatus(event.target.value);
  };

  const handlePaperFinalResultChange = (event) => {
    setPaperFinalResult(event.target.value);
  }

  const handleAuthorChange = (event) => {
    setPaperAuthorList(event);
  }

  const handleReviewerChange = (event) => {
    setPaperReviewerList(event);
  }

  const handleSave = () => {
    const authorList = [];
    for (let i = 0; i < paperAuthorList.length; i++) {
      const author = paperAuthorList[i];
      authorList.push({ id: author.value, name: author.label });
    }

    const updatePaper = async() => {
      await axios.put(`${SERVER_URL}/api/papers/${id}`,
      {
        name: paperName,
        trackId: paperTrackId,
        totalPage: totalPage,
        status: paperStatus,
        authorList: authorList,
        finalResult: paperFinalResult
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          alert('Paper infor has been updated successful.')
        } else {
          alert('Some errors occured while updating paper info!');
        }
      })
      .catch((errors) => {
        alert('Some errors occured while updating paper info!');
        console.log(errors);
      });
      
    }

    if (paperName === '') {
      alert('Paper name is empty');
    } else if (paperAuthorList.length === 0) {
      alert('Paper authors is empty');
    } else {
      updatePaper();
    }
    // update to db
  };

  const handleAssignReviewers = () => {
    const updateReviewer = async() => {
      console.log(paperReviewerList);
      const reviewerIds = paperReviewerList.map((reviewer) => reviewer.value);
      console.log(reviewerIds);
      await axios.post(`${SERVER_URL}/api/papers/${id}`, reviewerIds, 
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        if (response.status === 200) {
          alert('Assign reviewers successful.');
        } else {
          alert('Some errors occured while updating reviewers!');
        }
      }).catch((errors) => {
        alert('Some errors occured while updating reviewers!');
        console.log(errors)
      })
    }
    updateReviewer();
  }

  const authorOptions = authorList.map((author) => ({ value: author.id, label: author.name }));
  const reviewerOptions = reviewerList.map((reviewer) => ({ value: reviewer.id, label: reviewer.name })); 

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <HomePageSideBar
        user={{ name: user.name, role: user.role, username: user.username }}
      />
      <div style={{ padding: "40px", width: "100%" }}>
        <h2 style={{"marginBottom": "20px"}}>Paper information</h2>
        <div className="paper-info">
          <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
            <InputGroup.Text style={{"width": "30%"}}>Paper name</InputGroup.Text>
            <Form.Control type="text" placeholder="Enter paper name" value={paperName} onChange={handleNameChange} />
          </InputGroup>
          <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
            <InputGroup.Text style={{"width": "30%"}}>Track name</InputGroup.Text>
            <Form.Select value={paperTrackId} onChange={handleTrackChange} name={paperTrackName}>
              {trackList.map((track) => 
                <option value={track.id} key={track.id}>
                  {track.name}
                </option>)}
            </Form.Select>
          </InputGroup>
          <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
            <InputGroup.Text style={{"width": "30%"}}>Total page</InputGroup.Text>
            <Form.Control type="text" placeholder="Enter total page" value={totalPage} onChange={handleTotalpageChange} />
          </InputGroup>
          <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
            <InputGroup.Text style={{"width": "30%"}}>Status</InputGroup.Text>
            <Form.Select value={paperStatus} onChange={handlePaperStatusChange}>
              <option value="Submitting">Submitting</option>
              <option value="Locked">Locked</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Unready">Unready</option>
              <option value="Waiting">Waiting</option>
              <option value="Camera-ready">Camera-ready</option>
              <option value="Checked">Checked</option>
            </Form.Select>
          </InputGroup>
          <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
            <InputGroup.Text style={{"width": "30%"}}>Authors</InputGroup.Text>
            <Select styles={{"width": "100%"}} placeholder="Select authors"
              options={authorOptions} isMulti value={paperAuthorList} onChange={handleAuthorChange}/>
          </InputGroup>
          <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
            <InputGroup.Text style={{"width": "30%"}}>Final result</InputGroup.Text>
            <Form.Select value={paperFinalResult} onChange={handlePaperFinalResultChange}>
                <option value="Accepted">Accepted</option>
                <option value="Pending">Pending</option>
            </Form.Select>
          </InputGroup>
        </div>
        <div className="paper-save-button">
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </div>
        {(user.role === 'track_chair_role') ? (
          <>
            <h2 style={{"marginBottom": "20px"}}>Assign reviewers</h2>
            <div className="paper-info">
              <InputGroup style={{"width": "90%", "marginBottom": "10px"}}>
                <InputGroup.Text style={{"width": "30%"}}>Reviewers</InputGroup.Text>
                <Select styles={{"width": "100%"}} placeholder="Select reviewers"
                  options={reviewerOptions} isMulti value={paperReviewerList} onChange={handleReviewerChange}/>
              </InputGroup>
            </div>
            <div className="paper-save-button">
              <Button variant="primary" onClick={handleAssignReviewers}>Assign reviewers</Button>
            </div>
          </>
          ) : (
            <></>
          )} 
        <div>
          <h2>Comment</h2>
          <PaperComment reviewerName={"Reviewer 1"} appropriateness={"Good"} contribution={"Good"} correctness = {"Good"} />
          <PaperComment reviewerName={"Author 3"} appropriateness={"Good"} contribution={"Good"} correctness = {"Good"} />
          <PaperComment reviewerName={"Author 2"} appropriateness={"Good"} contribution={"Good"} correctness = {"Good"} />
          <PaperComment reviewerName={"Author 4"} appropriateness={"Good"} contribution={"Good"} correctness = {"Good"} />
        </div>
      </div>
    </div>
  );
}

export default PaperDetail;
