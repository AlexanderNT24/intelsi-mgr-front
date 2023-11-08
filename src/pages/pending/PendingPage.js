import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import PendingRequests from "../../components/RequestDetail/Pending/Pending";
const PendingRequestsPage = () => {
  return (
    <div className="App">
      <Sidebar />
      <PendingRequests/>
    </div>
  );
};

export default PendingRequestsPage;
