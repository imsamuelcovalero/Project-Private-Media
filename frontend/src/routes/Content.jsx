/* File: src/routes/Content.jsx */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import PasswordReset from '../pages/Login/PasswordReset';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import ProfileEdit from '../pages/Profile/ProfileEdit';
import Subscription from '../pages/Subscription/Subscription';
import Category from '../pages/Category/Category';
import PhotoRender from '../pages/Category/PhotoRender';
import VideoRender from '../pages/Category/VideoRender';
import PhotoDetailed from '../pages/Category/PhotoDetailed';
import VideoDetailed from '../pages/Category/VideoDetailed';

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visitors" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/:categoryId" element={<Category />} />
      <Route path="/:categoryId/photos" element={<PhotoRender />} />
      <Route path="/:categoryId/videos" element={<VideoRender />} />
      <Route path="/:categoryId/photos/:photoId" element={<PhotoDetailed />} />
      <Route path="/:categoryId/videos/:videoId" element={<VideoDetailed />} />
    </Routes>
  );
}

export default Content;
