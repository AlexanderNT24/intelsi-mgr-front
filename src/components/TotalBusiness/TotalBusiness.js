import React from "react";
import "../../Css/Components/TotalBusiness.css";
import { BsFillStopwatchFill,BsTruck } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const TotalBusiness = () => {
  const total = [
    {
      number: "88",
      title1: "Pendientes",
      icon: BsFillStopwatchFill
    },
    {
      number: "30",
      title1: "Por recoger",
      icon: BsTruck
    },
    {
      number: "20",
      title1: "En proceso",
      icon: ImSpinner6
    }
  ];
  const navigate = useNavigate(); // Obtén la función de navegación

  const handlerClickItem=()=>{
      navigate("/home");
  }

  return (
    <>
      <div className="row_boxes">
        {total.map((totalitems, index) => {
          return (
            <div className="row_boxes_inner" key={index}>
              <div className="first">
                <p className="number">{totalitems.number}</p>
                <a className="title" onClick={handlerClickItem()}>{totalitems.title1}</a>
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
