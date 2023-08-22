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
import PhotosGallery from '../pages/Category/PhotosGallery';
import VideosGallery from '../pages/Category/VideosGallery';
import PhotoDetailed from '../pages/Category/PhotoDetailed';
import VideoDetailed from '../pages/Category/VideoDetailed';
import categoryIds from '../helpers/categoryIds.helper';

function Content() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/main/${categoryIds[0]}`} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/main/:categoryId" element={<Category />} />
      <Route path="/main/:categoryId/fotos" element={<PhotosGallery />} />
      <Route path="/main/:categoryId/videos" element={<VideosGallery />} />
      <Route path="/main/:categoryId/fotos/:photoId" element={<PhotoDetailed />} />
      <Route path="/main/:categoryId/videos/:videoId" element={<VideoDetailed />} />
    </Routes>
  );
}

export default Content;
