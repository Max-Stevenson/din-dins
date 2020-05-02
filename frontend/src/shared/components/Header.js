import React from "react";
import "./Header.css";

const Header = props => {
  return (
    <header className="main-header">
      <div className="sidebar-icon-container">
        <div />
        <div />
        <div />
      </div>
      <h1>Din Dins</h1>
      <ul className="navbar-links">
        <li>
          <a href="/recipes">Recipes</a>
        </li>
        <li>
          <a href="/mealplanner">Mealplanner</a>
        </li>
        <li>
          <a href="/profile">Profile</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
