import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserDetail from "../../components/UserDetail/UserDetail"
import StateDetail from "../../components/StateDetail/StateDetail"

function UserDetailPage() {
  return (
    <div className="App">
      <Sidebar />
      <StateDetail />
    </div>
  );
}

export default UserDetailPage;

