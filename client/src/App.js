import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <Routes>
        {/* hoc사용법 -> Auth로 감싸기 */}
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/Login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
      </Routes>
    </Router>
  );
}

export default App;

/*
    A <Routes> looks through all its children <Route>
    elements and renders the first one whose path
    matches the current URL. Use a <Routes> any time
    you have multiple Routes, but you want only one
    of them to render at a time
 */
