import React, { useEffect, useState } from "react";
import "../styles/profilePage.scss";
import { fetchTags } from "../api/documents/fetchTags";
import TagList from "../components/ProfilePage/TagList";

const user = JSON.parse(localStorage.getItem("user"));

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-picture">
        <img src={user.picture} alt="Profile" />
      </div>
      <div className="user-name">{user.name}</div>
      <div className="user-email">{user.email}</div>
      <TagList />
    </div>
  );
};

export default ProfilePage;
