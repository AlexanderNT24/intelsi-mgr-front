import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ToBePickedUp from "../../components/RequestDetail/ToBePickedUp/ToBePickedUp";

const ToBePickedUpPage = () => {
  return (
    <div className="App">
      <Sidebar />
      <ToBePickedUp/>
      
    </div>
  );
};

export default ToBePickedUpPage;
