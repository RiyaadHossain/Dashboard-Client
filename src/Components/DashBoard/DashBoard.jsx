import React from "react";
import { NavLink } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex justify-center items-center h-20 bg-[#141e34e4]">
      <div className="">
        <NavLink  className={({isActive}) => isActive ? 'active-link' : 'link'} to="/">
          🏡 Home
        </NavLink>
        <NavLink  className={({isActive}) => isActive ? 'active-link' : 'link'} to="/products">
          🧰 Products
        </NavLink>
        <NavLink  className={({isActive}) => isActive ? 'active-link' : 'link'} to="/addproduct">
          🛒 Add Products
        </NavLink>
      </div>
    </div>
  );
};

export default DashBoard;
