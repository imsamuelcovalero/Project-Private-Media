import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Visitors from '../pages/Visitors/Visitors';
import Main from '../pages/Main/Main';

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visitors" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default Content;
