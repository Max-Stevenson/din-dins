import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <li className="nav-links__link">
        <NavLink to="/recipes">Recipes</NavLink>
      </li>
      <li>
        <NavLink to="/mealplanner">Mealplanner</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
