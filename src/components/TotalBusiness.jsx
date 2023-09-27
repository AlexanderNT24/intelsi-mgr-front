import React from "react";
import "../Css/Components/TotalBusiness.css";
import { BsCurrencyDollar, BsPeople } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiRadioButtonLine } from "react-icons/ri";
const TotalBusiness = () => {
  const total = [
    {
      number: "88",
      title1: "Pendientes",
      icon: BsCurrencyDollar
    },
    {
      number: "30",
      title1: "Por recoger",
      icon: AiOutlineShoppingCart
    },
    {
      number: "20",
      title1: "En proceso",
      icon: BsPeople
    }
  ];
  return (
    <>
      <div className="row_boxes">
        {total.map((totalitems, index) => {
          return (
            <div className="row_boxes_inner" key={index}>
              <div className="first">
                <p className="number">{totalitems.number}</p>
                <p className="title">{totalitems.title1}</p>
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
