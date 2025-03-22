import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import TeachersLanding from './components/landing/TeachersLanding';
import ParentsLanding from './components/landing/ParentsLanding';
import InstitutionsLanding from './components/landing/InstitutionsLanding';
import ParentPortal from './components/parent/ParentPortal';
import LoginPage from './components/auth/LoginPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersLanding />} />
          <Route path="/parents" element={<ParentsLanding />} />
          <Route path="/institutions" element={<InstitutionsLanding />} />
          <Route path="/login/:dashboard" element={<LoginPage />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/login" element={<Navigate to="/login/parent" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;