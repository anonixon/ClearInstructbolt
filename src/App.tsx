import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import TeachersLanding from './components/landing/TeachersLanding';
import ParentsLanding from './components/landing/ParentsLanding';
import InstitutionsLanding from './components/landing/InstitutionsLanding';
import ParentPortal from './components/parent/ParentPortal';
import LoginPage from './components/auth/LoginPage';
import DashboardSelection from './components/dashboardSelection/DashboardSelection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersLanding />} />
            <Route path="/parents" element={<ParentsLanding />} />
            <Route path="/institutions" element={<InstitutionsLanding />} />
            <Route path="/login/:dashboard" element={<LoginPage />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
            <Route path="/login" element={<Navigate to="/login/parent" replace />} />
            <Route path="/demo" element={<Navigate to="/login/parent" replace />} />
            <Route path="/features" element={<Navigate to="/" replace />} />
            <Route path="/teacher" element={<Navigate to="/login/teacher" replace />} />
            <Route path="/parent" element={<Navigate to="/login/parent" replace />} />
            <Route path="/headteacher" element={<Navigate to="/login/headteacher" replace />} />
            <Route path="/dashboard" element={<DashboardSelection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;