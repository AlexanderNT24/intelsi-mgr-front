import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserDetail from "../../components/UserDetail/UserDetail";
import StateDetail from "../../components/StateDetail/StateDetail";
import { useParams } from "react-router-dom";

function UserDetailPage() {
  const { id } = useParams();
  return (
    <div className="App">
      <Sidebar />
      <div className="dashboard">
        <UserDetail id={id}></UserDetail>
        <StateDetail id={id} />
      </div>
    </div>
  );
}

export default UserDetailPage;
