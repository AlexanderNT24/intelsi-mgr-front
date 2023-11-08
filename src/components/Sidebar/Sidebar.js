import React from "react";
import { Link } from "react-router-dom";
import "../../Css/Components/Sidebar.css";
import {
  AiFillHome,
  AiOutlineOrderedList,
  AiOutlineLogout,
  AiFillAlert,
  AiFillBook,
} from "react-icons/ai";

const Sidebar = ({ logout }) => {
  // Define el valor del rol almacenado en localStorage
  const userRole = localStorage.getItem("role");

  const sidemenus = [
    {
      menu_name: "Home",
      menu_icon: AiFillHome,
      path: "/home",
    },
    {
      menu_name: "Registrar Productos",
      menu_icon: AiOutlineOrderedList,
      path: "/register",
    },
    {
      menu_name: "Registrar Pedidos",
      menu_icon: AiFillAlert,
      path: "/request",
    },
    {
      menu_name: "Registrar Proyectos",
      menu_icon: AiFillBook,
      path: "/projects",
    },
    {
      menu_name:"Registrar Usuarios",
      menu_icon:AiFillBook,
      path:"/user"
    },
    {
      menu_name: "Salir",
      menu_icon: AiOutlineLogout,
      path: "/",
    },
  ];

  // Filtra los elementos del menú basados en el rol
  const filteredSidemenus = sidemenus.filter((value) => {
    if (userRole === "administrador") {
      return true; // Mostrar todos los elementos para administradores
    } else if (userRole === "supervisor") {
      return (
        value.path === "/register" ||
        value.path === "/request" ||
        value.path === "/projects"||
        value.path === "/"
      ); 
    } else if (userRole === "solicitante") {
      return (value.path === "/request"||
      value.path === "/"); 
    }
    return false; 
  });

  return (
    <div className="sidebar">
      <div className="brand">IntelsiMGR</div>
      <div className="links">
        <ul>
          {filteredSidemenus.map((value, index) => (
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
