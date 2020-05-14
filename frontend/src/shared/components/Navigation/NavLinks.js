import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li className="nav-links__link">
        <NavLink to="/recipes">Recipes</NavLink>
      </li>
      <li>
        <NavLink to="/mealplanner">Mealplanner</NavLink>
      </li>
      {auth.isLoggedIn && <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>}
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
