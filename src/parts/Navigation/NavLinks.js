import React from "react";
import { NavLink } from "react-router-dom";
import './NavLinks.css';

const NavLinks = () => { 
  return (
    <ul className="nav-links">
      <li><NavLink to="/" exact>Головна </NavLink></li>
      <li><NavLink to="/guides" exact>Гіди</NavLink></li>
      <li><NavLink to="/categories" exact>Категорії</NavLink></li>
   </ul>
  );
}

export default NavLinks;