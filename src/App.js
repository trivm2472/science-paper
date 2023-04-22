import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import HomePage from './components/homePage/homePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaperDetail from './components/paperDetail/PaperDetail';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/paper/:id' element={<PaperDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
