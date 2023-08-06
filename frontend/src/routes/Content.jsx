import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Visitors from '../pages/Visitors/Visitors';
import Main from '../pages/Main/Main';
import Category from '../pages/Category/Category';

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visitors" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:categoryId" element={<Category />} />
    </Routes>
  );
}

export default Content;
