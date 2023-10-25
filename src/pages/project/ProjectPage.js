import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProjectTable from "../../components/ProjectTable/ProjectTable";

function ProjectPage() {
  return (
    <div className="App">
      <Sidebar />
      <div className="centered-container">
        <ProjectTable></ProjectTable>
      </div>
    </div>
  );
}

export default ProjectPage;
