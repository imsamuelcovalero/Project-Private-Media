/* File: src/pages/Profile/Profile.jsx */
import React from 'react';
import Header from '../../components/Header/Header';
import ProfileEditComponent from '../../components/Profile/ProfileEdit.component';
import DivExterna from './Style';

function Profile() {
  return (
    <DivExterna>
      <Header />
      <ProfileEditComponent />
    </DivExterna>
  );
}

export default Profile;
