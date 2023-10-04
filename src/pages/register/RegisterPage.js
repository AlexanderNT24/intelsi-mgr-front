import React from "react";
import "./RegisterPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import RegisterTable from "../../components/RegisterTable/RegisterTable";

function RegisterPage() {
  return (
    <div className="App">
      <Sidebar />
      <div className="centered-container">
        <RegisterTable />
      </div>
    </div>
  );
}

export default RegisterPage;

