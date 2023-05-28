import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import AppFormPage from './pages/AppFormPage/AppFormPage';
import RoleFormPage from './pages/RoleFormPage/RoleFormPage';
import ApplicantPage from './pages/ApplicantPage/ApplicantPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/applicants-form" element={<AppFormPage />} />
        <Route path="/roles-form" element={<RoleFormPage />} />
        <Route path="/applicants/:id/" element={<ApplicantPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
