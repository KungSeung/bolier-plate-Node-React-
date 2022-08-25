import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from '';

function App() {
  return (
    <Router>
      <div>
        {}
        <Routes>
          <Route exact path="/" element={Auth(LandingPage, null)} />
          <Route exact path="/Login" element={Auth(LoginPage, false)} />
          <Route exact path="/register" element={Auth(RegisterPage, false)} />
        </Routes>
      </div>
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
