import React from 'react';
import '../styles/profilePage.scss';

const user = JSON.parse(localStorage.getItem("user"));

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-picture">
        <img src={user.picture} alt="Profile" />
      </div>
      <div className="user-name">{user.name}</div>
      <div className="user-email">{user.email}</div>
    </div>
  );
};

export default ProfilePage;
