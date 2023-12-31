import React, { useState, useEffect } from "react";
import "../../Css/Components/TotalBusiness.css";
import { BsFillStopwatchFill, BsTruck } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

const TotalBusiness = () => {
  
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem("id");
  
  useEffect(() => {
    // Asegúrate de que el servidor tiene un endpoint que maneje las solicitudes por supervisor_id
    axios
      .get(`http://localhost:3001/request/supervisor/${userId}`)
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching requests", error);
      });
  }, [userId]);
  
  const pendingRequests = requests.filter(
    (request) => request.requeststatus === "pendiente"
  );
 
  const toBePickedUpRequests = requests.filter(
    (request) => request.requeststatus === "listo"
  );
  const inProgressRequests = requests.filter(
    (request) => request.requeststatus === "enviado"
  );
 
  const total = [
    {
      number: pendingRequests.length.toString(),
      title1: "Pendientes",
      icon: BsFillStopwatchFill,
      link: "/pending",
    },
    {
      number: toBePickedUpRequests.length.toString(),
      title1: "Listos",
      icon: ImSpinner6,
      link: "/to-be-picked-up",
    },
    {
      number: inProgressRequests.length.toString(),
      title1: "Enviados",
      icon: BsTruck,
      link: "/in-progress",
    },
  ];
  
  return (
    <div className="row_boxes">
      {total.map((totalitems, index) => (
        <div className="row_boxes_inner" key={index}>
          <div className="first">
            <p className="number">{totalitems.number}</p>
            <Typography to={totalitems.link} className="title">
              {totalitems.title1}
            </Typography>
          </div>
          <div className="second">
            <totalitems.icon />
          </div>
        </div>
      ))}
     
    </div>
  );
};

export default TotalBusiness;
