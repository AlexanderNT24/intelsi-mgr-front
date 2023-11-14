import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserDetail from "../../components/UserDetail/UserDetail"

function UserDetailPage() {
  return (
    <div className="App">
      <Sidebar />
      <UserDetail />
    </div>
  );
}

export default UserDetailPage;

