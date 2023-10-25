import React, { useState, useEffect } from "react";
import "../../Css/Components/TotalBusiness.css";
import { BsFillStopwatchFill, BsTruck } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa axios

const TotalBusiness = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Realiza una llamada a la API para obtener los productos
    axios.get("http://localhost:3001/products") // Reemplaza con la URL correcta de tu API
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos", error);
      });
  }, []);

  // Lógica para contar los productos en diferentes estados
  const pendingCount = products.filter((product) => product.state === "pending").length;
  const toBeCount = products.filter((product) => product.state === "to-be").length;
  const processCount = products.filter((product) => product.state === "process").length;

  const total = [
    {
      number: pendingCount.toString(),
      title1: "Pendientes",
      icon: BsFillStopwatchFill,
    },
    {
      number: toBeCount.toString(),
      title1: "Por recoger",
      icon: BsTruck,
    },
    {
      number: processCount.toString(),
      title1: "En proceso",
      icon: ImSpinner6,
    },
  ];

  const handlerClickItem = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="row_boxes">
        {total.map((totalitems, index) => {
          return (
            <div className="row_boxes_inner" key={index}>
              <div className="first">
                <p className="number">{totalitems.number}</p>
                <a className="title" onClick={handlerClickItem}>
                  {totalitems.title1}
                </a>
              </div>
              <div className="second">
                <totalitems.icon />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TotalBusiness;
