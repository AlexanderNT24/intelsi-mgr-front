import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage"; 
import HomePage from "./pages/home/HomePage"; 
import RegisterPage from "./pages/register/RegisterPage"; 
import StateDetailPage from "./pages/state_detail/StateDetailPage"; 
import RequestPage from "./pages/request/RequestPage"; 
import ProjectPage from "./pages/project/ProjectPage"; 
import UserPage from "./pages/user/UserPage"; 
import PendingRequestsPage from "./pages/pending/PendingPage";
import ToBePickedUpPage from "./pages/to-be-picked-up/ToBePickedUpPage";
import InProgressPage from "./pages/in-progress/InProgressPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail" element={<StateDetailPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/pending" element={<PendingRequestsPage />} />
        <Route path="/to-be-picked-up" element={<ToBePickedUpPage />} />
        <Route path="/in-progress" element={<InProgressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
