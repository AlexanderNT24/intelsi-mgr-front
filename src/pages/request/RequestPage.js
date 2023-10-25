import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import RequestTable from "../../components/RequestTable/RequestTable";

function RequestPage() {
  return (
    <div className="App">
      <Sidebar />
      <div className="centered-container">
        <RequestTable></RequestTable>
      </div>
    </div>
  );
}

export default RequestPage;
