import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import ProfileEdit from '../pages/Profile/ProfileEdit';
import Visitors from '../pages/Visitors/Visitors';
import Main from '../pages/Main/Main';
import Category from '../pages/Category/Category';
import Subscription from '../pages/Subscription/Subscription';

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visitors" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:categoryId" element={<Category />} />
      <Route path="/subscription" element={<Subscription />} />
    </Routes>
  );
}

export default Content;
