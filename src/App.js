import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage"; 
import HomePage from "./pages/home/HomePage"; 
import RegisterPage from "./pages/register/RegisterPage"; 
import StateDetailPage from "./pages/state_detail/StateDetailPage"; 
import RequestPage from "./pages/request/RequestPage"; 
import ProjectPage from "./pages/project/ProjectPage"; 
import UserPage from "./pages/user/UserPage"; 

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
      </Routes>
    </Router>
  );
}


export default App;
