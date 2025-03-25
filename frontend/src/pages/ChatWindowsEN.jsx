import React from "react";
import ProfileCard from "../components/user/ProfileCard";
import NavegacionUser from "../components/user/NavegacionUser";
import ChatWindow from "../components/user/ChatWindow";

const UserDashboard = () => {

  return (
    <div className="dashboard-container">
      <ProfileCard />
      <NavegacionUser />
      <ChatWindow />
    </div>
  );
};

export default UserDashboard;