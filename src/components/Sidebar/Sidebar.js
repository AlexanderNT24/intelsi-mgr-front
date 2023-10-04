import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde React Router
import "../../Css/Components/Sidebar.css";
import { AiFillHome, AiOutlineOrderedList,AiOutlineLogout } from "react-icons/ai";

const Sidebar = ({ logout }) => {
  const sidemenus = [
    {
      menu_name: "Home",
      menu_icon: AiFillHome,
      path: "/home",
    },
    {
      menu_name: "Registrar",
      menu_icon: AiOutlineOrderedList,
      path: "/register", 
    },
    {
      menu_name: "Salir",
      menu_icon: AiOutlineLogout,
      path: "/", 
    },
  ];

  return (
    <div className="sidebar">
      <div className="brand">IntelsiMGR</div>
      <div className="links">
        <ul>
          {sidemenus.map((value, index) => (
            <li key={index} className={value.active ? "active" : ""}>
              <Link to={value.path}>
                {React.createElement(value.menu_icon)} {value.menu_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
