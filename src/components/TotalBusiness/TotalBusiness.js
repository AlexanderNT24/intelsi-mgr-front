import React, { useState, useEffect } from "react";
import "../../Css/Components/TotalBusiness.css";
import { BsFillStopwatchFill, BsTruck } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from "axios";

const TotalBusiness = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/request") // Assuming you have an endpoint for requests
      .then((response) => {
        console.log(response.data)
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching requests", error);
      });
  }, []);

  const pendingRequests = requests.filter((request) => request.requeststatus === "por-revisar");
  const toBePickedUpRequests = requests.filter((request) => request.requeststatus === "revisado");
  const inProgressRequests = requests.filter((request) => request.requeststatus === "completo");

  const total = [
    {
      number: pendingRequests.length.toString(),
      title1: "Pendientes",
      icon: BsFillStopwatchFill,
      link: "/pending",
    },
    {
      number: toBePickedUpRequests.length.toString(),
      title1: "Por recoger",
      icon: BsTruck,
      link: "/to-be-picked-up",
    },
    {
      number: inProgressRequests.length.toString(),
      title1: "En proceso",
      icon: ImSpinner6,
      link: "/in-progress",
    },
  ];

  return (
    <div className="row_boxes">
      {total.map((totalitems, index) => (
        <div className="row_boxes_inner" key={index}>
          <div className="first">
            <p className="number">{totalitems.number}</p>
            <Link to={totalitems.link} className="title">
              {totalitems.title1}
            </Link>
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
