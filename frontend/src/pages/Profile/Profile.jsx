/* File: src/pages/Profile/Profile.jsx */
import React from 'react';
import Header from '../../components/Header/Header';
import ProfileComponent from '../../components/ProfileComponent/Profile.component';
import DivExterna from './Style';

function Profile() {
  return (
    <DivExterna>
      <Header />
      <ProfileComponent />
    </DivExterna>
  );
}

export default Profile;
