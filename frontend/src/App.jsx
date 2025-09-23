// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage'; // We will create this next
import LogDetailPage from './pages/LogDetailPage'; // We will create this later
import './App.css';

function App() {
  return (
    <div>
      <h1>Website Monitoring </h1>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/logs/:run_id" element={<LogDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;