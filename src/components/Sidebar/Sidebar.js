import React from "react";
import "../../Css/Components/Sidebar.css";
import { AiFillHome } from "react-icons/ai";


const Sidebar = () => {
  const sidemenus = [
    {
      menu_name:'Home',
      menu_icon: AiFillHome,
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
