import React from "react";
import "../Css/Components/Sidebar.css";
import {
  AiOutlineDashboard,
  AiOutlineShareAlt,
  AiOutlineShoppingCart,
  AiOutlineBook
} from "react-icons/ai";
import { GrCatalogOption } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
const Sidebar = () => {
  const sidemenus = [
    {
      menu_name: "Reportes",
      menu_icon: AiOutlineDashboard,
      active: true
    },
  ];
  return (
    <>
      <div className="sidebar">
        <div className="brand">IntelsiMGR</div>
        <div className="links">
          <ul>
            {sidemenus.map((value) => {
              return (
                <li className={value.active ? "active" : ""}>
                  <a href="">
                    <value.menu_icon />
                    {value.menu_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
