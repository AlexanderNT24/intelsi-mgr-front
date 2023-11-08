import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import InProgress from "../../components/RequestDetail/InProgress/InProgress";
const InProgressPage = () => {
  return (
    <div className="App">
      <Sidebar />
      <InProgress/>
    </div>
  );
};

export default InProgressPage;
