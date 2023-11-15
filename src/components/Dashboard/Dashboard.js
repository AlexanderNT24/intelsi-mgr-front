import React from "react";
import "../../Css/Components/Dashboard.css";
import Analytics from "../Analytics/Analytics";
import TotalBusiness from "../TotalBusiness/TotalBusiness";
import StateDetail from "../../components/StateDetail/StateDetail";
const Dashboard = () => {
  const userId = localStorage.getItem("id");
  return (
    <>
      <div className="dashboard">
        <h1>Pedidos</h1>
        <div className="grid">
          <div className="one">
            <TotalBusiness />
          </div>
          <div className="two">
            <StateDetail id={userId} /> 
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
