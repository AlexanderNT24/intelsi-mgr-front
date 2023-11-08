import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserTable from "../../components/UsersTable/UserTable"

function UserTablePage() {
  return (
    <div className="App">
      <Sidebar />
      <div className="centered-container">
      <UserTable />
      </div>
    </div>
  );
}

export default UserTablePage;

