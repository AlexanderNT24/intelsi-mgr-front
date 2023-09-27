import React from "react";
import "../Css/Components/Dashboard.css";
import Analytics from "./Analytics";
import TotalBusiness from "./TotalBusiness";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <h1>Reportes</h1>
        <div className="grid">
          <div className="one">
            <TotalBusiness />
          </div>
          <div className="two">
            <Analytics />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
